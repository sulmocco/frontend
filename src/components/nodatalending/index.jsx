import styled from 'styled-components';

export const NodataWrap = styled.div`
    padding: 14.8rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5.6rem;
    p{
        font-size: 2.6rem;
        font-weight: 700;
        letter-spacing: -0.02rem;
        color: ${props => props.theme.grey_01};
    }
`