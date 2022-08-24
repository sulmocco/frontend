import styled from 'styled-components';

export const ProgressWrap = styled.div`
`
export const ProgressSection = styled.ul`
    display: flex;
    flex-direction: row;
    padding: 7.2rem 0 4rem 0;
    
    span{
        display: block;
        width: 7.2rem;
        height: 0.2rem;
        border-radius: 0.2rem;
        background-color: ${props => props.theme.primary};
        margin-bottom: 2rem;
    }
`

export const ProgressLi = styled.li`
        display: flex;
        align-items: center;
        div{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.8rem;
            img {
                width: 2.4rem;
                height: 2.4rem;
            }
            p {
                color: ${(props) => props.theme.primary};
                font-weight: 400;
                line-height: 1.432rem;
                letter-spacing: -0.06rem;
                font-size: 1.2rem;
            }
        }
`