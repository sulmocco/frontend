import styled from 'styled-components';

export const LoginWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.bg_light_gray};
    min-height: calc(100vh - ${props => props.theme.headerSize+" - "+props.theme.footerSize});
    padding-bottom: 13.6rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        background-color: ${props => props.theme.white};
        min-height: calc(100vh - ${props => props.theme.headerSizeMobile+" - "+props.theme.footerSizeMobile});
    }
`

export const LoginSection = styled.div`
    background-color: #fff;
    width: 71.2rem;
    padding: 8.8rem 1.18rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        font-size: 3.2rem;
        font-weight: 700;
        text-align: center;
        /* margin-bottom: 6.4rem; */
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        width: 100%;
        input {
            width: 100%;
            height: 5.6rem;
            border: none;
            background-color: ${props => props.theme.grey_04};
            border-radius: 1rem;
            padding: 1.8rem;
            font-size: 1.6rem;
            &::placeholder{
                color: ${props => props.theme.grey_03};
            }
        }
    }
    label{
        font-size: 2rem;
        font-weight: 700;
        color: ${props => props.theme.grey_01};
        &:first-of-type{
            margin-top: 5.6rem;
        }
        &:last-of-type{
            margin-top: 4rem;
        }
    }
    img{
        margin-top: 3.3rem;
    }
    p {
        color: #000;
        font-size: 2.6rem;
        letter-spacing: -0.12rem;
        margin-top: 2rem;
        display: block;
        cursor: pointer;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        max-width: 100%;
        h1{
            font-size: 3rem;
        }
        img{
            width: 30rem;
        }
    }
` 