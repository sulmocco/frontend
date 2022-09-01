import styled from "styled-components";

export const Carousel = styled.section`
  .swiper{
    position: relative;
    display: flex;
  }
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
  .swiper-pagination {
    position: absolute;
    left: 135.8rem;
    bottom: 4rem;
    display: flex;
    align-items: center;
    width: 11.7rem;
    height: 3.4rem;
    color: #fff;
    font-size: 1.6rem;
    background-color: #4e4e56;
    border-radius: 2.4rem;
    letter-spacing: -0.04rem;
    &::before {
      content: '';
      display: block;
      background-image: url('/images/icon_pause.svg');
      width: .8rem;
      height: 1.4rem;
      margin: 0 1.9rem 0 1.7rem;
      cursor: pointer;
    }
    span {
      padding: 0 .8rem;
    }
    .swiper-pagination-total {
      color: ${props => props.theme.grey_03};
    }
  }
`;

export const Image = styled.img`
  width: 100%;
  max-height: 60.9rem;
  object-fit: cover;
`;