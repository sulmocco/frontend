import React from "react"
import Footer from "./components/common/Footer";
import styled from "styled-components";
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
      // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
            return (
              <>
                <Header/>
                <div className="errorPage">
                  <img src="/images/img_deleterending.png" alt="crying"/>
                  <h1>문제가 발생했습니다.</h1>
                </div>
                <Footer/>
              </>
            )
      }
  
      return this.props.children;
    }
  }


const Header = () => {
    return (
      <Wrap>
        <Navbar>
          <NavLeft>
            <ul>
              <li>
                <NavLink
                  href="/"
                >
                  <img src="/images/logo.svg" alt="술모꼬 로고" />
                </NavLink>
              </li>
            </ul>
          </NavLeft>
          
        </Navbar>
      </Wrap>
    );
  };
  
const Wrap = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
border-bottom: 1px solid #f2f2f2;
z-index: 100;
color: ${(props) => props.theme.black} !important;
background-color: ${(props) => props.theme.white};
box-shadow: ${(props) => props.theme.shadow_gray};
font-weight: 500;
img {
    width: 14.403rem;
}
`;

const Navbar = styled.nav`
display: flex;
width: 100%;
max-width: 1280px;
height: 11.2rem;
margin: 0 auto;
`;

const NavLeft = styled.div`
display: flex;
align-items: center;
margin-right: auto;
ul {
    display: flex;
    align-items: center;
    font-size: 2rem;
    gap: 8rem;
}
`;

const NavLink = styled.a`
color: ${(props) =>
    props.active ? props.theme.primary : props.theme.black} !important;
`;
  
  
export default ErrorBoundary