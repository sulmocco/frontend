import styled from 'styled-components';

export const MypageContent = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const TablesGrid = styled.div`
  width: 100%;
  margin-top: 3.2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40.5rem, 1fr));
  grid-gap: 3.2rem;
`;
export const Content = styled.div`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Wrap = styled.div`
  max-width: ${props => props.theme.contentWidth};
  margin: 0 auto;
`;

export const Container = styled.div`
  max-width: ${(props) => props.theme.contentWidth};
  display: flex;
  margin: 0 auto;
  justify-content: center;
  ul {
    width: 100%;
    display: flex;
    margin-top: 7.2rem;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4rem 3.2rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    ul {
    margin-top: 4rem;
    flex-direction: column;
    gap: 2rem;
    }
  }
`;
