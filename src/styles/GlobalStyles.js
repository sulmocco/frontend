import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    $primary : #2459e0;
    $secondary : #fdc250;
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline-style: none;
    }
    ul,li {
        list-style: none;
        cursor: default;
    }
    a, a:visited {
        text-decoration: none;
        color: inherit;
    }
    img {
        border: 0;
        vertical-align: middle;
    }
    html {
        font-size: 10px;
        @media (max-width: 1280px) {
            font-size: 8px;
        }
    }
    
    body {
        font-size: 1rem;
        padding: 0;
        font-family: 'Pretendard';
    }
    h1,h2,h3,h4 {
        cursor: default;
    }
    p, span {
        cursor: default;
    }
    button {
        cursor: pointer;
    }

    .errorPage{
        height: calc(100vh - 17.59rem);
        width: 100%;
        padding-top: ${props => props.theme.headerSize};
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 2rem;
        @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
            padding-top: ${props => props.theme.headerSizeMobile};
        }
        h1{
            font-size: 4rem;
            color: #B8BBC0;
        }
        img{
            width: 26.3rem;
            height: 26.3rem;
        }
    }

    // 기본
    @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    }
    // 500
    @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    }
    // 700
    @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    }

`;

export default GlobalStyles;
