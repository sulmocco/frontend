import styled from "styled-components"

export const SignUpButton = styled.button`
    width: 100%;
    height: 4.5rem;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white};
    margin-top: 1.5rem;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    font-size: 1.625rem;
    font-weight: 700;
`