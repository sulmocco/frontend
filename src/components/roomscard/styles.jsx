import styled from "styled-components";
import { UserLevel } from "../../styles/CommonStyles";

export const CardWrapper = styled.div`
    width: 100%;
    /* max-width: 40.5rem; */
    height: fit-content;
    border-radius: 1rem;
    background-color: ${props => props.theme.white};
    /* padding: 2rem; */
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover{
        transform: translateY(-0.5rem);
        /* box-shadow: ${props => props.theme.shadow_gray}; */
    }
    /* border: 1px solid black; */
    .cardUpperWrap{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-top: 1.6rem;
    }
    .cardTitleWrap{
        display: flex;
        flex-direction: column;
        margin-left: 1.2rem;
        width: calc(100% - 7.2rem);
        gap: .8rem;
    }
    .roomTitle{
        margin-top: .8rem;
        font-size: 2.6rem;
        font-weight: 700;
        line-height: 3.1rem;
        color: #101010;
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
    }
    .roomUser{
        font-size: 2rem;
        font-weight: 500;
        line-height: 2.4rem;
        color: ${props => props.theme.primary};
        margin-top: .4rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .counterWrap{
        width: 100%;
        margin-top: 1.6rem;
        font-size: 1.6rem;
        line-height: 1.9rem;
        letter-spacing: -0.04em;
        color: ${props => props.theme.grey_02};
        display: flex;
        flex-direction: row;
        gap: .4rem;
        align-items: center;
        img{
            width: 1.8rem;
        }
    }
    .tagWrap{
        display: flex;
        width: 100%;
        flex-direction: row;
        gap: .8rem;
        margin-top: 4rem;
        height: 2.7rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        .counterWrap{
            font-size: 1rem;
            line-height: 1.2rem;
            margin-top: 1rem;
            img{
                width: 1.2rem;
            }
        }
        .cardUpperWrap{
            margin-top: .8rem;
        }
        .roomTitle{
            margin-top: .4rem;
            font-size: 1.6rem;
            line-height: 2.4rem;
        }
        .roomUser{
            font-size: 1.2rem;
            line-height: 1.4rem;
        }
        .cardTitleWrap{
            gap: .4rem;
            margin-left: .6rem;
        }
        .tagWrap{
            margin-top: 1.8rem;
        }
    }
`
export const CardThumbnail = styled.div`
    width: 100%;
    height: 24rem;
    border-radius: 1rem;
    background-image: url(${props => props.src || props.theme.placeholder});
    background-color: #d9d9d9;
    background-size: cover;
    background-position: center;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        height: 10.6rem;
    }
`
export const ProfileCircle = styled.div`
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    background-image: url(${props => props.src || props.theme.placeholder_profile});
    background-color: #d9d9d9;
    background-size: cover;
    background-position: center;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        width: 3.2rem;
        height: 3.2rem;
    }
`
export const DeleteButton = styled(UserLevel)`
    background-color: ${props => props.theme.bg_light_gray};
    border: .1rem solid ${props => props.theme.grey_03};
    color: ${props => props.theme.grey_02};
    margin-left: 2rem;
    padding: .2rem .5rem;
    width: fit-content;
    height: fit-content;
`