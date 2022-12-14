import styled from "styled-components";

export const CardWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    background-color: ${props => props.theme.white};
    overflow: hidden;
    cursor: pointer;
    transition: all .2s ease-in-out;
    box-shadow: ${props => props.theme.shadow_gray};
    max-width: 100vw;
    &:hover{
        transform: translateY(-0.5rem);
    }
    .cardContent{
        padding: 1.6rem;
    }
    .cardUpperWrap{
        height: 22rem;
    }
    .cardProfileWrap{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-top: 1.7rem;
    }
    .cardTitleWrap{
        display: flex;
        flex-direction: column;
        margin-left: .8rem;
        width: calc(100% - 7.2rem);
        gap: .8rem;
    }
    .tableTitle{
        margin-top: .4rem;
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
    .tableUser{
        font-size: 2rem;
        font-weight: 500;
        line-height: 2.4rem;
        color: ${props => props.theme.primary};
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .counterWrap{
        width: 100%;
        margin-top: 1.2rem;
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
        height: 2.7rem;
        margin-bottom: .8rem;
    }
    @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
        max-width: 100vw;
        margin: 0;
        .cardContent {
            padding: 1rem;
            .cardUpperWrap {
                height: auto;
                margin-bottom: 2rem;
                .tableTitle {
                font-size: 2rem;
                margin-top: 0;
                }
                .counterWrap {
                    margin-top: .5rem;
                    font-size: 1.2rem;
                    line-height: 1.6rem;
                    img {
                        width: 1.2rem;
                    }
                }
                .cardTitleWrap{
                    .tableUser{
                        font-size: 1.6rem;
                        line-height: 1.8rem;
                    }
                }
            }
        }
    }
`
export const CardThumbnail = styled.div`
    width: 100%;
    height: 24rem;
    background-image: url(${props => props.src || props.theme.placeholder});
    background-color: #d9d9d9;
    background-size: cover;
    background-position: center;
    @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
        height: 18rem;
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
    @media (max-width: ${props => props.theme.breakpoints.mobile}px){
        width: 4rem;
        height: 4rem;
    }
`