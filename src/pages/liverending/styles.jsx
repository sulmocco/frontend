import styled from 'styled-components';

export const LiveRendingWrap = styled.div`
    background-color: ${props => props.theme.bg_light_gray};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13rem 0;
`

export const LiveRendingCont = styled.div`
    background-color: #fff;
    border-radius: 1rem;
    padding: 9.6rem;
    padding-bottom: 8.2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    h3{
        font-size: 3.2rem;
        line-height: 3.819rem;
        font-weight: 700;
        letter-spacing: -0.02rem;
        text-align: center;
    }
    img{
        max-width:32.9rem;
        max-height:32.9rem;
        margin: 4.8rem 0 6.4rem 0;
    }
    .share {
        display: flex;
        flex-direction: row;
        gap: 1.6rem;
        align-items: center;
        width: 100%;
        .url{
            background-color: ${props => props.theme.grey_04};
            border-radius: 1rem;
            padding: 2rem 1.6rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 2rem;
            max-height: 6.4rem;
            width: 100%;
            p{
                line-height: 2.3rem;
                font-size: 2rem;
                color: ${props => props.theme.black_02};
                letter-spacing: -0.04rem;
                font-weight: 500;
            }
            span {
                background-color: #fff;
                line-height: 2rem;
                font-size: 1.6rem;
                color: ${props => props.theme.primary};
                letter-spacing: -0.04rem;
                padding: .6rem 1.2rem;
                border-radius: 1rem;
                font-weight: 500;
                cursor: pointer;
            }
        }
        button {
            min-width: 6.4rem;
            min-height: 6.4rem;
            border: none;
            background-color: ${props => props.theme.bg_light_blue};
            border-radius: 1rem;
            background-image: url('/images/icon_share.svg');
            background-repeat: no-repeat;
            background-position: center;
        }
    }
    .button {
            display: flex;
            flex-direction: row;
            gap: 2.4rem;
        }
`