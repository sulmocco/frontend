import styled from 'styled-components';

export const Login = styled.div`
    height: calc(100vh - 72px - 120px);
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size:2rem;
        line-height: 2.4rem;
        font-weight: 400;
        color: ${props => props.theme.grey_02};
        text-align: center;
        margin-top: 2.4rem;
        cursor: pointer;
    }
`