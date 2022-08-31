import styled from 'styled-components';

export const SpinnerWrap = styled.div`
    width: 100%;
    height: 100vh;
    min-height: calc(100vh - 28.8rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5.6rem;
    img {
        width: ${props => props.size || '22.1rem'};
        height: auto;
        animation: rotate360 1s linear Infinite;
    }
    p{
        font-size: 2.6rem;
        font-weight: 700;
        letter-spacing: -0.02rem;
        color: ${props => props.theme.grey_01};
        line-height: 3.103rem;
    }
    /* @keyframes rotate360 {
        100% {
            transform: rotate(360deg);
        }
    } */
`