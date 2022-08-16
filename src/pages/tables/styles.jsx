import styled from "styled-components";

export const TablesWrapper = styled.div`
    width: 100%;
    max-width: 100vw;
    padding: 10rem 0;
    display: grid;
    /* flex-wrap: wrap; */
    /* grid-template-columns: 1fr 1fr 1fr; */
    /* gap: 3.2rem; */
    grid-template-columns: repeat(auto-fit, minmax(40.5rem, 1fr));
    grid-gap: 3.2rem;
`