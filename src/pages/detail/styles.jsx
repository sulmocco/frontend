import styled from 'styled-components';

export const DetailWrap = styled.div`
    width: ${props => props.theme.contentWidth};
    margin: 0 auto;
    padding: 15.5rem 0;
    /* background-color: aliceblue; */
`
export const DetailHeader = styled.div`
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h3{
        font-size: 3.2rem;
        font-weight: 700;
        }
        img {
            cursor: pointer;
            width: 4.2rem;
            height: 4.2rem;
        }
    }
    .user {
        display: flex;
        flex-direction: row;
        padding: 1.8rem 0;
        .img {
            width: 6.4rem;
            height: 6.4rem;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .desc {
            padding: 0 1.2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .user-name {
            font-size: 2rem;
            font-weight: 500;
            letter-spacing: -.14rem;
            color: ${props => props.theme.grey_01};
            line-height: 2.387rem;
            }
            .tag {
                display: flex;
                flex-direction: row;
                gap: 0.8rem;
                cursor: default;
            }
        }
    }
`
export const DetailCont = styled.div`
margin: 3.5rem 0 6.4rem 0;
    .header {
        color: ${props => props.theme.grey_02};
        font-size: 1.6rem;
        letter-spacing: -0.14rem;
        font-weight: 500;
        padding: 1.2rem 0;
        display: flex;
        justify-content: space-between;
        .edit {
            display: flex;
            flex-direction: row;
            padding: 0 .2rem;
            p {
                cursor: pointer;
                display: flex;
                flex-direction: row;
                align-items: center;
                line-height: 1.9rem;
                &:first-child:after {
                    content: '';
                    display: block;
                    width: .1rem;
                    height: .8rem;
                    background-color: #b8bbc0;
                    margin: 0 .6rem 0 .8rem;
                }
            }
        }
    }
    .main {
        padding: 11.4rem 0;
        border-top: 1px solid ${props => props.theme.grey_03};
        border-bottom: 1px solid ${props => props.theme.grey_03};
        font-size: 2.2rem;
        line-height: 2.64rem;
    }
    .footer {
        padding: 2.4rem 0;
        display: flex;
        flex-direction: row;
        gap: 0.8rem;
        justify-content: flex-end;
    }
`

export const Icon = styled.span`
        padding: .5rem 1rem;
        border: 1px solid ${props => props.theme.grey_03};
        border-color: ${({ like }) => like ? '#2459E0' : '#b8bbc0'};
        border-radius: .2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .4rem;
        color: ${({ like }) => like ? '#2459E0' : '#b8bbc0'};
        .icon {
            width: 2.4rem;
            height: 2.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            &:first-child img {
                margin-bottom: -0.15rem;
                cursor: pointer;
            }
        }
        p {
            font-size: 1.4rem;
            letter-spacing: -0.14rem;
            font-weight: 400;
            line-height: 1.671rem;
        }
`