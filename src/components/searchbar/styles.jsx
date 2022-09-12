import styled from "styled-components";

export const SearchBox = styled.div`
  width: 100%;
  max-width: 64rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  padding: 2rem 1.2rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.white};
  input {
    flex-grow: 1;
    outline: none;
    border: none;
    &::placeholder {
      color: ${(props) => props.theme.grey_03};
    }
  }
  button {
    width: 2.4rem;
    height: 2.4rem;
    outline: none;
    border: none;
    background-color: transparent;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    max-width: 23.5rem;
    padding: .8rem;
    input{
      font-size: 1rem;
      line-height: 1.2rem;
    }
    button{
      width: 2rem;
      height: 2rem;
      img{
        width: 2rem;
        height: 2rem;
      }
    }
  }
`;
