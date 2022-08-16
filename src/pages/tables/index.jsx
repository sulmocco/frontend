import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/searchbar";
import TableCard from "../../components/tablecard";
import sulmoggoApi from "../../shared/apis";
import { Alcohol } from "../../shared/options";
import { AlcoholButtons, Separator } from "../../styles/CommonStyles";
// import { Container } from "../signup/styles";
import {
  AlcoholCategories,
  AlcoholCategory,
  LeftBox,
  PageTitle,
  SearchBox,
  SearchBoxWrapper,
  SortButton,
  TablesGrid,
  TablesWrapper,
} from "./styles";

const Tables = (props) => {
  const [queryParams, setQueryParams] = useSearchParams();
  // const queryParams = new URLSearchParams();
  const keyword = queryParams.get("keyword") || null;
  const alcohol = queryParams.get("alcohol") || "전체";
  const sort = queryParams.get("sort") || "인기순";
  const page = queryParams.get("page") || 0;
  const isAsc = queryParams.get("isAsc") || null;
  const allParams = { keyword, alcohol, sort, isAsc };
  const lastTableRef = useRef();
  const [total, setTotal] = useState(0);

  const searchTables = (keyword) => {
    if (keyword) {
      setQueryParams({ keyword });
    } else {
      setQueryParams({});
    }
  };

  const getTables = useCallback(
    async (pageParam) => {
      const res = await sulmoggoApi.getTables({
        keyword,
        alcohol: String(alcohol),
        sort,
        page: pageParam,
        isAsc,
      });
      setTotal(res.data.total);
      console.log("search!", keyword);
      return {
        data: res.data,
        nextPage: pageParam + 1,
        lastPage: res.data.lastPage,
      };
    },
    [alcohol, isAsc, keyword, sort]
  );
  const {
    isSuccess,
    data,
    // error,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    // isFetchingNextPage,
    // status,
  } = useInfiniteQuery(
    ["tables", keyword, alcohol, sort, page, isAsc],
    ({ pageParam = page }) => getTables(pageParam),
    {
      getNextPageParam: (currPage, allPages) => {
        if (!currPage.lastPage) {
          // setQueryParams({keyword, alcohol, sort, page, isAsc})
          return currPage.nextPage;
        }
        return undefined;
      },
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (data) => {
        alert("문제가 발생했습니다.", data);
      },
      suspense: true,
    }
  );

  const handleIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        console.log("!!!!intersect!!!!");
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.8,
      root: null,
    });
    lastTableRef.current && observer.observe(lastTableRef.current);
    // console.log(data);
    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, data]);

  useEffect(() => {
    // setQueryParams({ alcohol: Alcohol[0] });
    console.log(queryParams);
  }, []);
  return (
    <TablesWrapper>
      <PageTitle>술상추천</PageTitle>
      {!keyword && (
        <>
          <AlcoholCategories>
            {Alcohol.map((x) => (
              <AlcoholCategory
                key={x}
                checked={alcohol.includes(x)}
                onClick={() => {
                  setQueryParams({ alcohol: x });
                }}
              >
                {x}
              </AlcoholCategory>
            ))}
          </AlcoholCategories>
          <div className="checkedAlcoholWrapper">
            <AlcoholButtons>{alcohol}</AlcoholButtons>
          </div>
        </>
      )}
      <SearchBoxWrapper>
        <div className="leftWrapper">
          <p>
            <span>{total}개</span>의 술모임이 있습니다.
          </p>
          <SearchBar onSearch={(keyword) => searchTables(keyword)} />
        </div>
        <div className="rightWrapper">
          <SortButton
            checked={sort === "인기순"}
            onClick={() => {
              console.log(queryParams);
              setQueryParams({ ...allParams, sort: "인기순" });
            }}
          >
            인기순
          </SortButton>
          <Separator />
          <SortButton
            checked={sort === "최신순"}
            onClick={() => {
              setQueryParams({ ...allParams, sort: "최신순" });
            }}
          >
            최신순
          </SortButton>
        </div>
      </SearchBoxWrapper>
      <TablesGrid>
        {isSuccess &&
          data.pages.map((page) => {
            const tables = page.data.tables;
            return tables?.map((table, idx) => {
              if (idx !== tables.length - 1) return <TableCard {...table} />;
              else
                return (
                  <div ref={lastTableRef}>
                    <TableCard {...table} />
                  </div>
                );
            });
          })}
      </TablesGrid>
    </TablesWrapper>
  );
};

export default Tables;
