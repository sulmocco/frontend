import styled from "styled-components";

export const SearchBox = styled.div`
  width: 64rem;
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
`;
