import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpButton } from '../../pages/signup/styles';
import { Rending, RendingCont, RendingContRow, RendingSection } from './styles';

const LoginRending = () => {
    const navigate = useNavigate();
    return (
        <Rending>
            <RendingSection>
                <RendingCont>
                    <div className="desc">
                        <span>건강한 언텍트 음주 플렛폼</span>
                        <h3>오늘의 술친구는 누구?</h3>
                        <p>언제 어디서나 장소에 구애받지 않는 신개념 술자리<br />친구와 함께 즐길수도, 다른사람의 술자리를 지켜볼수도 있어요</p>
                    </div>
                    <img src="/images/img_meta.svg" alt='메인이미지' />
                    <SignUpButton mt='8.1rem' onClick={() => navigate(`/login`)}>로그인</SignUpButton>
                    <p className='signup' onClick={() => navigate(`/terms`)}>회원가입</p>
                </RendingCont>
            </RendingSection>
            <RendingSection color='#343437'>
                <RendingContRow>
                    <div className="left">
                        <div className="box">
                            <p>
                                친구들과 영상으로 집안이 술모임으로 바뀐다!<br />
                                함께있는것처럼 먹고 마시자!
                            </p>
                        </div>
                        <div className="box">
                            <p>
                                친구가 없어도 OK!<br />
                                술모꼬에서 새로운 술친구 만들자!
                            </p>
                        </div>
                    </div>
                    <div className="right">
                        <p>혼술도 외롭지 않아!</p>
                        <h4>외로운 혼술은 이제 그만<br />멀리서도 친구와 함께 술모꼬</h4>
                    </div>
                </RendingContRow>
            </RendingSection>
            <RendingSection color='#F2F3F6'>
                <RendingCont>
                    <div className="desc">
                        <span>안주 고민도 끝!</span>
                        <h3>감성 음주 커뮤니티</h3>
                        <p>많은 사람들은 어떤 안주를 먹을까?<br />사람들이 찐으로 올리는 후기<br />술상추천을 만나보세요!</p>
                    </div>
                </RendingCont>
            </RendingSection>
        </Rending>
    );
};

export default LoginRending;