import styled from "styled-components"

export const SignUpButton = styled.button`
    width: ${props => props.width || '100%'};
    height: 7.2rem;
    background-color: ${props => props.background || props.theme.primary};
    color: ${props => props.color || props.theme.white};
    margin-top: ${(props) => props.mt || '2.4rem'};
    border: none;
    cursor: pointer;
    border-radius: 10px;
    font-size: 2.6rem;
    font-weight: 700;
    max-width: 40rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        width: 40rem;
        max-width: 90%;
        font-size: 2.5rem;
        height: 6rem;
        background-color: ${props => props.theme.white};
    }
    &:enabled {
        color: ${props => props.theme.white};
        background-color: ${props => props.theme.primary};
    }
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
    flex-direction: column;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        padding: 0;
        background-color: ${props => props.theme.white};
        form{
            text-align: center;
        }
    }
    /* overflow: auto; */
    /* width: 100vw; */
`