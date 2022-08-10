import React from 'react';
import { Termsection, TermsWrap } from './styles';
import { SignUpButton } from '../SignUp/styles';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const Terms = () => {
    const { register, handleSubmit, watch } = useForm();
    const selectAll = watch('selectAll');
    const navigate = useNavigate();
    return (
        <TermsWrap>
            <Termsection>
                <h2>회원가입에 필요한 약관에 동의해주세요.</h2>
                <form onSubmit={handleSubmit((data) => console.log(JSON.stringify(data)))}>
                    <ul>
                        <li>
                            <input type='checkbox' id='adult' value='adult' checked={selectAll}
                                onClick={(e) => console.log(e)}
                                {...register('terms', {
                                    required: {
                                        value: true,
                                    }
                                })}
                            />
                            <label htmlFor='adult' ></label>
                            <p>20세 이상 성인입니다.</p>
                        </li>
                        <li>
                            <input type='checkbox' id='service' value='sevice' checked={selectAll}
                                {...register('terms', {
                                    required: {
                                        value: true,
                                    }
                                })}
                            />
                            <label htmlFor='service'></label>
                            <p>서비스 이용 필수 약관 동의 (필수)</p>
                        </li>
                        <li>
                            <input type='checkbox' id='privacy' value='privacy' checked={selectAll}
                                {...register('terms', {
                                    required: {
                                        value: true,
                                    }
                                })}
                            />
                            <label htmlFor='privacy'></label>
                            <p>개인정보 수집 및 이용 동의 (필수)</p>
                        </li>
                        <li className='selectAll'>
                            <input type='checkbox' id='selectAll' value='all'
                                {...register('selectAll')}
                            />
                            <label htmlFor='selectAll'></label>
                            <p>약관 전체 동의</p>
                        </li>
                    </ul>
                    <div className='desc'>
                        <p>술모꼬에서 제공하는 이벤트/혜택 등 다양한 정보를 Push 알람 및 E-mail 알람으로 받아보실 수 있습니다.</p>
                        <p>술모꼬는 만 19세(만19세가 되는 해의 1월 1일) 이상부터 이용가능 하며, 타인의 계정으로 본 서비스를 사용하는 경우 정보통신망 이용촉진 및 정보보호 등에 관한 법률에 의거 처벌을 받을 수 있습니다.</p>
                    </div>
                    <div className="button">
                        <SignUpButton mt='4.5rem' type='submit'
                            disabled={!selectAll}
                            onClick={() => navigate('/signup')}
                        >동의하고 다음</SignUpButton>
                    </div>
                </form>
            </Termsection>
        </TermsWrap >
    );
};

export default Terms;