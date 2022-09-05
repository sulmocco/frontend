import styled from "styled-components";

export const Carousel = styled.section`
  .swiper-button-prev,
  .swiper-button-next {
    width: 2.1rem;
    height: 5.2rem;
    &::after {
      display: none;
    }
  }
  .swiper-button-prev {
    margin-left: 30rem;
    background-image:url('/images/icon_arrow_left.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .swiper-button-next {
    margin-right: 30rem;
    background-image:url('/images/icon_arrow_right.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .swiper-pagination-bullet {
    margin: 0 1.2rem!important;
    width: 1.6rem;
    height: 1.6rem;
  }
  .swiper-pagination-bullet-active{
      background: ${props => props.theme.primary};
  }
  .swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: 2.4rem;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-height: 60.9rem;
  object-fit: cover;
`;