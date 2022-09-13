import styled from 'styled-components';

export const AuthWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.bg_light_gray};
    min-height: calc(100vh - ${props => props.theme.footerSize + " - " + props.theme.headerSize});
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        min-height: calc(100vh - ${props => props.theme.footerSizeMobile + " - " + props.theme.headerSizeMobile});
        background-color: ${props => props.theme.white};
    }
`

export const AuthSection = styled.div`
    background-color: #fff;
    padding: 8.8rem 12.6rem;
    border-radius: 1rem;
    min-height: 40rem;
    text-align: center;
    margin-bottom: 19rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        padding: 4rem;
    }
    h3{
        font-size: 3.2rem;
        font-weight: 700;
        line-height: 3.819rem;
    }
    span {
        display: block;
        padding: 4rem 0;
        p{
        font-size: 2.6rem;
        font-weight: 400;
        letter-spacing: -0.12rem;
        line-height: 4.5rem;
        i {
            position: relative;
            z-index: 9;
            &::before {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                display: block;
                width: 100%;
                height: 1.5rem;
                background-color: ${props => props.theme.light_yellow_01};
                z-index: -1;
                border-radius: 1rem;
            }
        }
    }
    }
` 