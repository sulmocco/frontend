import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

body{
    background-color: #F2F3F6;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 0;
}

    $primary : #2459e0;
    $secondary : #fdc250;
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline-style: none;
        list-style: none;
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

`;

export default GlobalStyles;
