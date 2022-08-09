import styled from "styled-components";

export const Wrapper = styled.div`
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5rem;
  max-width: 100%;
`;

export const UpperWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .title{
    font-size: 1.25rem;
    font-weight: 700;
  }
  .error {
    display: flex;
    align-items: center;
    color: ${props => props.theme.error};
    font-size: .875rem;
    font-weight: 400;
    img{
        margin-right: .3rem;
    }
  }
`;

export const GuideText = styled.div`
  margin-top: 0.625rem;
  font-size: 12px;
  color: ${(props) => props.theme.grey_02};
  white-space: pre-line;
`;

export const CenterWrapper = styled.div`
  margin-top: 0.75rem;
  max-width: 100%;
  position: relative;
  input {
    font-size: 1rem;
    /* width: 25rem; */
    width: 100%;
    height: 3.5rem;
    background: #ffffff;
    border: ${(props) => (props.error ? "2px solid "+ props.theme.error : "2px solid transparent")};
    color: ${props => props.error ? props.theme.error : "#000000"};
    border-radius: 10px;
    padding-left: .75rem;
    box-sizing: border-box;
    &:focus{
        outline: none;
    }
  }
  .dropdownArrow{
    position: absolute;
    top: 0;
    right: .75rem;
    height: 100%;
    /* background-color: red; */
    display: flex;
    img{
        cursor: pointer;
        margin: auto;
    }
  }
`;

export const OptionsWrapper = styled.div`
    background-color: #fff;
    margin-top: .25rem;
    padding: ${props => props.open ? "6px" : 0};
    border-radius: 10px;
    height: ${props => props.open ? "17.5rem" : 0};
    overflow: hidden;
    transition: all .3s ease-in-out;
    div{
        font-size: 1rem;
        padding-left: 6px;
        cursor: pointer;
        height: 3.5rem;
        display: flex;
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