import { Link } from "react-router-dom";
import styled from "styled-components";

export const TablesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 14.4rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  .checkedAlcoholWrapper {
    margin-top: 1.6rem;
    display: flex;
    flex-direction: row;
    gap: .8rem;
  }
`;

export const TablesGrid = styled.div`
  width: 100%;
  margin-top: 3.2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40.5rem, 1fr));
  grid-gap: 3.2rem;
`;

export const PageTitle = styled.h1`
  font-size: 3.4rem;
  line-height: 4.1rem;
  letter-spacing: -0.02em;
  font-weight: 700;
`;

export const AlcoholCategories = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.4rem;
  margin-top: 3.2rem;
`;

export const AlcoholCategory = styled.button`
  outline: none;
  border: none;
  font-size: 2.6rem;
  line-height: 3.1rem;
  letter-spacing: -0.02em;
  color: ${(props) =>
    props.checked ? props.theme.black_2 : props.theme.grey_03};
  font-weight: 700;
  transition: all 0.1s ease-in-out;
  background-color: transparent;
  &:hover {
    color: ${(props) => props.theme.black_2};
  }
`;
export const SearchBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 6.4rem;
  .leftWrapper {
    display: flex;
    flex-direction: column;
    p {
      font-size: 2rem;
      font-weight: 400;
      color: ${(props) => props.theme.grey_02};
    }
    span {
      font-weight: 500;
      color: ${(props) => props.theme.black_2};
    }
  }
  .rightWrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 0.4rem;
  }
`;

export const SortButton = styled.button`
  border: none;
  font-size: 1.6rem;
  line-height: 1.9rem;
  letter-spacing: -0.04em;
  background-color: transparent;
  color: ${(props) =>
    props.checked ? props.theme.black_2 : props.theme.grey_03};
`;

export const WriteButton = styled(Link)`
  position: relative;
  /* background-color: aliceblue; */
  box-sizing: inherit;
  width: 100%;
  .absolute{
    /* background-color: teal; */
    position: absolute;
    top: 0%;
    left: calc(100% - 8rem);
    /* right: 0%; */
  }
  .fixed{
    position: fixed;
    top: 80rem;
    /* right: 0; */
    background-color: ${props => props.theme.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  border-radius: 4rem;
  box-shadow: ${props => props.theme.shadow_gray};
  z-index: 400;
  }
  img{
    width: 3.2rem;
    height: 3.52rem;
  }
`

export const NoList = styled.div`
  padding: 20rem 0;
  font-size: 3.4rem;
  width: 100%;
  text-align: center;
  font-weight: 700;
  color: ${props => props.theme.grey_03};
`