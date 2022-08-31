import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Nodata from '../../components/nodatalending/styles';
import RoomCard from "../../components/roomscard";
import SearchBar from "../../components/searchbar";
import sulmoggoApi from "../../shared/apis";
import { Alcohol, LiveVersion } from "../../shared/options";
import { AlcoholButtons, NoList, Separator } from "../../styles/CommonStyles";
// import { Container } from "../signup/styles";
import {
  AlcoholCategories,
  AlcoholCategory,
  PageTitle,
  SearchBoxWrapper,
  SortButton,
  RoomsGrid,
  RoomsWrapper,
  RoomsTopWrapper,
  RoomsTabs,
  VersionTab,
} from "./styles";

/**
 * 술약속 목록
 * @author imhjnoh <imhjnoh@gmail.com>
 */
const Rooms = (props) => {
  const [queryParams, setQueryParams] = useSearchParams();
  // const queryParams = new URLSearchParams();
  const version = queryParams.get("version") || null;
  const keyword = queryParams.get("keyword") || null;
  const alcohol = keyword ? null : queryParams.get("alcohol") || "전체";
  const sortBy = queryParams.get("sortBy") || "id";
  const page = queryParams.get("page") || 1;
  const isAsc = queryParams.get("isAsc") || null;
  const allParams = { keyword, alcohol, sortBy, isAsc };
  const lastRoomRef = useRef();

  console.log(alcohol);
  console.log("version: ", version);

  const searchRooms = (keyword) => {
    if (keyword) filterRooms({ type: "keyword", value: keyword });
    else filterRooms();
  };

  /**
   * 클라이언트에서 주소창에 보여주는 쿼리스트링.
   * 서버로 넘기는 쿼리는 페이지까지 포함되어있어 불필요한 렌더링이 발생하여 따로 분리함.
   * @param {object} [data]
   * @param {"version"|"keyword"|"alcohol"|"sortBy"} data.type
   * @param {string} data.value
   */
  const filterRooms = (data) => {
    if (data) {
      const newQueryForFront = {
        version,
        keyword,
        alcohol,
        sortBy,
      };
      newQueryForFront[data.type] = data.value;

      if (newQueryForFront.keyword || newQueryForFront.alcohol === "전체")
        delete newQueryForFront.alcohol;
      if (!newQueryForFront.keyword) delete newQueryForFront.keyword;
      if (newQueryForFront.version === null) delete newQueryForFront.version;
      setQueryParams(newQueryForFront);
    } else {
      setQueryParams({});
    }
  };

  /**
   * 페이지를 포함한 쿼리스트링을 꾸려서 서버로 전송함.
   * @param {number} pageParam 현재 페이지 번호
   */
  const getRooms = useCallback(
    async (pageParam) => {
      const newQuery = {
        version,
        keyword,
        alcohol: String(alcohol),
        sortBy,
        page: pageParam,
        size: 9,
        isAsc: false,
      };
      if (keyword || alcohol === "전체") delete newQuery.alcohol;
      else delete newQuery.keyword;
      if (version === null) delete newQuery.version;

      console.log(newQuery);

      let res = null;
      if (keyword) {
        res = await sulmoggoApi.searchRooms(newQuery);
      } else {
        res = await sulmoggoApi.getRooms(newQuery);
      }
      console.log("search!", keyword);
      return {
        data: res.data,
        nextPage: pageParam + 1,
        lastPage: res.data.last,
      };
    },
    [alcohol, keyword, sortBy, version]
  );

  const { isSuccess, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["rooms", keyword, alcohol, sortBy, page, isAsc, version],
    ({ pageParam = page }) => getRooms(pageParam),
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
    lastRoomRef.current && observer.observe(lastRoomRef.current);
    // console.log(data);
    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, data]);

  return (
    <RoomsWrapper>
      <RoomsTopWrapper>
        <div>
          <PageTitle>술약속</PageTitle>
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
                        filterRooms({
                          type: "alcohol",
                          value: (
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
                        filterRooms({
                          type: "alcohol",
                          value: newAlcohols.join(","),
                        });
                      } else {
                        filterRooms();
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
                <span>{data?.pages[0]?.data?.totalElements || 0}개</span>의 술약속이 있습니다.
              </p>
              <SearchBar onSearch={(keyword) => searchRooms(keyword)} />
            </div>
            <div className="rightWrapper">
              <SortButton
                checked={sortBy === "userCount"}
                onClick={() => {
                  console.log(allParams);
                  filterRooms({ type: "sortBy", value: "userCount" });
                }}
              >
                인기순
              </SortButton>
              <Separator />
              <SortButton
                checked={sortBy === "id"}
                onClick={() => {
                  console.log(allParams);
                  filterRooms({ type: "sortBy", value: "id" });
                }}
              >
                최신순
              </SortButton>
            </div>
          </SearchBoxWrapper>
        </div>
      </RoomsTopWrapper>
      <RoomsTabs>
        <ul>
          {[{ value: null, text: "전체" }, ...LiveVersion].map((v) => (
            <VersionTab
              count={LiveVersion.length}
              key={v.value}
              onClick={() => {
                v.value
                  ? filterRooms({ type: "version", value: v.value })
                  : filterRooms();
              }}
              active={v.value ? v.value === version : version === null}
            >
              {v.text}
            </VersionTab>
          ))}
        </ul>
      </RoomsTabs>
      {/* eslint-disable-next-line */}
      {isSuccess && data.pages[0].data.totalElements != 0 && <RoomsGrid>
        {data.pages.map((page, pageidx) => {
          const content = page.data.content;
          return content?.map((room, idx) => {
            if (
              idx === content.length - 1 &&
              pageidx === data.pages.length - 1
            )
              return (
                <div ref={lastRoomRef} key={room.chatRoomId}>
                  <RoomCard {...room} />
                </div>
              );
            else return <RoomCard {...room} key={room.chatRoomId} />;
          });
        })}
        {console.log(data.pages)}
      </RoomsGrid>}
      {/* eslint-disable-next-line */}
      {isSuccess && (data.pages[0].data.totalElements == 0) && (
        <Nodata />
      )}
      {!isSuccess && <NoList>문제가 발생했습니다.</NoList>}
    </RoomsWrapper>
  );
};

export default Rooms;
