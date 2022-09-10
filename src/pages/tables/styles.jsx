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
    gap: 1.8rem;
    width: 100%;
    max-width: ${(props) => props.theme.contentWidth};
    .checkedAlcohol {
      background-color: ${(props) => props.theme.grey_04};
      border-radius: 0.2rem;
      padding: 0.6rem 0.8rem 0.7rem;
      font-size: 1.6rem;
      line-height: 1.9rem;
      font-weight: 400;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: ${(props) => props.theme.grey_02};
      cursor: pointer;
      img {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
`;

export const TablesGrid = styled.div`
  width: 100%;
  margin-top: 3.2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40.5rem, 1fr));
  grid-gap: 3.2rem;
`;

export const PageTitle = styled.h1`
  font-size: 3.4rem;
  line-height: 4.1rem;
  letter-spacing: -0.02em;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: .2rem;
  i {
    content: '';
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    background:url('/images/icon_back.svg');
  }
`;

export const TableCont = styled.div`
  width: 100%;
  margin: 0 auto;
  .top {
    width: 100%;
    background-color: ${props => props.theme.bg_light_gray};
    padding-bottom: 4rem;
  }
  .bottom {
    width: 100%;
    background-color: #fff;
    padding-top: 4rem;
    padding-bottom: 12.8rem;
    .rightWrapper {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 0.4rem;
    }
  }
  section {
      width: ${props => props.theme.contentWidth};
      margin: 0 auto;
    }
`

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

export const WirteButton = styled(Link)`
  position: fixed;
  right: calc((100vw - 128rem)/2);
  bottom: 5rem;
  background-color: #fff;
  border-radius: 8rem;
  border: .2rem solid ${props => props.theme.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    width: 19.6rem;
  }
  &:hover p {
    display: block;
  }
  p{
    position: absolute;
    left: 0;
    flex-wrap: nowrap;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -.02;
    line-height: 2.8rem;
    color: ${props => props.theme.grey_02};
    margin: 1.2rem 0 1.2rem 3.2rem;
    text-align: left;
    display: none;
    cursor: pointer;
  }
  span{
    position: absolute;
    right: 0;
    display: block;
    width: 8rem;
    height: 8rem;
    border-radius: 8rem;
    background: url('/images/icon_write.svg') no-repeat center;
    background-color: ${props => props.theme.secondary};
    background-size: 4rem 4.2rem;
    cursor: pointer;
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