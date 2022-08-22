import styled from 'styled-components';

export const ProfileEditWrap = styled.div`
    width: ${props => props.theme.contentWidth};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12rem;
    .profile-desc {
        width: 100%;
        h5 {
        font-size: 2rem;
        padding: 1rem 0;
        }
        .input {
            display: flex;
            flex-direction: column;
            padding: .5rem;
            label {
                font-size: 1.5rem;
                padding: .5rem 0;
            }
            input {
                font-size: 1.5rem;
                padding: .5rem;
            }
        }
    }
`