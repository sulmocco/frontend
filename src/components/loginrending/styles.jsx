import styled from 'styled-components';

export const Rending = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const RendingSection = styled.section`
    background-color: ${props => props.color || '#EEF3FF'};
    width: 100%;
    display: flex ;
    justify-content: center;
`
export const RendingCont = styled.div`
    /* width: ${props => props.theme.contentWidth}; */
    width: 129.6rem;
    padding: 26.4rem 0 6.2rem 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .desc{
        position: absolute;
        left: 0;
        top: 14.6rem;
        span{
            font-weight: 700;
            color: ${props => props.theme.primary};
            font-size: 2.6rem;
            line-height: 3.4rem;
            letter-spacing: -0.04rem;
        }
        h3 {
            font-size: 5.6rem;
            line-height: 6.683rem;
            font-weight: 800;
            letter-spacing: -0.02rem;
            margin-top: 1.2rem;
        }
        p{
            font-size: 2.2rem;
            line-height: 3.4rem;
            font-weight: 500;
            color: ${props => props.theme.grey_01};
            letter-spacing: -0.04rem;
            margin-top: 3.2rem;
        }
    }
    img{
        max-width: 93.4rem;
    }
    .signup {
        font-size: 2rem;
        color: ${props => props.theme.grey_02};
        line-height: 2.4rem;
        letter-spacing: -0.04rem;
        margin-top: 2.4rem;
        cursor: pointer;
    }
`
export const RendingContRow = styled.div`
        padding: 14.8rem 0 12.6rem 0;
        display: flex;
        align-items: center;
        .left{
            .box{
                padding: 2.4rem;
                background-color: #fff;
                border-radius: 1rem;
                margin-right: 23.5rem;
                p{
                    color: ${props => props.theme.grey_01};
                    line-height: 3.4rem;
                    font-size: 2.2rem;
                    font-weight: 700;
                    letter-spacing: -0.04rem;
                    display: inline;
                }
            &:last-child {
                margin: 4.3rem 0 0 33rem;
            }
            }
        }
        .right{
            margin-left: 12.6rem;
            p{
                font-size: 2.6rem;
                color: ${props => props.theme.grey_03};
                line-height: 3.4rem;
                letter-spacing: -0.04rem;
                font-weight: 700;
            }
            h4{
                font-size: 4.8rem;
                color: #fff;
                line-height: 7.2rem;
                letter-spacing: -0.02rem;
                font-weight: 700;
            }
        }
`