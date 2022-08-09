import styled from "styled-components"

export const SignUpButton = styled.button`
    width: 100%;
    height: 7.2rem;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white};
    margin-top: 2.4rem;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    font-size: 2.6rem;
    font-weight: 700;
`

export const Container = styled.div`
        background-color: #F2F3F6;
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    padding-top: 13.6rem;
    /* overflow: auto; */
    width: 100vw;
`