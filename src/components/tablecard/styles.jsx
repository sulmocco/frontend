import styled from "styled-components";

export const CardWrapper = styled.div`
    width: 40.5rem;
    height: fit-content;
    border-radius: 1rem;
    background-color: ${props => props.theme.white};
    padding: 2rem;
    cursor: pointer;
    /* border: 1px solid black; */
    .cardUpperWrap{
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
        width: 29.3rem;
    }
    .tableTitle{
        font-size: 2.6rem;
        font-weight: 700;
        line-height: 3.1rem;
        color: #101010;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .tableUser{
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
        margin-top: 4rem;
        height: 2.7rem;
    }
`
export const CardThumbnail = styled.div`
    width: 100%;
    height: 24rem;
    border-radius: 1rem;
    background-image: url(${props => props.src});
    background-color: #d9d9d9;
    background-size: cover;
    background-position: center;
`
export const ProfileCircle = styled.div`
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    background-image: url(${props => props.src});
    background-color: #d9d9d9;
    background-size: cover;
    background-position: center;
`