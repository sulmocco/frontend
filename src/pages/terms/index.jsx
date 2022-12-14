import React, { useState } from 'react';
import { Termsection, TermsWrap } from './styles';
import { SignUpButton } from '../signup/styles';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import ProgressBar from '../../components/progressbar';

const Terms = () => {
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    // const [check3, setCheck3] = useState(false);
    const [fullCheck, setfullCheck] = useState(false);

    const setAll = () => {
        setfullCheck(!fullCheck)
        setCheck1(!fullCheck)
        setCheck2(!fullCheck)
        // setCheck3(!fullCheck)
    }

    const allCheck = check1 && check2

    const { register } = useForm();
    const navigate = useNavigate();
    return (
        <TermsWrap>
            <ProgressBar />
            <Termsection>
                <h2>회원가입에 필요한 약관에 동의해 주세요.</h2>
                <form>
                    <ul>
                        <li>
                            <input type='checkbox' id='adult' value='adult' checked={check1}
                                onClick={() => {
                                    setCheck1(!check1)
                                    setfullCheck(false)
                                }}
                                {...register('terms', {
                                    required: {
                                        value: true,
                                    }
                                })}
                            />
                            <label htmlFor='adult' ></label>
                            <p onClick={() => {
                                setCheck1(!check1)
                                setfullCheck(false)
                            }}>20세 이상 성인입니다.</p>
                        </li>
                        <li>
                            <input type='checkbox' id='service' value='sevice' checked={check2}
                                onClick={() => {
                                    setCheck2(!check2)
                                    setfullCheck(false)
                                }}
                                {...register('terms', {
                                    required: {
                                        value: true,
                                    }
                                })}
                            />
                            <label htmlFor='service'></label>
                            <span>
                                <p onClick={() => {
                                    setCheck2(!check2)
                                    setfullCheck(false)
                                }}>서비스 이용 필수 약관 동의 (필수)</p>
                                <i onClick={() => window.open('https://unexpected-waxflower-83e.notion.site/5233b642558b4b2dbce474864fb9b16b', '_blank')}></i>
                            </span>
                        </li>
                        {/* <li >
                            <input type='checkbox' id='privacy' value='privacy' checked={check3}
                                onClick={() => {
                                    setCheck3(!check3)
                                    setfullCheck(false)
                                }}
                                {...register('terms', {
                                    required: {
                                        value: true,
                                    }
                                })}
                            />
                            <label htmlFor='privacy'></label>
                            <p onClick={() => {
                                setCheck3(!check3)
                                setfullCheck(false)
                            }}>개인 정보 수집 및 이용 동의 (필수)</p>
                        </li> */}
                        <li className='selectAll'>
                            {allCheck ? <>
                                <input type='checkbox' id='selectAll' value='all' checked='true'
                                    onClick={() => {
                                        setAll()
                                    }}
                                    {...register('selectAll')}
                                />
                                <label htmlFor='selectAll'></label>
                                <p>약관 전체 동의</p>
                            </> : <>
                                <input type='checkbox' id='selectAll' value='all' checked={fullCheck}
                                    onClick={() => {
                                        setAll()
                                    }}
                                    {...register('selectAll')}
                                />
                                <label htmlFor='selectAll'></label>
                                <p>약관 전체 동의</p>
                            </>}
                        </li>
                    </ul>
                    <div className='desc'>
                        <p>술모꼬는 만 19세(만 19세가 되는 해의 1월 1일) 이상부터 이용 가능하며, 타인의 계정으로 본 서비스를 사용하는 경우 정보통신망 이용 촉진 및 정보보호 등에 관한 법률에 의거 처벌을 받을 수 있습니다.</p>
                    </div>
                    <div className="button">
                        <SignUpButton mt='4.5rem' type='submit' background='#d6d6d6' color='black'
                            disabled={!allCheck}
                            onClick={() => navigate('/auth')}
                        >동의하고 다음</SignUpButton>
                    </div>
                </form>
            </Termsection>
        </TermsWrap >
    );
};

export default Terms;