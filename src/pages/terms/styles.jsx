import styled from 'styled-components';

export const TermsWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #e3e5e9;
`

export const Termsection = styled.div`
    padding: 8.8rem 8.4rem;
    background-color: #fff;
    border-radius: 1rem;
    max-width: 71.2rem;
    max-height: 88.5rem;
    h2 {
        font-weight: 700;
        font-size: 3.2rem;
        line-height: 4.7rem;
        letter-spacing: -0.5px;
        text-align: center;
    }
    ul {
        margin-top: 4.9rem;
        display: flex;
        flex-direction: column;
        li{
            position: relative;
            display: flex;
            flex-direction: row;
            padding: 2rem 2.2rem;
            align-items: center;
            max-height: 6.4rem;
            gap: 1.6rem;
            &:after {
                content: '';
                position: absolute;
                right: 2rem;
                display: block;
                background-image: url('/images/icon_arrow_right_gray.svg');
                width: 1.4rem;
                height: 2.4rem;
            }
            &:first-child:after{
                display: none;
            }
            input{
                display: none;
            }
            label {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 2.4rem;
                height: 2.4rem;
                border-radius: 50%;
                background-color: #e3e5e9;
                cursor: pointer;
                &:after {
                    content: '';
                    display: block;
                    background-image: url('/images/icon_check_gray.svg');
                    width: 1.6rem;
                    height: 1rem;
                }
            }
            p {
                font-weight: 400;
                size: 2rem;
                color: #4e4e56;
            }
        }
        .all_check {
            background-color: #f2f3f3;
            border-radius: 1rem;
            margin: 1.3rem 0;
            p {
                font-weight: 700;
                font-size: 2.6rem;
            }
            &:after {
                display: none;
            }
        }
    }
    P {
        font-size: 1.4rem;
        color: #7a7a80;
    }
    .desc {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }
`