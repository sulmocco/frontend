import React, { useState } from 'react';
import { Termsection, TermsWrap } from './styles';
import { SignUpButton } from '../SignUp/styles';

const Terms = () => {
    return (
        <TermsWrap>
            <Termsection>
                <h2>회원가입에 필요한 약관에 동의해주세요.</h2>
                <ul>
                    <li>
                        <input type='checkbox' id='adult' />
                        <label htmlFor='adult' ></label>
                        <p>20세 이상 성인입니다.</p>
                    </li>
                    <li>
                        <input type='checkbox' id='service' />
                        <label htmlFor='service'></label>
                        <p>서비스 이용 필수 약관 동의 (필수)</p>
                    </li>
                    <li>
                        <input type='checkbox' id='privacy' />
                        <label htmlFor='privacy'></label>
                        <p>개인정보 수집 및 이용 동의 (필수)</p>
                    </li>
                    <li>
                        <input type='checkbox' id='add_privacy' />
                        <label htmlFor='add_privacy'></label>
                        <p>추가 개인정보 수집 및 이용 동의 (선택)</p>
                    </li>
                    <li>
                        <input type='checkbox' id='promotion' />
                        <label htmlFor='promotion'></label>
                        <p>술모꼬 프로모션 정보 수신 동의 (선택)</p>
                    </li>
                    <li className='all_check'>
                        <input type='checkbox' id='all_check' />
                        <label htmlFor='all_check'></label>
                        <p>약관 전체 동의</p>
                    </li>
                </ul>
                <div className='desc'>
                    <p>술모꼬에서 제공하는 이벤트/혜택 등 다양한 정보를 Push 알람 및 E-mail 알람으로 받아보실 수 있습니다.</p>
                    <p>술모꼬는 만 19세(만19세가 되는 해의 1월 1일) 이상부터 이용가능 하며, 타인의 계정으로 본 서비스를 사용하는 경우 정보통신망 이용촉진 및 정보보호 등에 관한 법률에 의거 처벌을 받을 수 있습니다.</p>
                </div>
                <div className="button">
                    <SignUpButton mt='4.5rem'>동의하고 다음</SignUpButton>
                </div>
            </Termsection>
        </TermsWrap >
    );
};

export default Terms;