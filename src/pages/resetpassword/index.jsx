import React from "react"
import { useNavigate } from "react-router-dom"
import { BigButton } from "../../styles/CommonStyles"
import { LoginSection, LoginWrap } from "./styles"

const ResetPassword = ({isAuth}) => {
    const navigate = useNavigate()
    const AuthBbaton = () => window.location.href = process.env.REACT_APP_AUTH;

    return (
        <LoginWrap>
            <LoginSection>
            <h1>비밀번호 변경</h1>
                {true && <>
                <BigButton onClick={AuthBbaton} mt={"6.4rem"}>비바톤 인증</BigButton>
                </>}
                {true && <>
                <form action="">
                    <label>비밀번호</label>
                    <input type='password' placeholder='비밀번호'/>
                    <label>비밀번호 확인</label>
                    <input type='password' placeholder='비밀번호 확인' />
                </form>
                <BigButton onClick={AuthBbaton} mt={"6.4rem"}>변경하기</BigButton>
                </>}
                {true && <>
                <img src="/images/password_change.png" alt="자물쇠"/>
                
                </>}
                <BigButton onClick={() => navigate("/login")} mt={"4.8rem"}>로그인</BigButton>

                
            </LoginSection>
        </LoginWrap>
    )
}

export default ResetPassword