import styled from 'styled-components';

export const PostWrap = styled.section`
    h2 {
    font-size: 3.2rem;
    margin-top: 100px;
  }
  .tab-item:last-child {
    display: none !important;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}px){
    h2 {
      font-size: 2.5rem;
      margin-top: 5rem;
    }
    .toastui-editor-popup {
          margin: 0!important;
      }
  }
`
export const Title = styled.div`
  div {
    font-weight: 700;
    margin-top: 5rem;
    font-size: 2.6rem;
  }
  input {
    width: 100%;
    height: 6.4rem;
    background: #f2f3f3;
    border-radius: 1rem;
    border: none;
    font-size: 2rem;
    padding: 2rem;
    margin-top: 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}px){
    div {
      margin-top: 3rem;
      font-size: 2rem;
    }
    input {
      height: 4rem;
      font-size: 1.6rem;
    }
  }
`
export const Subtitle = styled.div`
  div {
      margin-top: 4.6rem;
      font-size: 2rem;
      font-weight: 700;
  }
  .titlebox {
      display: flex;
      align-items: center;
      margin-top: 5.6rem;
      gap: 1.2rem;
      div {
          margin-top: 0;
      }
  }
  ul {
    display: flex;
    gap: .8rem;
      li {
      cursor: pointer;
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 2rem;
      line-height: 2.8rem;
      letter-spacing: -0.02rem;
      color: ${props => props.theme.grey_03};
      padding: .6rem 1.6rem;
        &.fill {
            background: ${props => props.theme.primary};
            border-radius: 2rem;
            color: white;
        }
      }
    }
    .guidebubble{
    border-image: url('/images/img_guide_bubble.svg');
    border-image-slice: 18 13 13 13 fill;
    border-image-width: auto;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: stretch stretch;
    border-style: solid;
    padding: .6rem .9rem .6rem 1.8rem;
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.4rem;
    letter-spacing: -0.06em;
    margin-top: .3rem;
    color: ${props => props.theme.primary}
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}px){
    div {
      margin-top: 2rem;
    }
    .titlebox{
      margin-top: 4rem;
    }
    ul {
      margin-top: 1.5rem;
      overflow: scroll;
      li{
        font-size: 1.6rem;
        line-height: 1.8rem;
        margin-top: 0;
        max-height: 3rem;
        white-space: nowrap;
      }
      &::-webkit-scrollbar {
        display: none;
      } 
    }
    }
`;

export const Content = styled.div`
  margin-top: 4rem;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px){
    margin-top: 2rem;
  }
`;

export const Image = styled.div`
  margin-top: 4rem;
  .pre_image {
    font-size: 1.4rem;
    color: #bcbcbc;
  }
  div {
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.4rem;
  }
  .upload {
    margin-top: 2rem;
    display: flex;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
      }
  }
  .Img {
    width: 18rem;
    height: 18rem;
    background: #f2f3f3;
    border-radius: 1rem;
    position: relative;
    margin-right: 2rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      object-fit: cover;
    }
    .border {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      &:hover {
        border: .3rem solid #2459e0;
        border-radius: 1rem;
      }
    }
    .main {
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: #2459e0;
      border-radius: .5rem;
      color: white;
      padding: 1rem;
    }
  }
`;

export const Tag = styled.div`
  margin-top: 3rem;
  div {
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.4rem;
  }

  input {
    width: 100%;
    height: 6.4rem;
    background: #f2f3f3;
    border-radius: 1rem;
    border: none;
    font-size: 2rem;
    padding: 2rem;
    margin-top: 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}px){
    input {
      font-size: 1.6rem;
      line-height: 1.8rem;
      height: 4rem;
    }
  }
`;