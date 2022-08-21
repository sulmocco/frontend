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
  NoList,
  PageTitle,
  SearchBoxWrapper,
  SortButton,
  TablesGrid,
  TablesWrapper,
  WriteButton,
} from "./styles";

const Tables = (props) => {
  const [queryParams, setQueryParams] = useSearchParams();
  // const queryParams = new URLSearchParams();
  const keyword = queryParams.get("keyword") || null;
  const alcohol = keyword ? null : queryParams.get("alcohol") || "전체";
  const sortBy = queryParams.get("sortBy") || "id";
  const page = queryParams.get("page") || 1;
  const isAsc = queryParams.get("isAsc") || null;
  const allParams = { keyword, alcohol, sortBy, isAsc };
  const lastTableRef = useRef();
  const [total, setTotal] = useState(0);

  console.log(alcohol);

  const searchTables = (keyword) => {
    if (keyword) {
      setQueryParams({ keyword });
    } else {
      setQueryParams({});
    }
  };

  const getTables = useCallback(
    async (pageParam) => {
      const newQuery =
      {
        keyword,
        alcohol: String(alcohol),
        sortBy,
        page: pageParam,
        size: 9,
        isAsc: false,
      }
      if (keyword || alcohol === "전체") delete newQuery.alcohol
      else delete newQuery.keyword

      console.log(newQuery);

      let res = null
      if(keyword) {
      res = await sulmoggoApi.searchTables(newQuery);
    }else{
      res = await sulmoggoApi.getTables(newQuery)
    }
      setTotal(res.data.total);
      console.log("search!", keyword);
      return {
        data: res.data,
        nextPage: pageParam + 1,
        lastPage: res.data.last,
      };
      // TODO: 작업용 코드. 완성 시에는 삭제해야함.
      // eslint-disable-next-line
      // return {
      //   data: "",
      //   nextPage: pageParam + 1,
      //   lastPage: true,
      // };
    },
    [alcohol, keyword, sortBy]
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
    ["tables", keyword, alcohol, sortBy, page, isAsc],
    ({ pageParam = page }) => getTables(pageParam),
    {
      getNextPageParam: (currPage, allPages) => {
        if (!currPage.lastPage) {
          console.log("not last page");
          // setQueryParams({keyword, alcohol, sortBy, page, isAsc})
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

  return (
    <TablesWrapper>
      <PageTitle>술상추천</PageTitle>
      {alcohol && (
        <>
          <AlcoholCategories>
            {Alcohol.map((x, i) => (
              <AlcoholCategory
                key={x}
                checked={alcohol.includes(x)}
                onClick={() => {
                  if (i !== 0 && !alcohol.includes(x)) {
                    // console.log(alcohol.replace(Alcohol[0], "").replace(/^,/, ""));
                    setQueryParams({
                      alcohol: (
                        alcohol.replace(Alcohol[0], "") +
                        "," +
                        x
                      ).replace(/^,/, ""),
                    });
                  } else if (alcohol.includes(x)) {
                    let newAlcohols = alcohol.split(",");
                    const idx = newAlcohols.indexOf(x);
                    console.log(idx);
                    newAlcohols.splice(idx, 1);
                    setQueryParams({ alcohol: newAlcohols.join(",") });
                  } else {
                    setQueryParams({});
                  }
                }}
              >
                {x}
              </AlcoholCategory>
            ))}
          </AlcoholCategories>
          <div className="checkedAlcoholWrapper">
            {alcohol.split(",").map((x) => (
              <AlcoholButtons>{x}</AlcoholButtons>
            ))}
          </div>
        </>
      )}
      <SearchBoxWrapper>
        <div className="leftWrapper">
          <p>
            <span>{total || 0}개</span>의 술상추천이 있습니다.
          </p>
          <SearchBar onSearch={(keyword) => searchTables(keyword)} />
        </div>
        <div className="rightWrapper">
          <SortButton
            checked={sortBy === "count"}
            onClick={() => {
              console.log(allParams);
              if (keyword) {
                setQueryParams({ keyword, sortBy: "count" });
              } else if (alcohol !== "전체") {
                setQueryParams({ alcohol, sortBy: "count" });
              } else {
                setQueryParams({ sortBy: "count" });
              }
            }}
          >
            인기순
          </SortButton>
          <Separator />
          <SortButton
            checked={sortBy === "id"}
            onClick={() => {
              console.log(allParams);
              if (keyword) {
                setQueryParams({ keyword, sortBy: "id" });
              } else if (alcohol !== "전체") {
                setQueryParams({ alcohol, sortBy: "id" });
              } else {
                setQueryParams({ sortBy: "id" });
              }
            }}
          >
            최신순
          </SortButton>
        </div>
      </SearchBoxWrapper>
      <TablesGrid>
        {isSuccess &&
          data.pages.map((page, pageidx) => {
            const content = page.data.content;
            return content?.map((table, idx) => {
              if (idx === content.length - 1 && pageidx === data.pages.length - 1) return (
                <div ref={lastTableRef}>
                  <TableCard {...table} />
                </div>
              )
              else
                return <TableCard {...table} />;
            });
          })}
        {console.log(data.pages)}
        {/* {!total && isSuccess && data?.pages[0]?.content.length === 0 && <NoList>작성된 술상추천이 없습니다.</NoList>} */}
      </TablesGrid>
      <WriteButton to="/post">
        <div className="absolute">
          <div className="fixed">
            <img src="/images/icon_write.svg" alt="작성" />
          </div>
        </div>
      </WriteButton>
    </TablesWrapper>
  );
};

export default Tables;
