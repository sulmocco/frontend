import styled from "styled-components";

export const TablesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 14.4rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  .checkedAlcoholWrapper{
    margin-top: 1.6rem;
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
    
`

export const AlcoholCategory = styled.button`
    outline: none;
    border: none;
    font-size: 2.6rem;
    line-height: 3.1rem;
    letter-spacing: -0.02em;
    color: ${props => props.checked ? props.theme.black_2 : props.theme.grey_03};
    font-weight: 700;
    transition: all .1s ease-in-out;
    &:hover{
        color: ${props => props.theme.black_2};
    }
`