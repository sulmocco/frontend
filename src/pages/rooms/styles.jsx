import styled from "styled-components";

export const RoomsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .sortWrapper {
    width: 100%;
    max-width: ${(props) => props.theme.contentWidth};
    text-align: right;
    margin-top: 6.2rem;
  }
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
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    .checkedAlcoholWrapper {
      width: 100%;
      overflow: scroll;
      margin-top: 1.6rem;
      padding: 0 2.8rem;
      gap: 0.8rem;
      &::-webkit-scrollbar {
        display: none;
      }
      .checkedAlcohol{
        white-space: pre;
        font-size: 1rem;
        line-height: 1.2rem;
        padding: .6rem .8rem .6rem .6rem;
        gap: .6rem;
        img{
          width: 1.2rem;
          height: 1.2rem;
        }
      }
    }
    .sortWrapper {
      padding: 0 2rem;
    }
  }
`;

export const RoomsTopWrapper = styled.div`
  padding-top: 14.4rem;
  padding-bottom: 4.8rem;
  background-color: ${(props) => props.theme.bg_light_gray};
  width: 100%;
  display: flex;
  justify-content: center;
  & > div {
    width: 100%;
    max-width: ${(props) => props.theme.contentWidth};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding: 2.5rem 2rem 1.8rem;
  }
  /* max-width: ${(props) => props.theme.contentWidth}; */
`;

export const RoomsGrid = styled.div`
  max-width: ${(props) => props.theme.contentWidth};
  width: 100%;
  margin-top: 6.3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  grid-row-gap: 6.4rem;
  grid-column-gap: 4rem;
  margin-bottom: 16rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin-top: 0;
    padding: .8rem 2rem;
    grid-template-columns: repeat(auto-fill, minmax(16.4rem, 1fr));
    grid-column-gap: .7rem;
    grid-row-gap: 1.6rem;
  }
`;

export const PageTitle = styled.h1`
  font-size: 3.4rem;
  line-height: 4.1rem;
  letter-spacing: -0.02em;
  font-weight: 700;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 2.2rem;
    line-height: 2.6rem;
  }
`;

export const AlcoholCategories = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  margin-top: 3.2rem;
  width: 100%;
  max-width: ${(props) => props.theme.contentWidth};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: 100%;
    overflow: scroll;
    margin-top: 2rem;
    padding: 0 2rem;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const AlcoholCategory = styled.button`
  outline: none;
  border: none;
  font-size: 2rem;
  line-height: 2.4rem;
  letter-spacing: -0.04em;
  color: ${(props) =>
    props.checked ? props.theme.primary : props.theme.grey_02};
  font-weight: 700;
  transition: all 0.1s ease-in-out;
  padding: 0.6rem 1.6rem 0.7rem;
  border-radius: 2rem;
  background-color: ${(props) =>
    props.checked ? props.theme.bg_light_blue : props.theme.grey_04};
  &:hover {
    color: ${(props) => props.theme.primary};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    white-space: pre;
    font-size: 1.4rem;
    line-height: 1.7rem;
    padding: 0.8rem 1.4rem 0.7rem;
  }
`;

export const SearchBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 7.2rem;
  .leftWrapper {
    width: 100%;
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
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin-top: 2.8rem;
    .leftWrapper {
      width: 100%;
      p {
        font-size: 1.6rem;
      }
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
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 1rem;
    line-height: 1.2rem;
  }
`;

export const NoList = styled.div`
  padding: 20rem 0;
  font-size: 3.4rem;
  width: 100%;
  text-align: center;
  font-weight: 700;
  color: ${(props) => props.theme.grey_03};
`;

export const RoomsHeaderWrapper = styled.div`
  box-shadow: ${(props) => props.theme.shadow_gray};
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const RoomsTabs = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${(props) => props.theme.contentWidth};
  border-bottom: 0.1rem solid ${(props) => props.theme.grey_04};
  ul {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 8rem;
    gap: 1.6rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding: 0 2rem;
    ul {
      height: 5rem;
    }
  }
`;

export const VersionTab = styled.li`
  flex-grow: 1;
  min-width: 11.9rem;
  font-size: 2.4rem;
  line-height: 3.8rem;
  letter-spacing: -0.02em;
  padding: 0.8rem 1.2rem 0.9rem;
  cursor: pointer;
  color: ${(props) =>
    props.active ? props.theme.primary : props.theme.grey_02};
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.3rem solid
    ${(props) => (props.active ? props.theme.primary : "transparent")};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    min-width: 9.1rem;
    font-size: 1.6rem;
    padding: 0.4rem 0.8rem 0;
  }
`;
