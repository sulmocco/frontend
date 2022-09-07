import styled from 'styled-components';

export const ReviewWrap = styled.div`
    background-color: #fffbe4;
    padding: 5.6rem 8.2rem;
    max-width: ${prosp => prosp.theme.contentWidth};
    display: flex;
    justify-content: space-between;
    margin: 13rem auto;
    cursor: pointer;
`
export const ReviewCont = styled.div`
    .left {
        h4 {
            font-size: 3.2rem;
            line-height: 4.2rem;
            letter-spacing: -0.02rem;
            font-weight: 700;
            color: #bc8110;
        }
        p{
            font-size: 2.4rem;
            font-weight: 500;
            letter-spacing: -0.04rem;
            line-height: 2.88rem;
            color: ${props => props.theme.gery_02};
            margin: 1.6rem 0 1.1rem 0;
        }
        span{
            padding: .4rem 1.6rem;
            color: #fff;
            font-weight: 500;
            font-size: 2.4rem;
            line-height: 2.9rem;
            letter-spacing: -0.04rem;
            background-color: ${props => props.theme.secondary};
            border-radius: 1rem;
        }
    }
`