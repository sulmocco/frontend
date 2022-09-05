import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Controller } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Carousel, Image
} from "./styles";

const MainSlider = () => {

  return (
    <Carousel>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Controller]}
        spaceBetween={50}
        slidesPerView={1}
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


