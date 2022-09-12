import styled from 'styled-components';

export const ProfileEditWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${props => props.theme.grey_04};
`
export const ProfileEditSection = styled.section`
    width: ${props => props.theme.contentWidth};
    padding: 14.4rem 0 16rem 0;
    h1 {
        font-weight: 700;
        font-size: 3.4rem;
        line-height: 4.057rem;
        letter-spacing: -0.2rem;
    }
    .buttons{
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 2.4rem;
    }
    @media (max-width: ${props => props.theme.breakpoints.mobile}px){
        padding: 5rem 0 ;
        width: 90vw;
        h1 {
            font-size: 2rem;
            line-height: 2.2rem;
        }
        .buttons {
            gap: 1rem;
        }
    }
`
export const ProfileEditCont = styled.div`
    padding: 5.6rem 4rem 14.4rem 4rem;
    display: flex;
    flex-direction: row;
    gap: 4rem;
    @media (max-width: ${props => props.theme.breakpoints.mobile}px){
        padding: 3rem;
        gap: 4rem;
        flex-direction: column;
    }
`
export const MyImgSection = styled.div`
    position: relative;
    background-color: #fff;
    min-width: 40rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem;
    .section{
        display: flex;
        flex-direction: column;
        gap: 3.2rem;
        justify-content: center;
        align-items: center;
        .img {
            width: 8.8rem;
            height: 8.8rem;
            border-radius: 8.8rem;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
            }
        }
        input{
            display: none;
        }
        .button {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: .4rem;
            background-color: ${props => props.theme.grey_04};
            border-radius: 4rem;
            padding: 0.8rem 1.6rem;
            cursor: pointer;
            i {
                width: 2.4rem;
                height: 2.4rem;
            }
            p {
                font-size: 1.6rem;
                line-height: 2rem;
                letter-spacing: -0.04rem;
                font-weight: 400;
                color: ${props => props.theme.grey_02};
                cursor: pointer;
            }
        }
    }
    button {
        position: absolute;
        right: 0;
        bottom: -4.8rem;
        border: none;
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 1.909rem;
        letter-spacing: -0.04rem;
        text-align: center;
        padding: .6rem 1.6rem;
        color: ${props => props.theme.grey_03};
        background-color: #fff;
        border-radius: 2rem;
        cursor: pointer;
    }
    @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
        min-width: 0;
    }
`
export const MyInfoSection = styled.form`
    width: 100%;
`
export const Button = styled.button`
    width: ${props => props.width || '100%'};
    background-color: ${props => props.background || props.theme.primary};
    color: ${props => props.color || props.theme.white};
    border: none;
    cursor: pointer;
    border-radius: 10px;
    font-size: 2.6rem;
    font-weight: 700;
    letter-spacing: -0.02;
    line-height: 3.103rem;
    padding: 2.8rem 4.45rem;
    @media (max-width: ${props => props.theme.breakpoints.mobile}px){
        padding: 2rem;
        font-size: 1.8rem;
        line-height: 2rem;
    }
`