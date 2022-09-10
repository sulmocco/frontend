import styled from "styled-components";

export const LiveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  /* div{
        display: flex;
        flex-direction: column;
    } */
  .live_left_box {
    /* width: 133.6rem; */
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    .upper {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: fit-content;
      background-color: ${(props) => props.theme.white};
      padding-top: 4.8rem;
      padding-left: 4.8rem;
      padding-right: 4.8rem;
      padding-bottom: 1.6rem;
    }
    .lower {
      width: 100%;
      height: fit-content;
      background-color: ${(props) => props.theme.white};
      padding: 3.2rem 4.8rem 4.8rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .live_right_box {
    width: 58.4rem;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
  }
  .infoWrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .statWrap {
    display: inline-flex;
    align-items: center;
    /* width: 50%; */
    flex-direction: row;
    /* background-color: red; */
    gap: 0.8rem;
    margin-top: 3.1rem;
    height: 2.4rem;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.9rem;
    letter-spacing: -0.04em;
    color: ${(props) => props.theme.grey_02};
    & > div {
      background-color: ${(props) => props.theme.grey_03};
    }
    img {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;

export const RoomDataWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  align-items: flex-end;
  height: fit-content;
  width: 100%;
  .tagWrap {
    margin-top: 1.6rem;
    display: inline-flex;
    flex-direction: row;
    gap: 0.8rem;
    height: 2.7rem;
  }
  .shareWrap {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    button {
      display: flex;
      align-items: center;
      flex-direction: row;
      border: 0.1rem solid ${(props) => props.theme.primary};
      border-radius: 2rem;
      padding: 0.4rem 1.2rem;
      background-color: #fff;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2rem;
      letter-spacing: -0.04rem;
      gap: 0.8rem;
      &:after {
        content: "";
        width: 2.4rem;
        height: 2.4rem;
        background: url("/images/icon_share.svg") no-repeat center;
        background-size: 1.4rem 1.5rem;
      }
    }
  }
`;

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: fit-content;
  gap: 1.6rem;
  .userWrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.8rem;
  }
  .username {
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.8rem;
    letter-spacing: -0.02em;
    color: ${(props) => props.theme.primary};
  }
`;

export const ProfileCircle = styled.div`
  display: flex;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  background-image: url(${(props) => props.src || props.theme.placeholder_profile});
  background-color: #d9d9d9;
  background-size: cover;
  background-position: center;
`;

export const AddHostFriendButton = styled.div`
  background-color: ${(props) => props.theme.grey_04};
  width: fit-content;
  height: fit-content;
  padding: 0.2rem 0.8rem;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  color: ${(props) => props.theme.grey_02};
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.4rem;
  letter-spacing: -0.04em;
  cursor: pointer;
  span {
    font-weight: inherit;
    cursor: pointer;
  }
`;

export const VideoContainer = styled.div`
  background-color: ${(props) =>
    props.host ? props.theme.white : props.theme.bg_light_gray};
  width: 100%;
  flex-grow: 1;
  position: relative;
  .videoWrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #video-container {
    width: 100%;
    height: 100%;
    max-width: 124rem;
    /* display: grid;
        grid-template-columns: repeat(auto-fit, minmax(40rem, 3fr));
        grid-gap: 2rem; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  .container,
  #session {
    height: 100%;
  }
  .container {
    overflow: auto;
  }
  #session {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .stream-container {
    border-radius: 1rem;
    overflow: hidden;
    /* width: 100%;
        height: 100%; */
    width: ${(props) => (props.host ? "100%" : "40rem")};
    height: ${(props) => (props.host ? "100%" : "27.2rem")};
  }
  .streamcomponent {
    height: 100%;
    position: relative;
    background-color: ${(props) => props.theme.black};
  }
  .videousername {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: 1.2rem;
    margin-left: 1.2rem;
    border-radius: 4rem;
    display: ${(props) => (props.host ? "none" : "flex")};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 1rem;
    color: ${(props) => props.theme.white};
    background-color: rgba(0, 0, 0, 0.6);
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 2rem;
    letter-spacing: -0.04em;
    z-index: 100;
    img {
      margin-right: 0.4rem;
    }
    svg {
      margin-left: 0.8rem;
      width: 2rem;
      height: 2rem;
    }
  }
  video {
    border-radius: 1rem;
    height: 100%;
  }
  .videoButtonWrap {
    gap: 2.4rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 3.2rem;
  }
`;

export const VideoButton = styled.button`
  position: relative;
  padding: 1.6rem 1.6rem 1.6rem 2.4rem;
  background-color: ${(props) =>
    props.play ? props.theme.white : props.theme.grey_04};
  border-radius: 1rem;
  box-shadow: ${(props) => props.theme.shadow_gray};
  border: none;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  z-index: 200;
  &:hover {
    transform: translateY(-0.5rem);
  }
  img {
    width: 4rem;
    height: 4rem;
  }
  .videoarrow {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 3.2rem;
    height: 3.2rem;
    transition: all 0.2s ease-in-out;
    background-color: ${(props) => props.theme.grey_04};
    border-radius: 1rem;
    img {
      width: 1.6rem;
      height: 0.817rem;
      transform: rotate(${(props) => (props.open ? "180deg" : "0deg")});
    }
  }
  .devicesWrap {
    background-color: aliceblue;
    position: absolute;
    bottom: 8.8rem;
    left: 0;
    height: ${(props) => (props.open ? 5.6 * props.count : 0)}rem;
    background-color: ${(props) => props.theme.white};
    transition: all 0.3s ease-in-out;
    border: none;
    border-radius: 1rem;
    width: 31.2rem;
    color: ${(props) => props.theme.grey_03};
    font-weight: 500;
    margin-top: 1.2rem;
    display: flex;
    flex-direction: column;
    box-shadow: ${(props) => props.theme.shadow_gray};
    overflow: hidden;
  }
  .device {
    /* background-color: antiquewhite; */
    box-sizing: border-box;
    font-size: 2rem;
    line-height: 2.4rem;
    padding: 1.6rem 2rem;
    letter-spacing: -0.04em;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
      box-sizing: border-box;
      color: ${(props) => props.theme.primary};
      background-color: ${(props) => props.theme.bg_light_blue};
    }
  }
  .deviceKind {
    padding: 1.6rem 1.6rem 1.2rem 1.6rem;
    font-size: 2rem;
    line-height: 2.8rem;
    font-weight: 700;
    color: ${(props) => props.theme.black};
    text-align: left;
    cursor: default;
  }
`;

export const ChatHeader = styled.div`
  background-color: ${(props) => props.theme.primary};
  padding: 2rem 2.4rem 2rem 3.2rem;
  font-size: 2rem;
  line-height: 2.4rem;
  letter-spacing: -0.02em;
  font-weight: 700;
  color: ${(props) => props.theme.white};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
  }
  img {
    width: 3.2rem;
    height: 3.2rem;
  }
  button {
    padding: 0.8rem;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.white};
    border: none;
  }
`;

export const ChatWrapper = styled.div`
  /* background: red; */
  width: 100%;
  height: 100%;
  padding: 3.2rem 3.3rem 0rem;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

export const ChatContent = styled.div`
  font-size: 2rem;
  line-height: 2.4rem;
  letter-spacing: -0.02rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1.6rem;
  flex-wrap: wrap;
  position: relative;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    padding-bottom: 15.2rem;
  }
  .chatuser {
    width: fit-content;
    /* flex-grow: 1; */
    color: ${(props) => props.theme.secondary};
    font-weight: 700;
  }
  .chattext {
    flex-grow: 1;
    color: ${(props) => props.theme.grey_01};
    margin-left: 0.4rem;
    font-weight: 500;
  }
`;

export const ChatInputWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15.2rem;
  background: linear-gradient(
    0deg,
    #ffffff 22.37%,
    rgba(255, 255, 255, 0) 115.13%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2.4rem 4.8rem;
  /* box-sizing: border-box; */
  form {
    width: 100%;
  }
  .sendInputWrapper {
    /* position: relative; */
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.grey_04};
    border-radius: 1rem;
    padding: 0.8rem 1.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;
  }
  button {
    padding: 0.9rem 0.9rem 0.7rem 0.7rem;
    background-color: ${(props) => props.theme.primary};
    border: none;
    border-radius: 1rem;
    img {
      width: 3.2rem;
      height: 3.2rem;
    }
  }
  input {
    background-color: transparent;
    border: none;
    font-size: 2rem;
    line-height: 2.4rem;
    letter-spacing: -0.04rem;
    color: ${(props) => props.theme.grey_02};
    font-weight: 500;
    padding-left: 0.8rem;
    flex-grow: 1;
  }
`;
