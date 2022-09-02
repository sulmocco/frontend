import styled from "styled-components";

export const LiveWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    background-color: aliceblue;
    height: 100vh;
    /* div{
        display: flex;
        flex-direction: column;
    } */
    .live_left_box{
        /* width: 133.6rem; */
        flex-grow: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        .upper{
            width: 100%;
            display: flex;
            flex-direction: column;
            height: fit-content;
            background-color: ${props => props.theme.white};
            padding-top: 5.1rem;
            padding-left: 4.8rem;
            padding-right: 4.8rem;
            padding-bottom: 2.4rem;
        }
    }
    .live_right_box{
        width: 58.4rem;
        height: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        position: relative;
    }
    .infoWrap{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .tagWrap{
        /* background-color: blue; */
        display: inline-flex;
        /* width: 50%; */
        flex-direction: row;
        gap: .8rem;
        margin-top: 4rem;
        height: 2.7rem;
    }
    .statWrap{
        display: inline-flex;
        align-items: center;
        /* width: 50%; */
        flex-direction: row;
        /* background-color: red; */
        gap: .8rem;
        margin-top: 4rem;
        height: 2.7rem;
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.8rem;
        letter-spacing: -0.04em;
        color: ${props => props.theme.grey_02};
        &>div{
            background-color: ${props => props.theme.grey_03};
        }
        img{
            width: 2.4rem;
            height: 2.4rem;
        }
    }
`

export const ProfileWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.2rem;
    align-items: flex-end;
    height: fit-content;
    width: 100%;
    .shareWrap {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        h1{
        font-size: 2.6rem;
        font-weight: 700;
        line-height: 3.1rem;
        }
        button {
            display: flex;
            align-items: center;
            flex-direction: row;
            border: .1rem solid ${props => props.theme.primary};
            border-radius: 2rem;
            padding: 0.5rem 1.2rem;
            background-color: #fff;
            color: ${props => props.theme.primary};
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 2rem;
            letter-spacing: -0.04rem;
            gap: .8rem;
            &:after {
                content: '';
                width: 2.4rem;
                height: 2.4rem;
                background: url('/images/icon_share.svg') no-repeat center;
                background-size: 1.4rem 1.5rem;
            }
        }
    }
    .userWrap{
        margin-top: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1.5rem;
    }
    .username{
        font-size: 2rem;
        font-weight: 500;
        line-height: 2.4rem;
        color: ${props => props.theme.grey_01};
    }
`

export const ProfileCircle = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  background-image: url(${(props) => props.src || props.theme.placeholder_profile});
  background-color: #d9d9d9;
  background-size: cover;
  background-position: center;
`;

export const AddHostFriendButton = styled.div`
    background-color: ${props => props.theme.bg_light_blue};
    width: fit-content;
    padding: .6rem .8rem;
    border-radius: .4rem;
    display: flex;
    flex-direction: row;
    gap: .6rem;
    color: ${props => props.theme.primary};
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.9rem;
    letter-spacing: -0.04em;
    cursor: pointer;
    span{
        font-weight: inherit;
    cursor: pointer;
    }
`

export const VideoContainer = styled.div`
    background-color: ${props => props.theme.bg_light_gray};
    width: 100%;
    height: 100%;
    /* height: 100%; */
    flex-grow: 1;
    position: relative;
    .videoWrap{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #video-container{
        width: 100%;
        /* height: 100%; */
        max-width: 124rem;
        /* display: grid;
        grid-template-columns: repeat(auto-fit, minmax(40rem, 3fr));
        grid-gap: 2rem; */
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;
    }
    .container, #session{
        width: 100%;
        height: 100%;
    }
    .container{
        overflow: auto;
    }
    #session{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .stream-container{
        border-radius: 1rem;
        overflow: hidden;
        /* width: 100%;
        height: 100%; */
        width: ${props => props.host ? "100%" : "40rem"};
        height: ${props => props.host ? "100%" : "27.2rem"};
    }
    .streamcomponent{
        width: 100%;
        height: 100%;
        position: relative;
        background-color: ${props => props.theme.black};
    }
    .videousername{
        position: absolute;
        bottom: 0;
        left: 0;
        margin-bottom: 1.2rem;
        margin-left: 1.2rem;
        border-radius: 4rem;
        display: ${props => props.host ? "none" : "flex"};
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: .4rem 1rem;
        color: ${props => props.theme.white};
        background-color: rgba(0,0,0,0.6);
        gap: .8rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 2rem;
        letter-spacing: -0.04em;
        z-index: 999;
        svg{
            width: 2rem;
            height: 2rem;
        }
    }
    video{
        width: 100%;
        height: 100%;
    }
    .videoButtonWrap{
        gap: 5.6rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 3.2rem;
    }
`

export const VideoButton = styled.button`
    padding: 2rem;
    background-color: ${props => props.play ? props.theme.white : props.theme.grey_04};
    border-radius: 2.4rem;
    box-shadow: ${props => props.theme.shadow_gray};
    border: none;
    transition: all .2s ease-in-out;
    &:hover{
        transform: translateY(-0.5rem);
    }
    img{
        width: 4.8rem;
        height: 4.8rem;
    }
`

export const ChatHeader = styled.div`
    background-color: ${props => props.theme.primary};
    padding: 2rem 2.4rem 2rem 3.2rem;
    font-size: 2rem;
    line-height: 2.4rem;
    letter-spacing: -0.02em;
    font-weight: 700;
    color: ${props => props.theme.white};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &>div{
        display: flex;
        align-items: center;
    }
    img{
        width: 3.2rem;
        height: 3.2rem;
    }
    button{
        padding: .8rem;
        border-radius: 1rem;
        background-color: ${props => props.theme.white};
        border: none;
    }
`

export const ChatWrapper = styled.div`
    /* background: red; */
    width: 100%;
    height: 100%;
    padding: 3.2rem 3.3rem 0rem;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
`

export const ChatContent = styled.div`
    font-size: 2rem;
    line-height: 2.4rem;
    letter-spacing: -0.02rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 1.6rem;
    flex-wrap: wrap;
    position: relative;
    &:first-child{
        margin-top: 0;
    }
    &:last-child{
        padding-bottom: 15.2rem;
    }
    .chatuser{
        width: fit-content;
        /* flex-grow: 1; */
        color: ${props => props.theme.secondary};
        font-weight: 700;
    }
    .chattext{
        flex-grow: 1;
        color: ${props => props.theme.grey_01};
        margin-left: .4rem;
        font-weight: 500;
    }
`

export const ChatInputWrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 15.2rem;
    background: linear-gradient(0deg, #FFFFFF 22.37%, rgba(255, 255, 255, 0) 115.13%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem 2.4rem 4.8rem;
    /* box-sizing: border-box; */
    form{
        width: 100%;
    }
    .sendInputWrapper{
        /* position: relative; */
        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.grey_04};
        border-radius: 1rem;
        padding: .8rem 1.2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: .8rem;
    }
    button{
        padding: .9rem .9rem .7rem .7rem;
        background-color: ${props => props.theme.primary};
        border: none;
        border-radius: 1rem;
        img{
            width: 3.2rem;
            height: 3.2rem;
        }
    }
    input{
        background-color: transparent;
        border: none;
        font-size: 2rem;
        line-height: 2.4rem;
        letter-spacing: -0.04rem;
        color: ${props => props.theme.grey_02};
        font-weight: 500;
            padding-left: .8rem;
        flex-grow: 1;
    }
`