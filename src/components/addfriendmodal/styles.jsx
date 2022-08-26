import styled from "styled-components";
import { BlueButton, UserLevel, WhiteButton } from "../../styles/CommonStyles";

export const ModalWrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`
export const ModalContainer = styled.div`
    width: 81.6rem;
    height: 65.4rem;
    background-color: ${props => props.theme.white};
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1{
        font-weight: 700;
        font-size: 3.2rem;
        line-height: 3.8rem;
        text-align: center;
        letter-spacing: -0.02em;
    }
    .friendProfileWrapper{
        margin-top: 4rem;
        width: 27.2rem;
        height: 27.2rem;
        border-radius: 50%;
        background-color: ${props => props.theme.bg_light_blue};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .friendUsername{
        margin-top: 1.6rem;
        font-weight: 700;
        font-size: 2.6rem;
        line-height: 3.1rem;
        letter-spacing: -0.02em;
    }
`

export const ProfileCircle = styled.div`
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 50%;
    background-image: url(${props => props.src || props.theme.placeholder_profile});
    background-color: #d9d9d9;
    background-size: cover;
    background-position: center;
`

export const AlcoholLevel = styled(UserLevel)`
    background-color: ${props => props.theme.white};
    margin-top: .8rem;
`

export const ButtonWrapper = styled.div`
    margin-top: 5.6rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
`
export const FriendCancelButton = styled(WhiteButton)`
    width: 30rem;
    height: 7.2rem;
    padding: 2rem 1.05rem;
    font-size: 2.6rem;
    line-height: 3.1rem;
`
export const FriendAddButton = styled(BlueButton)`
    width: 30rem;
    height: 7.2rem;
    padding: 2rem 1.05rem;
    font-size: 2.6rem;
    line-height: 3.1rem;
`