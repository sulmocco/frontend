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
  /* background-color: antiquewhite; */
  width: 100%;
  max-width: 128rem;
  text-align: center;
  h2 {
    /* padding-top: 6.4rem; */
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 4rem;
  }
`;

export const RankWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const OneRankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-0.5rem);
  }
  &:first-child {
    margin-right: 3.2rem;
  }
  &:last-child {
    margin-left: 3.2rem;
  }
  .crown {
    margin-bottom: 0.4rem;
    width: inherit;
    justify-content: center;
    img {
      width: ${(props) => (props.first ? 8.9 : 6.3)}rem;
    }
  }
`;
export const TableCardWrapper = styled.div`
  border-radius: 1rem;
  background-color: white;
  width: 34.4rem;
  box-shadow: ${(props) => props.theme.shadow_gray};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* align-items: center; */
  .img {
    height: ${(props) => (props.first ? 20.8 : 16.8)}rem;
    background-image: ${(props) => "url(" + (props.src ? props.src : "/images/placeholder.png") + ")"};
    background-size: cover;
    background-position: center;
  }
  .bottom {
    padding: 2.4rem 3.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .profile {
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 6.4rem;
    background-image: ${(props) => "url(" + (props.profile ? props.profile : "/images/placeholder-profile.png") + ")"};
    background-size: cover;
    background-position: center;
  }
  .counterWrap {
    width: 100%;
    height: 2.4rem;
    margin-top: 0.8rem;
    display: flex;
    flex-direction: row;
    font-size: 1.6rem;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    color: ${(props) => props.theme.grey_02};
    gap: 0.4rem;
    img {
      width: 1.8rem;
    }
  }
  .title {
    width: 100%;
    font-size: 2.6rem;
    font-weight: 700;
    text-align: center;
    margin-top: 2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .username {
    width: 100%;
    color: ${(props) => props.theme.primary};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 500;
    font-size: 2rem;
    text-align: center;
    margin-top: 0.4rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
  }
  .alcohol {
    padding: 0.4rem 1.2rem;
    border-radius: 2rem;
    background-color: ${(props) => props.theme.light_yellow_01};
  }
  .tags {
    margin-top: 1.8rem;
    display: flex;
    gap: 0.4rem;
  }
`;
