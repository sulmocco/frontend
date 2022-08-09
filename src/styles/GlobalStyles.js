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
    a {
        text-decoration: none;
    }
    img {
        border: 0;
        vertical-align: middle;
    }
    html {
        font-size: 10px;
    }
    body {
        font-size: 1rem;
        padding: 0;
        font-family: 'Pretendard-Regular';
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

    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    }

`;

export default GlobalStyles;
