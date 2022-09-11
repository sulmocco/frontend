import styled from 'styled-components';

export const RecommendWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 11.4rem 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        width: 100%;
        justify-content: center;
        margin-top: 8rem;
    }
    h2 {
        font-size: 3.4rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 5.6rem;
    }
    .recommendsection {
        display: flex;
        flex-wrap: wrap;
        gap: 4.8rem 3.2rem;
        width: 128rem;
        @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
            width: 100%;
            justify-content: center;
        }
    }
`
export const RecommendItem = styled.li`
    cursor: pointer;
    margin-bottom: 2.4rem;
    max-width: 29.6rem;
    img{
        width: 29.6rem;
        height: 29.6rem;
        object-fit: cover;
        border-radius: 1rem;
    }
    .title {
        font-size: 2rem;
        font-weight: 500;
        line-height: 2.8rem;
        letter-spacing: -0.1rem;
        margin-top: 1.8rem;
        color: ${props => props.theme.grey_01};
    }
    .price {
        font-size: 2.6rem;
        font-weight: 700;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.2rem;
        margin-top: 3.2rem;
        
        & + p {
        font-size: 2.6rem;
        font-weight: 500;
        }
    }
    .tag{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.6rem;
        margin-top: 1.8rem;
        p {
            font-size: 1.6rem;
            padding: 0.4rem 1.2rem;
            background-color: #ffda93;
            border-radius: 2rem;
            color: ${props => props.theme.grey_01};
            
            &:last-child{
                background-color: #ffefb7;
            }
        }
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        max-width: 90%;
        width: 90%;
        /* background-color: #ffda93; */
        & img{
            width: 100%;
            height: 20rem;
        }
        .title, .price, .tag{
            margin-top: 1rem;
        }
    }
`