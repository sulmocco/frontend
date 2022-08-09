import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MainSlider = () => {
  return (
    <Carousel>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={true}
      >
        <SwiperSlide>
          <Image src="/images/banner-1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/banner-2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/banner-3.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </Carousel>
  );
};

export default MainSlider;

const Carousel = styled.section`
  margin-top: 30px;
  .swiper-button-prev,
  .swiper-button-next {
    &::after {
      background: rgba(0, 0, 0, 0.15);
      border-radius: 50%;
      color: #fff;
      font-size: 17px;
      padding: 11px 16px;
    }
  }
  .swiper-button-prev {
    margin-left: 25px;
  }
  .swiper-button-next {
    margin-right: 25px;
  }
`;

const Image = styled.img`
  width: 100%;
`;
