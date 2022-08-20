import React, { useEffect } from "react";
import styled from "styled-components";
import sulmoggoApi from "../../shared/apis";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { AlchholTag, FreeTag, Separator } from "../../styles/CommonStyles";
import Loading from "../common/Loading";

const Mypost = () => {
  const { ref, inView } = useInView();

  // 본인이 작성한 술상 불러오기 api
  // const getMyTable = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://d68cd834-2edf-4bc3-b4ff-069d5bc2b347.mock.pstmn.io/api/mypage/tables?page=${0}&size=${0}`
  //     );
  //     return res;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  //본인이 작성한 술상 불러오기 query
  // const { data: my_table_query, status } = useQuery(["my_table"], getMyTable, {
  //   onSuccess: (data) => {
  //     console.log("본인이작성술상", data.data.tables);
  //   },
  // });

  // 쿼리 데이터 로딩전에 스피너
  // if (status === "loading") {
  //   return null;
  // }

  // 본인이 작성한 술상 불러오기 api
  const getMyTable = async (pageParam) => {
    try {
      const res = await sulmoggoApi.getMyPost(pageParam);
      const data = res.data.tables;
      const last = res.data.last;
      return { data, last, nextPage: pageParam + 1 };
    } catch (e) {
      console.log(e);
    }
  };

  // 무한 스크롤 데이터 패칭
  const {
    data: my_table_query,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["my_table"],
    ({ pageParam = 0 }) => getMyTable(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  // console.log("찍어봄", my_table_query);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <Wrap>
      <TablesGrid>
        {my_table_query?.pages.map((page, idx) => {
          return (
            <React.Fragment key={idx}>
              {page.data.map((v, i) => {
                return (
                  <CardWrapper key={i}>
                    <CardThumbnail src={v.thumbnail} />
                    <div className="cardUpperWrap">
                      <ProfileCircle src={v.profileimgurl} />
                      <div className="cardTitleWrap">
                        <div className="tableTitle">{v.title}</div>
                        <div className="tableUser">{v.username}</div>
                      </div>
                    </div>
                    <div className="counterWrap">
                      <img src="/images/icon_favorite.svg" alt="heart" />
                      {v.likecount || 0}
                      <Separator />
                      <img src="/images/icon_eye.svg" alt="eye" />
                      {v.viewcount || 0}
                    </div>
                    <div className="tagWrap">
                      {v.alcoholtag && <AlchholTag>{v.alcoholtag}</AlchholTag>}
                      {v.freetag && <FreeTag>{v.freetag}</FreeTag>}
                    </div>
                  </CardWrapper>
                );
              })}
            </React.Fragment>
          );
        })}
      </TablesGrid>
      {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
    </Wrap>
  );
};

export default Mypost;

const Content = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrap = styled.div`
  width: 1290px;
  margin: 0 auto;
`;

const CardWrapper = styled.div`
  width: 100%;
  /* max-width: 40.5rem; */
  height: fit-content;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.white};
  padding: 2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    margin-top: -0.5rem;
    box-shadow: ${(props) => props.theme.shadow_gray};
  }
  /* border: 1px solid black; */
  .cardUpperWrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1.7rem;
  }
  .cardTitleWrap {
    display: flex;
    flex-direction: column;
    margin-left: 0.8rem;
    width: calc(100% - 7.2rem);
  }
  .tableTitle {
    font-size: 2.6rem;
    font-weight: 700;
    line-height: 3.1rem;
    color: #101010;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .tableUser {
    font-size: 2rem;
    font-weight: 500;
    line-height: 2.4rem;
    color: ${(props) => props.theme.primary};
    margin-top: 0.4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .counterWrap {
    width: 100%;
    margin-top: 1.2rem;
    font-size: 1.6rem;
    line-height: 1.9rem;
    letter-spacing: -0.04em;
    color: ${(props) => props.theme.grey_02};
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    align-items: center;
    img {
      width: 1.8rem;
    }
  }
  .tagWrap {
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 0.8rem;
    margin-top: 4rem;
    height: 2.7rem;
  }
`;
const CardThumbnail = styled.div`
  width: 100%;
  height: 24rem;
  border-radius: 1rem;
  background-image: url(${(props) => props.src || props.theme.placeholder});
  background-color: #d9d9d9;
  background-size: cover;
  background-position: center;
`;
const ProfileCircle = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  background-image: url(${(props) =>
    props.src || props.theme.placeholder_profile});
  background-color: #d9d9d9;
  background-size: cover;
  background-position: center;
`;

export const TablesGrid = styled.div`
  width: 100%;
  margin-top: 3.2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40.5rem, 1fr));
  grid-gap: 3.2rem;
`;
