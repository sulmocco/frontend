import styled from 'styled-components';

export const AuthWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.bg_light_gray};
    min-height: calc(100vh - 72px - 120px);
`

export const AuthSection = styled.div`
    background-color: #fff;
    padding: 8.8rem 12.6rem;
    border-radius: 1rem;
    min-height: 40rem;
    text-align: center;
    margin-bottom: 19rem;
    h3{
        font-size: 3.2rem;
        font-weight: 700;
        line-height: 3.819rem;
    }
    p{
        font-size: 2.6rem;
        font-weight: 400;
        letter-spacing: -0.12rem;
        line-height: 3.103rem;
        margin: 2rem 0 6.4rem 0;
    }
` 