import styled from 'styled-components';

export const ModalWrap = styled.div`
    z-index: 99;
    position: absolute;
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    background-color: #fff;
    right: ${props => props.right};
    bottom: ${props => props.bottom};
    top: ${props => props.top};
    padding: 1.6rem;
    padding-bottom: 2.6rem;
    border-radius: 1rem;
    border: .1rem solid ${props => props.theme.grey_03};
    .title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        h4 {
            font-size: 1.6rem;
            line-height: 2.4rem;
            letter-spacing: -0.04rem;
            font-weight: 700;
            color: ${props => props.theme.black_02};
        }
        i {
            width: 2.4rem;
            height: 2.4rem;
            background: url('/images/icon_close.svg') no-repeat center;
            cursor: pointer;
        }
    }
    .sns {
        display: flex;
        flex-direction: row;
        gap: 3.2rem;
        padding: 0 1.6rem;
        align-items: center;
        justify-content: space-between;
        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            img{
                width: 4.8rem;
                height: 4.8rem;
                margin: 2.4rem 0 1.6rem 0;
            }
            p {
                font-weight: 400;
                font-size: 1.4rem;
                line-height: 1.671rem;
                letter-spacing: -0.04rem;
                color: ${props => props.theme.grey_01};
            }
        }
    }
    .url_copy{
            background-color: ${props => props.theme.grey_04};
            border-radius: 1rem;
            padding: 1.4rem .8rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 2rem;
            max-height: 4.8rem;
            width: 100%;
            margin-top: 2.4rem;
            p{
                line-height: 1.9rem;
                font-size: 1.6rem;
                color: ${props => props.theme.black_02};
                letter-spacing: -0.04rem;
                font-weight: 500;
                cursor: text;

            }
            span {
                background-color: #fff;
                line-height: 2rem;
                font-size: 1.6rem;
                color: ${props => props.theme.primary};
                letter-spacing: -0.04rem;
                padding: .6rem 1.2rem;
                border-radius: 2rem;
                font-weight: 500;
                cursor: pointer;
            }
        }
`