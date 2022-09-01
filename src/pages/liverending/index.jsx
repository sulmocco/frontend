import React from 'react';
import { LiveRendingCont, LiveRendingWrap } from './styles';
import { ButtonWrapper, FriendAddButton, FriendCancelButton } from '../../components/addfriendmodal/styles'

const LiveRending = () => {
    return (
        <LiveRendingWrap>
            <LiveRendingCont>
                <h3>방이 개설되었습니다.</h3>
                <img src='/images/img_liverending.png' alt='img' />
                <div className="share">
                    <div className='url'>
                        <p>https://www.sulmoggo.live/</p>
                        <span>URL 복사</span>
                    </div>
                    <button></button>
                </div>
                <ButtonWrapper>
                    <FriendCancelButton >취소하기</FriendCancelButton>
                    <FriendAddButton >술약속 시작</FriendAddButton>
                </ButtonWrapper>
            </LiveRendingCont>
        </LiveRendingWrap>
    );
};

export default LiveRending;