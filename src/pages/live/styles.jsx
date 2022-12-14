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
        width: 133.6rem;
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
    h1{
        font-size: 2.6rem;
        font-weight: 700;
        line-height: 3.1rem;
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
    /* height: 100%; */
    flex-grow: 1;
    padding: 6.4rem 8.8rem;
    position: relative;
    .videoWrap{
        border-radius: 1rem;
        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.grey_03};
        overflow: hidden;
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
    background-color: ${props => props.theme.white};
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
    padding: 3.2rem 3.3rem 15.2rem;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
`

export const Chat = styled.div`
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
    .chatuser{
        width: fit-content;
        flex-grow: 1;
        color: ${props => props.theme.secondary};
        font-weight: 700;
    }
    .chattext{
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
    &>div{
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