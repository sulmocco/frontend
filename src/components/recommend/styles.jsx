import styled from 'styled-components';

export const RecommendWrap = styled.div`

    h2 {
        font-size: 3.2rem;
        font-weight: 700;
        margin-bottom: 4rem;
    }
    .recommendsection {
        display: flex;
        flex-wrap: wrap;
        gap: 5.6rem;
    }
    margin: 11.4rem 0;
`
export const RecommendItem = styled.li`
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
        margin-top: 4rem;
        
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
        margin-top: 1.6rem;
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
`