import styled from "styled-components";

export const Wrap = styled.div`
  position: relative;
  height: 64.4rem;
`;

export const LiveWrap = styled.div`
  position: relative;
  width: ${props => props.theme.contentWidth};
  margin: 0 auto; 
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
  &::-webkit-scrollbar{
  display:none;
  }
`;

export const Listbox = styled.div`
  cursor: pointer;
  margin-right: 1rem;
  width: 42rem;
  transform: ${(props) => (props.slide ? "translateX(-90rem)" : "0")};
  transition: all .2s ease-in-out;
  &:hover{
        transform: translateY(-0.5rem);
    }
`;

export const Image = styled.img`
  width: 42rem;
  height: 26rem;
  border-radius: 1rem;
  object-fit: cover;
`;

export const ProfileBox = styled.div`
  display: flex;
  margin-top: 3rem;
`;

export const Desc = styled.div`
  display: flex;
  margin-top: 1rem;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-left: .5rem;
      color: ${props => props.theme.grey_02};
      font-size: 1.6rem;
      line-height: 1.9rem;
      letter-spacing: -.04rem;
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