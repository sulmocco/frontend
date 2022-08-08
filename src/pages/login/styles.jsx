import styled from 'styled-components';

export const LoginWrap = styled.div`
    display: felx;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: gray;
    min-height: 100vh;
`

export const LoginSection = styled.div`
    background-color: #fff;
    width: 712px;
    height: 581px;
    padding: 88px 156px;
    border-radius: 1rem;
    h1 {
        text-align: center;
        margin-bottom: 6.4rem;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        input {
            height: 5.6rem;
            border: none;
            background-color: #f2f3f3;
            border-radius: 1rem;
            padding: 1.8rem;
        }
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