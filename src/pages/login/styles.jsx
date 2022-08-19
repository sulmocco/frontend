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
    background-color: #fff;
    padding: 8.8rem 15.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    img{
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
            font-size: 1.6rem;
            width: 100%;
            min-width: 40rem;
        }
    }
    p {
        width: 100%;
        text-align: right;
        color: #7a7a80;
        font-size: 1.6rem;
        letter-spacing: -0.04em;
        margin-top: 16px;
        display: block;
        cursor: pointer;
    }
` 