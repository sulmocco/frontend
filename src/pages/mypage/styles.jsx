import styled from 'styled-components';
export const Profile = styled.div`
  display: flex;
  justify-content: center;
  background: #eef3ff;
  border-radius: 1rem;
  padding: 14.4rem 0 8.8rem 0;
  h1 {
    font-weight: 700;
    font-size: 3.4rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}px){
    padding: 4rem 0;
  }
`;

export const Wrap = styled.div`
  width: ${props => props.theme.contentWidth};
  h1 {
    font-weight: 700;
    font-size: 3.4rem;
    text-align: left;
    width: 100%;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}px){
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        font-size: 2rem;
        max-width: 90%;
    }
  }
`;

export const ProfileBox = styled.div`
  padding: 4rem 3.2rem;
  position: relative;
  margin-top: 56px;
  width: ${props => props.theme.contentWidth};
  max-height: 20.8rem;
  background: #fff;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  img {
    width: 8.8rem;
    height: 8.8rem;
    border-radius: 50%;
    object-fit: cover;
  }
  .info {
    margin-left: 1.6rem;
    .level {
      font-weight: 500;
      font-size: 1.2rem;
      background: ${props => props.theme.bg_light_blue};
      border-radius: .4rem;
      color: ${props => props.theme.primary};
      padding: .2rem .8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
    }
    div {
      font-weight: 700;
      font-size: 32px;
    }
  }
  button {
    position: absolute;
    right: 3.2rem;
    font-weight: 500;
    font-size: 1.6rem;
    color: #7a7a80;
    background: #f2f3f3;
    border: none;
    border-radius: 2rem;
    line-height: 2rem;
    letter-spacing: -.04rem;
    padding: .7rem 1.7rem;
  }
  @media (max-width:${props => props.theme.breakpoints.mobile}px){
    max-width: 90vw;
    margin-top: 2rem;
    height: 15rem;
    img {
        width: 6rem;
        height: 6rem;
    }
    .info {
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
            font-size: 2.4rem;
        }
    }
  }
`;

export const MypageNav = styled.nav`
  margin-top: 11.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: ${props => props.theme.contentWidth};
    background-color: #fff;
    border: .2rem solid #f2f3f3;
    box-shadow: 0px 4px 24px rgba(184, 187, 192, 0.16);
    border-radius: 1rem;
  }
  li {
    width: 33.3333%;
    div {
      font-size: 2.6rem;
      color: #7a7a80;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 8rem;
      letter-spacing: -.02rem;
    }
    a {
      &.active {
        font-weight: 700;
        div {
          background: #eef3ff;
          color: #2459e0;
        }
      }
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    margin-top: 5rem;
    ul{
        li{
            div{
                font-size: 1.6rem;
                line-height: 6rem;
                letter-spacing: -.04rem;
            }
        }
    }
  }
`;
