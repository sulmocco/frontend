import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.bg_light_gray};
  left: 0;
  height: 79.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  /* border: 1px solid black; */
  background-color: antiquewhite;
  width: 100%;
  max-width: 128rem;
  h2 {
    padding-top: 6.4rem;
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 4rem;
  }
`;

export const RankWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const TableCardWrapper = styled.div`
  border-radius: 1rem;
  background-color: white;
  width: 34.4rem;
  box-shadow: ${props => props.theme.shadow_gray};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  img{
    width: 8.9rem;
  }
  .img{
    background-color: azure;
    height: ${props => props.first ? 20.8 : 16.8}rem;
    background-image: ${props => "url("+props.src+")"};
    background-size: cover;
    background-position: center;
  }
  .bottom{
    padding: 2.4rem;
  }
`
