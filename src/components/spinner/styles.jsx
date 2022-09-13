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
        width: ${props => props.size || '40rem'};
        height: auto;
        margin-top: -10rem;
    }
    p{
        font-size: 2.6rem;
        font-weight: 700;
        letter-spacing: -0.02rem;
        color: ${props => props.theme.grey_01};
        line-height: 3.103rem;
    }
    @media (max-width:1024px) {
        gap: 2.5rem;
        max-height: calc(100vh - 15rem);
        img {
            width: 30rem
        }
        p {
            font-size: 2.2rem;
            line-height: 2.4rem;
        }
    }
`