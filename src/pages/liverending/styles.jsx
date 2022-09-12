import styled from "styled-components";

export const LiveRendingWrap = styled.div`
  background-color: ${(props) => props.theme.bg_light_gray};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    background-color: ${(props) => props.theme.white};
    padding: 10rem 0;
    min-height: calc(
      100vh - ${(props) => props.theme.headerSizeMobile + " - " + props.theme.footerSizeMobile}
    );
  }
`;

export const LiveRendingCont = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 1rem;
  padding: 9.6rem;
  padding-bottom: 8.2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  .subtitle {
    font-size: 2.6rem;
    font-weight: 400;
    line-height: 3.1rem;
    letter-spacing: -0.02rem;
    margin-top: 1.6rem;
    color: ${(props) => props.theme.grey_02};
  }
  h3 {
    font-size: 3.2rem;
    line-height: 3.819rem;
    font-weight: 700;
    letter-spacing: -0.02rem;
    text-align: center;
  }
  .mainimg {
    max-width: 32.9rem;
    max-height: 32.9rem;
    margin: 4.8rem 0 6.4rem 0;
  }
  .share {
    display: flex;
    flex-direction: row;
    gap: 1.6rem;
    align-items: center;
    width: 100%;
    .url {
      background-color: ${(props) => props.theme.grey_04};
      border-radius: 1rem;
      padding: 2rem 1.6rem;
      position: relative;
      align-items: center;
      gap: 2rem;
      max-height: 6.4rem;
      width: 100%;
      .text {
        line-height: 2.3rem;
        font-size: 2rem;
        color: ${(props) => props.theme.black_02};
        letter-spacing: -0.04rem;
        font-weight: 500;
        outline: none;
        border: none;
        background-color: transparent;
        width: 100%;
      }
      span {
        position: absolute;
        right: 1.2rem;
        top: 0;
        bottom: 0;
        margin: auto;
        height: fit-content;
        background-color: #fff;
        line-height: 2rem;
        font-size: 1.6rem;
        color: ${(props) => props.theme.primary};
        letter-spacing: -0.04rem;
        padding: 0.6rem 1.2rem;
        border-radius: 1rem;
        font-weight: 500;
        cursor: pointer;
      }
    }
    button {
      min-width: 6.4rem;
      min-height: 6.4rem;
      border: none;
      background-color: ${(props) => props.theme.bg_light_blue};
      border-radius: 1rem;
      background-image: url("/images/icon_share.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .button {
    display: flex;
    flex-direction: row;
    gap: 2.4rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 100%;
    padding: 0 2rem;
    h3 {
      font-size: 3rem;
    }
    .subtitle{
      font-size: 1.8rem;
    }
    .mainimg {
      max-width: 25rem;
      max-height: 25rem;
    }
    .share {
      .url {
        width: 100%;
        .text {
          width: 100%;
        }
        span {
        }
      }
      button {
        min-width: 6.3rem;
        min-height: 6.3rem;
      }
    }
  }
`;
