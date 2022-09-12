import React, { useEffect } from "react";
import sulmoggoApi from "../../shared/apis";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Loading from "../common/Loading";
import TableCard from "../tablecard";
import Spinner from "../spinner";
import { TablesGrid, Wrap } from "./styles";
import Nodata from "../nodatalending";

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
        <Wrap>
          <Nodata />
        </Wrap>
      )}
    </>
  );
};

export default Mypost;


