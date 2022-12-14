import styled from 'styled-components';

export const NodataWrap = styled.div`
    max-width: ${props => props.theme.contentWidth};
    padding: 14.8rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5.6rem;
    width: 100vw;
    p{
        font-size: 2.6rem;
        font-weight: 700;
        letter-spacing: -0.02rem;
        color: ${props => props.theme.grey_01};
        text-align: center;
    }
    @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
        padding: 5rem 0;
        img {
            width: 20rem;
            height: auto;
        }
        p {
            font-size: 1.8rem;
        }
    }
`