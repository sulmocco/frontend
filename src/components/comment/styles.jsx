import styled from "styled-components";
import { BlueButton } from "../../styles/CommonStyles";

export const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  h2{
    font-size: 2.6rem;
    font-weight: 700;
    line-height: 3.1rem;
    letter-spacing: -0.02em;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}px){
    h2 {
      font-size: 2rem;
      line-height: 2.2rem;
    }
  }
`;

export const CommentsList = styled.div`
  margin-top: 7.2rem;
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px){
    margin-top: 4rem;
  }
`;

export const NewComment = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 2.4rem;
    gap: 2.4rem;
    input{
        width: 100%;
        background-color: ${props => props.theme.grey_04};
        outline: none;
        border: none;
        padding: 2.4rem 1.2rem;
        border-radius: 1rem;
        font-size: 2rem;
        line-height: 2.4rem;
        font-weight: 500;
        letter-spacing: -0.04rem;
        &::placeholder{
        color: ${props => props.theme.grey_02};
        }
    }
    button{
        background-color: ${props => props.theme.primary};
        color: ${props => props.theme.white};
        width: 13.6rem;
        font-size: 2rem;
        line-height: 2.4rem;
        font-weight: 700;
        border: none;
        border-radius: 1rem;
        &:disabled{
            cursor: default;
            background-color: ${props => props.theme.grey_03};
        }
    }
    @media (max-width: ${props => props.theme.breakpoints.mobile}px){
      margin-top: 1rem;
      gap: 1.2rem;
      input {
        font-size: 1.6rem;
        line-height: 1.8rem;
        padding: 1.5rem;
      }
      button {
        font-size: 1.6rem;
        font-weight: 100.8rem;
      }
  }
`

export const CommentButton = styled(BlueButton)`

`

export const CommentOne = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  letter-spacing: -0.04em;
  padding: 2.4rem .2rem;
  border-top: 1px solid ${props => props.theme.grey_03};
  .upper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .nickname {
    font-size: 2.4rem;
    line-height: 2.9rem;
    color: ${(props) => props.theme.black};
  }
  .content {
    margin-top: 1.2rem;
    font-size: 2rem;
    line-height: 3rem;
    color: ${(props) => props.theme.grey_02};
  }
  .createdAt {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: .4rem;
    img{
        width: 2.4rem;
        height: 2.4rem;
    }
    margin-top: 1.2rem;
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: ${(props) => props.theme.grey_03};
  }
  button {
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: ${(props) => props.theme.grey_02};
    background-color: transparent;
    border: none;
  }
  input{
    margin-top: 1.2rem;
    width: 100%;
    background-color: ${props => props.theme.grey_04};
    outline: none;
    border: none;
    padding: 2.4rem 1.2rem;
    border-radius: 1rem;
    font-size: 2rem;
    line-height: 2.4rem;
    font-weight: 500;
    letter-spacing: -0.04rem;
      &::placeholder{
      color: ${props => props.theme.grey_02};
      }
    }
    @media (max-width: ${props => props.theme.breakpoints.mobile}px){
      padding: 1rem .2rem;
      .nickname{
        font-size: 1.8rem;
        line-height: 2rem;
      }
      button {
        font-size: 1.4rem;
        line-height: 1.6rem;
      }
      input {
        padding: 1.2rem .8rem;
        font-size: 1.6rem;
        line-height: 1.8rem;
      }
      .createdAt{
        font-size: 1.4rem;
        line-height: 1.6rem;
        img{
          width: 2rem;
        }
      }
    }
`;
