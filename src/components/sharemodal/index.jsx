import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ModalWrap } from './styles';
const ShareModal = ({ chatRoomId, onair, isOpen, onClose, copy, right, bottom, left, top }) => {
    const sendText = '언텍트 음주 커뮤니티 술모꼬';
    const sendUrl = `https://www.sulmoggo.live/chat/${chatRoomId}`;
    useEffect(() => {
        // 카카오 스크립트 불러오기
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.async = true;
        document.body.appendChild(script);

        return () => document.body.removeChild(script)
    }, []);

    // 카카오 공유하기
    const kakaoShare = () => {
        if (window.Kakao) {
            const kakao = window.Kakao;

            if (!kakao.isInitialized()) {
                kakao.init(process.env.REACT_APP_API_KAKAO_KEY)
            }
            kakao.Link.createDefaultButton({
                container: '#kakaobnt',
                objectType: 'feed',
                content: {
                    title: '술모꼬',
                    description: '언텍트 음주 커뮤니티 술모꼬',
                    imageUrl: '/images/img_meta.svg',
                    link: {
                        mobileWebUrl: sendUrl,
                        webUrl: sendUrl
                    }
                },
            });
        }
    }
    // 페이스북 공유하기
    const facebookShare = () => {
        window.open(`http://www.facebook.com/sharer.php?u=${sendUrl}&t=${sendText}`);
    }
    // 트위터 공유하기
    const twitterShare = () => {
        window.open(`https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}`);
    }

    return (
        <ModalWrap right={right} bottom={bottom} isOpen={isOpen} top={top} left={left}>
            <span className='title'>
                <h4>SNS 공유</h4>
                <i onClick={onClose}></i>
            </span>
            <ul className='sns'>
                <li onClick={() => kakaoShare()}>
                    <img src='/images/icon_logo_kakaotalk.svg' id='kakaobnt' alt='카카오톡' />
                    <p>카카오톡</p>
                </li>
                <li onClick={() => facebookShare()}>
                    <img src='/images/icon_logo_facebook.svg' alt='카카오톡' />
                    <p>페이스북</p>
                </li>
                <li onClick={() => twitterShare()}>
                    <img src='/images/icon_logo_twitter.svg' alt='카카오톡' />
                    <p>트위터</p>
                </li>
                <li>
                    <img src='/images/icon_logo_instagram.svg' alt='카카오톡' />
                    <p>인스타그램</p>
                </li>
            </ul>
            {onair && (
                <div className='url_copy'>
                    <p>{`https://www.sulmoggo.live/chat/${chatRoomId}`}</p>
                    <span onClick={() => copy(`https://www.sulmoggo.live/chat/${chatRoomId}`)}>URL 복사</span>
                </div>
            )}
        </ModalWrap>
    );
};

export default ShareModal;