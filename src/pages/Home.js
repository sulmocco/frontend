import React from "react";
import MainSlider from "../components/MainSlider";
import Live from "../components/Live/Live";
import Today from "../components/Today";
import Recommend from "../components/recommend";
import { RecommendWrap } from "../components/recommend/styles";

const Home = () => {
  const data = [
    {
      productId: "1",
      title:
        "[밀키트] 프리미엄 식품관에서 공수해온 밀키트 할아요이오요엉ㄹ오옹",
      price: "123,456,789",
      alcoholtag: "술먹방",
      imageUrl: "/images/recommend.jpeg",
      redirectUrl: "https://www.naver.com/",
    },
    {
      productId: "1",
      title:
        "[밀키트] 프리미엄 식품관에서 공수해온 밀키트 할아요이오요엉ㄹ오옹",
      price: "123,456,789",
      alcoholtag: "술먹방",
      imageUrl: "/images/recommend.jpeg",
      redirectUrl: "https://www.naver.com/",
    },
    {
      productId: "1",
      title:
        "[밀키트] 프리미엄 식품관에서 공수해온 밀키트 할아요이오요엉ㄹ오옹",
      price: "123,456,789",
      alcoholtag: "술먹방",
      imageUrl: "/images/recommend.jpeg",
      redirectUrl: "https://www.naver.com/",
    },
    {
      productId: "1",
      title:
        "[밀키트] 프리미엄 식품관에서 공수해온 밀키트 할아요이오요엉ㄹ오옹",
      price: "123,456,789",
      alcoholtag: "술먹방",
      imageUrl: "/images/recommend.jpeg",
      redirectUrl: "https://www.naver.com/",
    },
    {
      productId: "1",
      title:
        "[밀키트] 프리미엄 식품관에서 공수해온 밀키트 할아요이오요엉ㄹ오옹",
      price: "123,456,789",
      alcoholtag: "술먹방",
      imageUrl: "/images/recommend.jpeg",
      redirectUrl: "https://www.naver.com/",
    },
    {
      productId: "1",
      title:
        "[밀키트] 프리미엄 식품관에서 공수해온 밀키트 할아요이오요엉ㄹ오옹",
      price: "123,456,789",
      alcoholtag: "술먹방",
      imageUrl: "/images/recommend.jpeg",
      redirectUrl: "https://www.naver.com/",
    },
    {
      productId: "1",
      title:
        "[밀키트] 프리미엄 식품관에서 공수해온 밀키트 할아요이오요엉ㄹ오옹",
      price: "123,456,789",
      alcoholtag: "술먹방",
      imageUrl: "/images/recommend.jpeg",
      redirectUrl: "https://www.naver.com/",
    },
    {
      productId: "1",
      title:
        "[밀키트] 프리미엄 식품관에서 공수해온 밀키트 할아요이오요엉ㄹ오옹",
      price: "123,456,789",
      alcoholtag: "술먹방",
      imageUrl: "/images/recommend.jpeg",
      redirectUrl: "https://www.naver.com/",
    },
  ];

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
            />
          ))}
        </section>
      </RecommendWrap>
    </div>
  );
};

export default Home;
