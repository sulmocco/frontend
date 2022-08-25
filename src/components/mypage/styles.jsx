import styled from 'styled-components';

export const MypageContent = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const MypageWrap = styled.div`
  width: 1290px;
  margin: 0 auto;
`;
export const TablesGrid = styled.div`
  width: 100%;
  margin-top: 3.2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40.5rem, 1fr));
  grid-gap: 3.2rem;
`;