import styled from 'styled-components';

export const LoginWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.bg_light_gray};
    min-height: calc(100vh - 72px - 120px);
`

export const LoginSection = styled.div`
    margin: 13.6rem 0;
    background-color: #fff;
    width: 712px;
    /* height: 581px; */
    padding: 88px 156px;
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
        text-align: right;
        color: #7a7a80;
        font-size: 1.6rem;
        letter-spacing: -0.04em;
        margin-top: 16px;
        display: block;
        cursor: pointer;
    }
` 