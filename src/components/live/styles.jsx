import styled from "styled-components";

export const Wrap = styled.div`
  position: relative;
  height: 64.4rem;
`;

export const LiveWrap = styled.div`
  position: relative;
  width: 1280px;

  margin: 0 auto; 
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-top: 70px;
`;

export const Container = styled.div`
  display: flex;
  margin: 70px 0;
  overflow: hidden;
  svg {
    font-size: 24px;
  }
`;

export const Pre = styled.button`
  position: absolute;
  background: white;
  width: 48px;
  height: 48px;

  outline: none;
  border: none;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px gray;

  display: flex;
  justify-content: center;
  align-items: center;

  left: -25px;
  top: 220px;
  z-index: 100;

  svg {
    fill: gray;
    font-size: 28px;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const Next = styled.button`
  position: absolute;
  background: white;
  width: 48px;
  height: 48px;

  outline: none;
  border: none;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px gray;

  display: flex;
  justify-content: center;
  align-items: center;

  right: -25px;
  top: 220px;
  z-index: 100;

  svg {
    fill: gray;
    font-size: 28px;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const Listbox = styled.div`
  margin-right: 20px;
  width: 100%;

  transform: ${(props) => (props.slide ? "translateX(-900px)" : "0")};
  transition: 1s;
`;

export const Image = styled.img`
  width: 420px;
  height: 260px;
  border-radius: 10px;
`;

export const ProfileBox = styled.div`
  display: flex;
  margin-top: 30px;
`;

export const Desc = styled.div`
  display: flex;
  margin-top: 10px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin-left: 5px;
    }
  }
`;

export const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid black;
`;

export const Profile = styled.div`
  width: 264px;
  height: 64px;

  display: flex;
  flex-direction: column;
  margin-left: 20px;
  justify-content: center;
`;

export const Tag1 = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 40px;
  margin-right: 10px;

  background: #ffda93;
  border-radius: 20px;
  padding: 5px 12px 4px;
`;

export const Tag2 = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 40px;
  margin-right: 10px;

  background: #ffefb7;
  border-radius: 20px;
  padding: 5px 12px 4px;
`;

export const Tag3 = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 40px;

  background: #eef3ff;
  border-radius: 20px;
  padding: 5px 12px 4px;
`;
