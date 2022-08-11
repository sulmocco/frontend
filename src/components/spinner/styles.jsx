import styled from 'styled-components';

export const SpinnerWrap = styled.div`
    width: 100%;
    height: 100vh;
    max-height: calc(100vh - 262px);
    display: flex;
    justify-content: center;
    align-items: center;
    /* span{
        width: 30rem;
        height: 30rem;
        border: 1rem solid ${props => props.theme.grey_03};
        border-radius: 50%;
        border-top: 1rem solid ${props => props.theme.secondary};
        animation: rotate360 1s linear Infinite;
    } */
    img {
        width: 20rem;
        height: auto;
        animation: rotate360 1s linear Infinite;
    }
    @keyframes rotate360 {
        100% {
            transform: rotate(360deg);
        }
    }
`