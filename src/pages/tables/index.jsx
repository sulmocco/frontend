import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import TableCard from "../../components/tablecard";
import sulmoggoApi from "../../shared/apis";
import { Container } from "../signup/styles";
import { TablesWrapper } from "./styles";

const Tables = (props) => {
  const [queryParams, setQueryParams] = useSearchParams();
  const searchParams = new URLSearchParams();
  const keyword = searchParams.get("keyword") || null;
  const alcohol = searchParams.get("alcohol") || null;
  const sort = searchParams.get("sort") || null;
  const page = searchParams.get("page") || 0;
  const isAsc = searchParams.get("isAsc") || null;
  const lastTableRef = useRef();

  const handleIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting && hasNextPage) {
      console.log("!!!!intersect!!!!");
      fetchNextPage();
      console.log(queryParams);
    }
  });

  const getTables = async (pageParam) => {
    const res = await sulmoggoApi.getTables({
      keyword,
      alcohol,
      sort,
      page: pageParam,
      isAsc,
    });
    return {
      data: res.data,
      nextPage: pageParam + 1,
      lastPage: res.data.lastPage,
    };
  };
  const {
    isSuccess,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["tables", keyword, alcohol, sort, page, isAsc],
    ({ pageParam = page }) => getTables(pageParam),
    {
      getNextPageParam: (currPage, allPages) => {
        if (!currPage.lastPage) return currPage.nextPage;
        return undefined;
      },
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.8,
      root: null,
    });
    lastTableRef.current && observer.observe(lastTableRef.current);
    console.log(data);
    return () => {
      observer.disconnect();
    };
  }, [handleIntersect]);
  return (
    <TablesWrapper>
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
    </TablesWrapper>
  );
};

export default Tables;
