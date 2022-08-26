import styled from 'styled-components';

export const FriendWrap = styled.li`
    width: ${props => props.theme.contentWidth};
    margin: 0 auto;
    box-shadow: ${props => props.theme.shadow_gray};
    border-radius: 1rem;
`
export const FriendCont = styled.div`
    padding: 3.2rem 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .section {
        display: flex;
        flex-direction: row;
        gap: 1.6rem;
        align-items: center;
        .img{
            position: relative;
            width: 7.2rem;
            height: 7.2rem;
            overflow: hidden;
            img{
                object-fit: cover;
            }
            span{
                position: absolute;
                right: .8rem;
                top: 0;
                display: block;
                width: .8rem;
                height: .8rem;
                background-color: #7a7a80;
                border-radius: 100%;
            }
        }
        .desc {
            span {
                color: ${props => props.theme.primary};
                padding: 0.2rem 0.8rem;
                line-height: 1.432rem;
                letter-spacing: -0.04rem;
                font-size: 1.2rem;
                background-color: #EEF3FF;
                border-radius: .4rem;
            }
            h4{
                font-size: 3.2rem;
                font-weight: 700;
                color: ${props => props.black_2};
                line-height: 3.819rem;
                margin-top: .8rem;
            }
        }
    }
    button {
        font-size: 1.6rem;
        font-weight: 500;
        color: ${props => props.theme.grey_02};
        line-height: 2rem;
        letter-spacing: -0.04rem;
        padding: .6rem 1.6rem;
        border: none;
    }
`