import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Controller } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Carousel, Image
} from "./styles";
import { useQuery } from '@tanstack/react-query';
import sulmoggoApi from '../../shared/apis';
import { useNavigate } from 'react-router-dom';

const MainSlider = () => {
  const { data } = useQuery(['banner'], () => sulmoggoApi.getBanner().then(res => res.data));
  console.log(data)

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
        {data?.map(banner => (
          <SwiperSlide key={banner.id} onClick={() => window.open((`${data.redirectUrl}`), '_blank')} >
            <Image src={banner.imageUrl} alt='배너이미지' />
          </SwiperSlide>
        ))}
      </Swiper>
    </Carousel>
  );
};

export default MainSlider;


