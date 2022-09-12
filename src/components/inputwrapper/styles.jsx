import styled from "styled-components";

export const Wrapper = styled.div`
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
  max-width: 100%;
  max-height: fit-content;
  button{
    width: 8.2rem;
    height: 2.8rem;
    background-color: ${props => props.theme.primary};
    font-size: 1.6rem;
    font-weight: 700;
    color: ${props => props.theme.white};
    margin-top: 1.6rem;
    border-radius: 2rem;
    outline: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 2rem;
    &:disabled{
      background-color: ${props => props.theme.grey_03};
      cursor: default;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding: 2rem;
    margin-bottom: 0rem;
    button{
      font-size: 1.3rem;
      height: 2.5rem;
      width: 7rem;
      margin-top: 1rem;
    }
  }
`;

export const UpperWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .title{
    font-size: 2rem;
    font-weight: 700;
    margin-top: 0rem !important;
  }
  .error {
    display: flex;
    align-items: center;
    color: ${props => props.theme.error};
    font-size: 1.4rem;
    font-weight: 400;
    img{
        margin-right: .3rem;
    }
  }
  .success{
    display: flex;
    align-items: center;
    color: ${props => props.theme.primary};
    font-size: 1.4rem;
    font-weight: 400;
    img{
        margin-right: .3rem;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    .title{
      font-size: 1.8rem;
    }
    .error{
      font-size: 1.2rem;
    }
    .success{
      descent-override: 1.2rem;
    }
  }
`;

export const GuideText = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.grey_02};
  white-space: pre-line;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px){
    width: 100%;
    text-align: left;
  }
`;

export const CenterWrapper = styled.div`
  margin-top: 1.2rem;
  max-width: 100%;
  position: relative;
  input {
    font-size: 1.6rem;
    /* width: 25rem; */
    width: 100%;
    height: 5.6rem;
    background: #ffffff;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px){
      background-color: ${props => props.theme.bg_light_gray};
    }
    border: ${(props) => {
    if (props.error) {
      return "2px solid " + props.theme.error
    } else if (props.success) {
      return "2px solid" + props.theme.primary
    } else {
      return "2px solid transparent"
    }
  }};
    color: ${props => {
    if (props.error) {
      return props.theme.error
    } else if (props.success) {
      return props.theme.primary
    } else {
      return props.theme.black
    }
  }};
    border-radius: 10px;
    padding-left: 1.2rem;
    box-sizing: border-box;
    &:focus{
        outline: none;
    }
  }
  .dropdownArrow{
    position: absolute;
    top: 0;
    right: 1.2rem;
    height: 100%;
    /* background-color: red; */
    display: flex;
    img{
        cursor: pointer;
        margin: auto;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px){
    margin-top: .8rem;
    input{
      opacity: 1;
    }
  }
`;

export const OptionsWrapper = styled.div`
    background-color: #fff;
    margin-top: .4rem;
    padding: ${props => props.open ? "6px" : 0};
    border-radius: 10px;
    height: ${props => props.open ? "29.2rem" : 0};
    overflow: hidden;
    transition: all .3s ease-in-out;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
      box-shadow: ${props => props.theme.shadow_gray};
    }
    div{
        font-size: 1.6rem;
        padding-left: 6px;
        cursor: pointer;
        height: 5.6rem;
        display: flex;
        align-items: center;
        &:hover{
            &:first-child{
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
            &:last-child{
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
            }
            background-color: ${props => props.theme.bg_light_blue};
            color: ${props => props.theme.primary}
        }
    }
`