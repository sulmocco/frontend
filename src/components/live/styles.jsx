import styled from "styled-components";

export const Wrap = styled.div`
  position: relative;
  height: 64.4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    height: fit-content;
    padding-bottom: 2rem;
  }
`;

export const LiveWrap = styled.div`
  position: relative;
  width: ${(props) => props.theme.contentWidth};
  margin: 0 auto;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    max-width: 100vw;
  }
`;

export const Title = styled.div`
  font-size: 3.2rem;
  font-weight: 700;
  margin-top: 7rem;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  margin: 7rem 0;
  svg {
    font-size: 2.4rem;
  }
  width: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Listbox = styled.div`
  cursor: pointer;
  margin-right: 1rem;
  width: 42rem;
  transform: ${(props) => (props.slide ? "translateX(-90rem)" : "0")};
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-0.5rem);
  }
  .tagWrap {
    display: flex;
    margin-top: 4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 30rem;
    .tagWrap {
      margin-top: 1rem;
    }
  }
`;

export const Image = styled.img`
  width: 42rem;
  height: 26rem;
  border-radius: 1rem;
  object-fit: cover;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 30rem;
    height: 20rem;
  }
`;

export const ProfileBox = styled.div`
  display: flex;
  margin-top: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin-top: 1rem;
  }
`;

export const Desc = styled.div`
  display: flex;
  margin-top: 1rem;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-left: 0.5rem;
      color: ${(props) => props.theme.grey_02};
      font-size: 1.6rem;
      line-height: 1.9rem;
      letter-spacing: -0.04rem;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    img {
      width: 2rem;
    }
  }
`;

export const ProfileImage = styled.img`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
`;

export const Profile = styled.div`
  width: 26.4rem;
  height: 6.4rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
