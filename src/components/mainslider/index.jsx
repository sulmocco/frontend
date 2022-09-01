import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Controller } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Carousel, Image
} from "./styles";
import { useEffect } from 'react';
import { useRef } from 'react';

const MainSlider = () => {
  const [isAuto, setAuto] = useState(true);
  const pause = document.querySelector('.swiper-pagination');
  console.log(pause)

  useEffect(() => {
    pause?.addEventListener('click', () => {
      alert('여기');
      setAuto(!isAuto)
    });
  }, [isAuto]);

  return (
    <Carousel>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Controller]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, type: 'fraction' }}
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


