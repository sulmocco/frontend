import styled from "styled-components";
import { BlueButton, WhiteButton } from "../../styles/CommonStyles";
import { memo } from "react";

export const StyledInput = memo(styled.input`
  padding: ${(props) => (props.small ? "1.6rem 2rem" : "2rem")};
  border: ${(props) =>
    props.error ? ".2rem solid " + props.theme.error : "none"};
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
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    line-height: 2rem;
    padding: 1rem 1.5rem;
    font-size: 1.4rem;
    margin-top: 1rem;
  }
`);

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
  .themeShowWrap{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 4rem;
      .theme{
        flex-grow: 1;
      }
      .showOption{
        width: 40rem;
      }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin: 2.5rem 0;
    padding: 0 2rem;
    .titleWrap{
      gap: 1rem;
    }
    .themeShowWrap{
      flex-direction: column;
      gap: 0rem;
      .theme{
        width: 100%;
      }
      .showOption{
        width: 100%;
      }
    }
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
    -webkit-text-fill-color: ${(props) => props.theme.primary};
    opacity: 1;
    font-weight: 500;
    cursor: pointer;
  }
  img {
    margin-left: -3rem;
  }
  .versionsWrap {
    position: absolute;
    height: ${(props) => (props.open ? 3 * props.count : 0)}rem;
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
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 10rem;
    input{
      font-size: 1rem;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
      height: 2.6rem;
      width: 100%;
    }
    .versionsWrap{
      width: 100%;
      height: ${(props) => (props.open ? 2.4 * props.count : 0)}rem;
    }
    .version{
      font-size: 1rem;
      padding: .5rem 1rem;
    }
  }
`;

export const SubtitleWrapper = (styled.div`
  margin-top: ${(props) => (props.mt ? props.mt : "4rem")};
  width: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  justify-content: flex-start;
  align-items: center;
  gap: 1.6rem;
  .error {
    color: ${(props) => props.theme.error};
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 0.6rem;
    img {
      width: 1.4rem;
      height: 1.4rem;
    }
    label {
      font-size: 1.4rem;
      line-height: 1.7rem;
      letter-spacing: -0.04em;
      font-weight: 400;
      color: inherit;
    }
  }
  .guidebubble {
    border-image: url("/images/img_guide_bubble.svg");
    border-image-slice: 18 13 13 13 fill;
    border-image-width: auto;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: stretch stretch;
    border-style: solid;
    padding: 0.6rem 0.9rem 0.6rem 1.8rem;
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.4rem;
    letter-spacing: -0.06em;
    margin-top: 0.3rem;
    color: ${(props) => props.theme.primary};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin-top: 4rem;
    gap: 1rem;
  }
`);

export const SubTitle = memo(styled.h2`
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 3.1rem;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.black};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 2rem;
  }
`);

export const AlcoholWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.4rem;
  gap: 0.8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 100%;
    overflow: auto;
    gap: 0.6rem;
    margin-top: 2rem;
    ::-webkit-scrollbar{
      display: none;
    }
  }
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
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 1.5rem;
    white-space: pre;  
    background-color: ${(props) => props.checked ? props.theme.primary : props.theme.bg_light_gray};
  }
`;

export const VideoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 5.3rem;
  gap: 4rem;
  h1 {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  div {
    flex-grow: 1;
  }
  .video {
    width: 83.7rem;
    height: 55.2rem;
    background: ${(props) => props.theme.grey_04};
    margin-top: 1.6rem;
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 25rem;
      height: 25rem;
    }
    video {
      width: 100%;
      height: 100%;
      background-color: ${(props) =>
        props.isInput ? props.theme.black : "#d9d9d9"};
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    .video{
      width: 100%;
      height: 30rem;
    }
  }
`;

export const SubmitWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  margin-top: 9.6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
   width: 100%;
   position: fixed;
   left: 0;
   bottom: 0;
   height: fit-content;
   flex-direction : row;
   gap: 1rem;
   background-color: ${props => props.theme.white};
   box-shadow: ${props => props.theme.shadow_gray};
   padding: 1rem 1rem 3rem;
  }
`;

export const VideoDevicesDropdownWrapper = styled.div`
  /* display: flex;
flex-direction: row; */
  position: relative;
  .notAvailable {
    padding: 1.6rem 2rem;
    margin-top: 1.6rem;
    font-size: 2rem;
    line-height: 2.4rem;
    color: ${(props) => props.theme.grey_03};
  }
  .inputWrap {
    display: flex;
    flex-direction: row;
    padding: 1.6rem 2rem;
    cursor: pointer;
    outline: none;
    background-color: ${(props) => props.theme.grey_04};
    margin-top: 1.6rem;
    border-radius: 1rem;
    font-size: 2rem;
    line-height: 2.4rem;
    width: 100%;
    &::placeholder,
    &::-webkit-input-placeholder,
    input::-webkit-input-placeholder {
      color: ${(props) => props.theme.grey_02};
      opacity: 1;
    }
    input {
      flex-grow: 1;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      border: none;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: transparent;
      color: ${(props) => props.theme.grey_02};
      -webkit-text-fill-color: ${(props) => props.theme.grey_02};
      opacity: 1;
    }
  }
  img {
    /* position: absolute; */
  }
  .devicesWrap {
    background-color: aliceblue;
    position: absolute;
    height: ${(props) => (props.open ? 5.6 * props.count : 0)}rem;
    background-color: ${(props) => props.theme.white};
    transition: all 0.3s ease-in-out;
    border: none;
    border-radius: 0.4rem;
    width: 40rem;
    color: ${(props) => props.theme.grey_03};
    font-weight: 500;
    margin-top: 1.2rem;
    display: flex;
    flex-direction: column;
    box-shadow: ${(props) => props.theme.shadow_gray};
    overflow: hidden;
    z-index: 200;
  }
  .device {
    /* background-color: antiquewhite; */
    box-sizing: border-box;
    font-size: 2rem;
    line-height: 2.4rem;
    padding: 1.6rem 2rem;
    letter-spacing: -0.04em;

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
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 100%;
    .notAvailable{
      font-size: 1.4rem;
      padding: 1rem 1.5rem;
      line-height: 2rem;
    }
    .inputWrap{
      font-size: 1.4rem;
      padding: 1rem 1.5rem;
      margin-top: 1rem;
    }
    .devicesWrap{
      width: 100%;
      height: ${(props) => (props.open ? 4 * props.count : 0)}rem;
      .device{
        font-size: 1.4rem;
        line-height: 2rem;
        padding: 1rem 1.5rem;
      }
    }
  }
`;

export const ThumbnailDropzone = styled.div`
  margin-top: 1.6rem;
  width: 40rem;
  height: 26rem;
  background-color: ${(props) => props.theme.grey_04};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.grey_02};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.7rem;
  letter-spacing: -0.04em;
  cursor: pointer;
  background-image: ${(props) => "url(" + props.src + ")"};
  background-size: cover;
  background-position: center;
  border: ${(props) =>
    props.isDrop ? ".1rem solid " + props.theme.grey_03 : "none"};
  svg {
    margin-bottom: 0.8rem;
  }
  p {
    cursor: inherit;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 100%;
  }
`;

export const StartLiveButton = styled(BlueButton)`
  width: 100%;
  max-width: 36.8rem;
  height: 8.8rem;
  padding: 2.8rem 4.45rem;
  font-size: 2.6rem;
  line-height: 3.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    height: 6rem;
    font-size: 2rem;
  }
`;

export const CancelButton = styled(WhiteButton)`
  width: 100%;
  max-width: 36.8rem;
  height: 8.8rem;
  padding: 2.8rem 4.45rem;
  font-size: 2.6rem;
  line-height: 3.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    height: 6rem;
    font-size: 2rem;
  }
`;

export const ShowHideDropdownWrapper = styled(VideoDevicesDropdownWrapper)`
  .inputWrap {
    padding: 2rem;
  }
  .devicesWrap {
    height: ${(props) => (props.open ? 6.4 * props.count : 0)}rem;
  }
  .device {
    padding: 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    .inputWrap{
      padding: 1rem 1.5rem;
    }
    .devicesWrap {
    height: ${(props) => (props.open ? 4 * props.count : 0)}rem;
    }
  }
`;
