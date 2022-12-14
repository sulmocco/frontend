import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import sulmoggoApi from "../../shared/apis";
import Nodata from "../nodatalending";
import Spinner from "../spinner";
import TableCard from "../tablecard";
import { TablesGrid, Wrap } from "./styles";

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
        <Wrap>
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
        </Wrap>
      ) : (
        <Wrap>
          <Nodata />
        </Wrap>
      )}
    </>
  );
};

export default Bookmark;
