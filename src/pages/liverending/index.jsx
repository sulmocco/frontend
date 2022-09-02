import React from 'react';
import { LiveRendingCont, LiveRendingWrap } from './styles';
import { ButtonWrapper, FriendAddButton, FriendCancelButton } from '../../components/addfriendmodal/styles'
import { useNavigate, useParams } from 'react-router-dom';
import ShareModal from '../../components/sharemodal';
import { useState } from 'react';

const LiveRending = () => {
    const { chatRoomId } = useParams();
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false)
    }
    const copy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('링크가 복사되었습니다')
        } catch (error) {
            alert(error, '복사실패')
        }
    }
    return (
        <LiveRendingWrap>
            <LiveRendingCont>
                <h3>방이 개설되었습니다.</h3>
                <img src='/images/img_liverending.png' className='mainimg' alt='img' />
                <div className="share">
                    <div className='url'>
                        <p className='text'>{`https://www.sulmoggo.live/chat/${chatRoomId}`}</p>
                        <span onClick={() => copy(`https://www.sulmoggo.live/chat/${chatRoomId}`)}>URL 복사</span>
                    </div>
                    <button onClick={() => setOpen(true)}></button>
                    <ShareModal isOpen={isOpen} onClose={onClose} copy={copy} right='9.6rem' bottom='2.3rem' chatRoomId={chatRoomId} />
                </div>
                <ButtonWrapper>
                    <FriendCancelButton >취소하기</FriendCancelButton>
                    <FriendAddButton onClick={() => navigate(`/chat/${chatRoomId}`)}>술약속 시작</FriendAddButton>
                </ButtonWrapper>
            </LiveRendingCont>
        </LiveRendingWrap>
    );
};

export default LiveRending;