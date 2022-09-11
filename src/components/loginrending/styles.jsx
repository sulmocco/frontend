import styled from "styled-components";

export const Rending = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    max-width: 100vw;
  }
`;
export const RendingSection = styled.section`
  background-color: ${(props) => props.color || "#EEF3FF"};
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const RendingCont = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    max-width: 100vw;
    padding: 30rem 2rem 6.2rem 2rem;
  }
  max-width: 129.6rem;
  padding: 26.4rem 0 6.2rem 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .desc {
    position: absolute;
    left: 0;
    top: 14.6rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
      top: 8rem;
      padding: 2rem;
    }
    span {
      font-weight: 700;
      color: ${(props) => props.theme.primary};
      font-size: 2.6rem;
      line-height: 3.4rem;
      letter-spacing: -0.04rem;
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        font-size: 2.2rem;
      }
    }
    h3 {
      font-size: 5.6rem;
      line-height: 6.683rem;
      font-weight: 800;
      letter-spacing: -0.02rem;
      margin-top: 1.2rem;
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        font-size: 4.5rem;
        margin-top: 0rem;
      }
    }
    p {
      font-size: 2.2rem;
      line-height: 3.4rem;
      font-weight: 500;
      color: ${(props) => props.theme.grey_01};
      letter-spacing: -0.04rem;
      margin-top: 3.2rem;
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        font-size: 2rem;
        line-height: 3rem;
        margin-top: 1rem;
      }
    }
  }
  img {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
      max-width: 100%;
    }
    max-width: 93.4rem;
  }
  .signup {
    font-size: 2rem;
    color: ${(props) => props.theme.grey_02};
    line-height: 2.4rem;
    letter-spacing: -0.04rem;
    margin-top: 2.4rem;
    cursor: pointer;@media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        font-size: 2.5rem;
    }
  }
`;
export const RendingContRow = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    max-width: 100vw;
    padding: 2rem;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 5rem;
  }
  width: ${(props) => props.theme.contentWidth};
  padding: 16rem 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  img {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
      display: block;
      max-width: 100%;
      margin-bottom: 2rem;
    }
  }
  span {
    font-weight: 700;
    color: ${(props) => props.theme.primary};
    font-size: 2.4rem;
    line-height: 3.4rem;
    letter-spacing: -0.04rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
      font-size: 2.2rem;
    }
  }
  h3 {
    font-size: 4.8rem;
    line-height: 6.683rem;
    font-weight: 800;
    letter-spacing: -0.02rem;
    margin-top: 1.2rem;
    color: ${(props) => props.theme.black_02};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
      font-size: 4.5rem;
      margin-top: 1rem;
      line-height: 5rem;
    }
  }
  p {
    font-size: 2.2rem;
    line-height: 3.3rem;
    font-weight: 500;
    color: ${(props) => props.theme.grey_01};
    letter-spacing: -0.04rem;
    margin-top: 3.2rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
      font-size: 2rem;
      line-height: 3rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
`;
