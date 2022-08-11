import styled from "styled-components";

export const Carousel = styled.section`
  /* margin-top: 30px; */
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

export const Image = styled.img`
  width: 100%;
  max-height: 60.9rem;
  object-fit: cover;
`;