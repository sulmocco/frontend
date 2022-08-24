import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProgressLi, ProgressSection, ProgressWrap } from './styles';

const ProgressBar = () => {
    const location = useLocation();
    const onePage = location.pathname.startsWith('/terms');
    const twoPage = location.pathname.startsWith('/auth');
    const threePage = location.pathname.startsWith('/signup');
    const fourPage = location.pathname.startsWith('/render');

    return (
        <ProgressWrap>
            <ProgressSection>
                <ProgressLi>
                    <div>
                        <img src='/images/icon_signup_check.svg' alt='아이콘' />
                        <p>약관동의</p>
                    </div>
                    {onePage ? <span style={{ backgroundColor: '#B8BBC0' }}></span> : <span></span>}
                </ProgressLi>
                <ProgressLi>
                    {onePage ? (
                        <>
                            <div>
                                <img src='/images/icon_signup_02.svg' alt='아이콘' />
                                <p style={{ color: '#7A7A80' }}>본인인증</p>
                            </div>
                            <span style={{ backgroundColor: '#B8BBC0' }}></span>
                        </>
                    ) : (
                        <>
                            <div>
                                <img src='/images/icon_signup_check.svg' alt='아이콘' />
                                <p>본인인증</p>
                            </div>
                            {threePage || fourPage ? <span ></span> : <span style={{ backgroundColor: '#B8BBC0' }}></span>}
                        </>
                    )}
                </ProgressLi>
                <ProgressLi>
                    {onePage || twoPage ? (
                        <>
                            <div>
                                <img src='/images/icon_signup_03.svg' alt='아이콘' />
                                <p style={{ color: '#7A7A80' }}>정보입력</p>
                            </div>
                            <span style={{ backgroundColor: '#B8BBC0' }}></span>
                        </>
                    ) : (
                        <>
                            <div>
                                <img src='/images/icon_signup_check.svg' alt='아이콘' />
                                <p>정보입력</p>
                            </div>
                            {fourPage ? <span></span> : <span style={{ backgroundColor: '#B8BBC0' }}></span>}
                        </>
                    )}
                </ProgressLi>
                <ProgressLi>
                    {onePage || twoPage || threePage ? (
                        <>
                            <div>
                                <img src='/images/icon_signup_04.svg' alt='아이콘' />
                                <p style={{ color: '#7A7A80' }}>가입완료</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <img src='/images/icon_signup_check.svg' alt='아이콘' />
                                <p>본인인증</p>
                            </div>
                        </>
                    )}
                </ProgressLi>
            </ProgressSection>
        </ProgressWrap >
    );
};

export default ProgressBar;