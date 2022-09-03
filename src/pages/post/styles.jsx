import styled from 'styled-components';

export const PostWrap = styled.section`
    h2 {
    font-size: 32px;
    margin-top: 100px;
  }
`
export const Title = styled.div`
  div {
    font-weight: 700;
    margin-top: 50px;
    font-size: 26px;
  }
  input {
    width: 100%;
    height: 64px;
    background: #f2f3f3;
    border-radius: 10px;
    border: none;
    font-size: 20px;
    padding: 20px;
    margin-top: 10px;
  }
`
export const Subtitle = styled.div`
  div {
    margin-top: 25px;
    font-size: 20px;
    font-weight: 700;
  }
  ul {
    display: flex;
    gap: 10px;
    li {
      cursor: pointer;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 73px;
      height: 33px;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      &.fill {
        background: #2459e0;
        border-radius: 20px;
        color: white;
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: 40px;
`;

export const Image = styled.div`
  margin-top: 40px;
  .pre_image {
    font-size: 14px;
    color: #bcbcbc;
  }
  div {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }
  .upload {
    margin-top: 20px;
    display: flex;
  }
  .Img {
    width: 180px;
    height: 180px;
    background: #f2f3f3;
    border-radius: 10px;
    position: relative;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
    .border {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      &:hover {
        border: 3px solid #2459e0;
        border-radius: 10px;
      }
    }
    .main {
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: #2459e0;
      border-radius: 5px;
      color: white;
      padding: 10px;
    }
  }
`;

export const Tag = styled.div`
  margin-top: 30px;
  div {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }

  input {
    width: 100%;
    height: 64px;
    background: #f2f3f3;
    border-radius: 10px;
    border: none;
    font-size: 20px;
    padding: 20px;
    margin-top: 10px;
  }
`;