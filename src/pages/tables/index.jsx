import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import TableCard from "../../components/tablecard";
import sulmoggoApi from "../../shared/apis";
import { Alcohol } from "../../shared/options";
import { AlcoholButtons } from "../../styles/CommonStyles";
// import { Container } from "../signup/styles";
import {
  AlcoholCategories,
  AlcoholCategory,
  PageTitle,
  TablesGrid,
  TablesWrapper,
} from "./styles";

const Tables = (props) => {
  const [queryParams, setQueryParams] = useSearchParams();
  // const queryParams = new URLSearchParams();
  const keyword = queryParams.get("keyword");
  const alcohol = queryParams.getAll("alcohol");
  const sort = queryParams.get("sort") || null;
  const page = queryParams.get("page") || 0;
  const isAsc = queryParams.get("isAsc") || null;
  const lastTableRef = useRef();

  const getTables = useCallback(
    async (pageParam) => {
      const res = await sulmoggoApi.getTables({
        keyword,
        alcohol: String(alcohol),
        sort,
        page: pageParam,
        isAsc,
      });
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
    setQueryParams({ alcohol: Alcohol[0] });
    console.log(queryParams);
  }, []);
  return (
    <TablesWrapper>
      <PageTitle>술상추천</PageTitle>
      <AlcoholCategories>
        {Alcohol.map((x) => (
          <AlcoholCategory 
          key={x} 
          checked={alcohol.includes(x)}
          onClick={() => {
            setQueryParams({...queryParams, alcohol: x});
          }}
          >
            {x}
          </AlcoholCategory>
        ))}
      </AlcoholCategories>
      <div className="checkedAlcoholWrapper">
        <AlcoholButtons>{alcohol}</AlcoholButtons>
      </div>
      <TablesGrid>
        {isSuccess &&
          data.pages.map((page) => {
            const tables = page.data.tables;
            return tables.map((table, idx) => {
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
