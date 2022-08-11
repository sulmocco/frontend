import React from "react";
import MainSlider from "../components/mainslider";
import Live from "../components/live";
import Today from "../components/today";
import Recommend from "../components/recommend";
import { RecommendWrap } from "../components/recommend/styles";
import { useQuery } from "@tanstack/react-query";
import sulmoggoApi from "../shared/apis";

const Home = () => {
  const { data } = useQuery(["products"], () =>
    sulmoggoApi.getProducts().then((res) => res.data)
  );
  return (
    <div>
      <MainSlider />
      <Live />
      <Today />
      <RecommendWrap>
        <h2>이상품 어때요?</h2>
        <section className="recommendsection">
          {data?.map((item, index) => (
            <Recommend
              key={index}
              img={item.imageUrl}
              title={item.title}
              price={item.price}
              tag={item.alcoholtag}
              url={item.redirectUrl}
            />
          ))}
        </section>
      </RecommendWrap>
    </div>
  );
};

export default Home;
