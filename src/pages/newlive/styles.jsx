import styled from "styled-components";

export const StyledInput = styled.input`
  padding: ${(props) => (props.small ? "1.6rem 2rem" : "2rem")};
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.grey_04};
  margin-top: 1.6rem;
  border-radius: 1rem;
  font-size: 2rem;
  line-height: 2.4rem;
  width: 100%;
  &::placeholder {
    color: ${(props) => props.theme.grey_02};
  }
`;

export const NewLiveContainer = styled.div`
  width: 100%;
  margin: 5.7rem 0 15.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .titleWrap {
    display: flex;
    flex-direction: row;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const VersionInputWrap = styled.div`
  position: relative;
  cursor: pointer;
  input {
    font-family: inherit;
    font-size: 1.6rem;
    padding: 0.6rem 0.6rem 0.6rem 1.2rem;
    background-color: ${(props) => props.theme.bg_light_blue};
    border: none;
    border-radius: 0.4rem;
    height: 3.6rem;
    width: 12rem;
    color: ${(props) => props.theme.primary};
    font-weight: 500;
    cursor: pointer;
  }
  img {
    margin-left: -3rem;
  }
  .versionsWrap {
    position: absolute;
    /* padding: .6rem 0; */
    height: ${(props) => (props.open ? 3*props.count : 0)}rem;
    background-color: ${(props) => props.theme.white};
    transition: all 0.3s ease-in-out;
    border: none;
    border-radius: 0.4rem;
    width: 12rem;
    color: ${(props) => props.theme.grey_03};
    font-weight: 500;
    margin-top: 0.6rem;
    display: flex;
    flex-direction: column;
    box-shadow: ${(props) => props.theme.shadow_gray};
    overflow: hidden;
  }
  .version {
    box-sizing: border-box;
    font-size: 1.2rem;
    line-height: 1.4rem;
    padding: 0.8rem 1.1rem;
    &:hover {
      box-sizing: border-box;
      color: ${(props) => props.theme.primary};
      background-color: ${(props) => props.theme.bg_light_blue};
    }
  }
`;

export const SubTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 3.1rem;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.black};
  margin-top: ${(props) => props.mt};
`;

export const AlcoholWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.4rem;
  gap: .8rem;
`;

export const AlcoholButton = styled.div`
  position: relative;
  /* width: fit-content; */
  padding: 6px 16px 7px;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 2rem;
  transition: all 0.1s ease-in-out;
  background-color: ${(props) =>
    props.checked ? props.theme.primary : "transparent"};
  color: ${(props) =>
    props.checked ? props.theme.white : props.theme.grey_03};
  input {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    /* &::after{
            width: 100%;
            content: "호호";
        } */
  }
`;

export const VideoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 5.3rem;
  gap: 4.3rem;
  div {
    flex-grow: 1;
  }
  // TODO: 이 영역이 대체 무엇인지 알아내기
  .video {
    width: 83.7rem;
    height: 55.2rem;
    background: #d9d9d9;
    margin-top: 1.6rem;
  }
  .thumbnail {
    margin-top: 1.6rem;
    width: 40rem;
    height: 26rem;
    background-color: #d9d9d9;
  }
`;

export const SubmitWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  margin-top: 9.6rem;
`;
