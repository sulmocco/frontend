import React, { useEffect } from "react";
import styled from "styled-components";
import sulmoggoApi from "../../shared/apis";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Loading from "../common/Loading";
import TableCard from "../tablecard";
import Spinner from "../spinner";
import { TablesGrid } from "./styles";

const Mypost = () => {
  const { ref, inView } = useInView();

  // 본인이 작성한 술상 불러오기 api
  const getMyTable = async (pageParam) => {
    try {
      const res = await sulmoggoApi.getMyPost(pageParam);
      const data = res.data.content;
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
    ({ pageParam = 1 }) => getMyTable(pageParam),
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

  console.log("찍어봄", my_table_query);

  if (status === "loading") {
    return <Spinner size="7rem" />;
  }

  return (
    <>
      {my_table_query.pages[0].data?.length >= 1 ? (
        <Wrap>
          <TablesGrid>
            {my_table_query &&
              my_table_query.pages.map((page, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {page.data.map((v, i) => {
                      return <TableCard {...v} key={i} />;
                    })}
                  </React.Fragment>
                );
              })}
          </TablesGrid>
          {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
        </Wrap>
      ) : (
        <Content>
          <img src="/images/none.png" alt="북마크"></img>
          <div style={{ fontSize: "28px" }}>작성한 술상 목록이 없습니다!</div>
          <div
            style={{
              color: "#b5b5b5",
              marginTop: "5px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            자신만의 술상을 공유해주세요!
          </div>
        </Content>
      )}
    </>
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
