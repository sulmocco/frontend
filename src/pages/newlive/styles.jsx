import styled from "styled-components";

export const StyledInput = styled.input`
  padding: 2rem;
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.grey_04};
  margin-top: 2.4rem;
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
    width: 88rem;
    height: 50.9rem;
    background: #d9d9d9;
  }
  .whatisthis {
    width: 35.7rem;
    height: 20.1rem;
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
