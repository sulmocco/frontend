import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import sulmoggoApi from "../../shared/apis";
import Spinner from "../spinner";
import TableCard from "../tablecard";
import { MypageWrap, TablesGrid } from "./styles";

const Bookmark = () => {
  const { ref, inView } = useInView();

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["my_bookmark"],
    ({ pageParam = 1 }) =>
      sulmoggoApi.getMybookmark(pageParam).then((res) => {
        const content = res.data.content;
        const last = res.data.last;
        const nextPage = pageParam + 1;
        return { data: content, last: last, nextPage: nextPage };
      }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.last) {
          return lastPage.nextPage;
        } else {
          return undefined;
        }
      },
    }
  );

  // 맨 마지막 요소를 보고있으면 다음 데이터를 가져온다.
  useEffect(() => {
    inView && fetchNextPage();
  }, [inView, fetchNextPage]);

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      {data.pages[0].data?.length >= 1 ? (
        <MypageWrap>
          <TablesGrid>
            {data &&
              data.pages.map((item, index) => (
                <React.Fragment key={index}>
                  {item.data.map((res, idx) => (
                    <TableCard {...res} key={idx} />
                  ))}
                </React.Fragment>
              ))}
          </TablesGrid>
          {isFetchingNextPage ? <Spinner size="7rem" /> : <div ref={ref}></div>}
        </MypageWrap>
      ) : (
        <Content>
          <img src="/images/none.png" alt="북마크"></img>
          <div style={{ fontSize: "28px" }}>북마크한 술상이 없습니다!</div>
          <div
            style={{
              color: "#b5b5b5",
              marginTop: "5px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            마음에 드는 술상을 북마크해보세요!
          </div>
        </Content>
      )}
    </>
  );
};

export default Bookmark;

const Content = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
