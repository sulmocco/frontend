import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, memo } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Nodata from '../../components/nodatalending';
import SearchBar from "../../components/searchbar";
import TableCard from "../../components/tablecard";
import sulmoggoApi from "../../shared/apis";
import { Alcohol } from "../../shared/options";
import { NoList, Separator } from "../../styles/CommonStyles";
import { AlcoholCategories, AlcoholCategory, SortButton } from '../rooms/styles';
import {
  PageTitle,
  SearchBoxWrapper,
  TableCont,
  TablesGrid,
  TablesWrapper,
  WirteButton,
} from "./styles";

const Tables = (props) => {
  const [queryParams, setQueryParams] = useSearchParams();
  const keyword = queryParams.get("keyword") || null;
  const alcohol = keyword ? null : queryParams.get("alcohol") || "전체";
  const sortBy = queryParams.get("sortBy") || "id";
  const page = queryParams.get("page") || 1;
  const isAsc = queryParams.get("isAsc") || null;
  const lastTableRef = useRef();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

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

      let res = null
      if (keyword) {
        res = await sulmoggoApi.searchTables(newQuery);
      } else {
        res = await sulmoggoApi.getTables(newQuery)
      }
      return {
        data: res.data,
        nextPage: pageParam + 1,
        lastPage: res.data.last,
      };
    },
    [alcohol, keyword, sortBy]
  );
  const {
    isSuccess,
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["tables", keyword, alcohol, sortBy, page, isAsc],
    ({ pageParam = page }) => getTables(pageParam),
    {
      getNextPageParam: (currPage, allPages) => {
        if (!currPage.lastPage) {
          return currPage.nextPage;
        }
        return undefined;
      },
      onSuccess: (data) => {
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
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    setTotal(data?.pages[0]?.data?.totalElements);
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.8,
      root: null,
    });
    lastTableRef.current && observer.observe(lastTableRef.current);
    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, data]);

  return (
    <TablesWrapper>
      <TableCont>
        <div className="top">
          <section className='pagew'>
            {alcohol ? (<PageTitle>술상추천</PageTitle>) : (<PageTitle><i onClick={() => navigate(-1)}></i>술상검색</PageTitle>)}
            <SearchBoxWrapper>
              <div className="leftWrapper">
                <p>
                  <span>{total || 0}개</span>의 술상추천이 있습니다.
                </p>
                <SearchBar onSearch={(keyword) => searchTables(keyword)} />
              </div>
            </SearchBoxWrapper>
          </section>
        </div>
        <div className='bottom'>
          <section>
            {alcohol && (
              <>
                <AlcoholCategories style={{ marginTop: 0 }}>
                  {Alcohol.map((x, i) => (
                    <AlcoholCategory
                      key={x}
                      checked={alcohol.includes(x)}
                      onClick={() => {
                        if (i !== 0 && !alcohol.includes(x)) {
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
                    <div
                      className="checkedAlcohol"
                      onClick={() => {
                        if (alcohol.includes(x)) {
                          let newAlcohols = alcohol.split(",");
                          const idx = newAlcohols.indexOf(x);
                          newAlcohols.splice(idx, 1);
                          setQueryParams({ alcohol: newAlcohols.join(",") });
                        }
                      }}
                    >{x}
                      <img src="/images/icon_remove_tags.svg" alt="remove" />
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="rightWrapper">
              <SortButton
                checked={sortBy === "count"}
                onClick={() => {
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
            <TablesGrid>
              {isSuccess &&
                data.pages.map((page, pageidx) => {
                  const content = page.data.content;
                  return content?.map((table, idx) => {
                    if (idx === content.length - 1 && pageidx === data.pages.length - 1) return (
                      <div ref={lastTableRef} >
                        <TableCard {...table} />
                      </div>
                    )
                    else
                      return <TableCard {...table} />;
                  });
                })}
            </TablesGrid>
            {isSuccess && !total && (
              <div style={{ margin: '0 auto' }}>
                <Nodata />
              </div>
            )}
            {!isSuccess && <NoList>문제가 발생했습니다.</NoList>}
            <WirteButton to='/post'>
              <p>술상추천<br />글쓰기</p>
              <span></span>
            </WirteButton>
          </section>
        </div>
      </TableCont>
    </TablesWrapper>
  );
};

export default memo(Tables);