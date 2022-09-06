import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LiveRendingCont, LiveRendingWrap } from '../../pages/liverending/styles';
import sulmoggoApi from '../../shared/apis';
import { userLogout } from '../../shared/modules';
import { ButtonWrapper, FriendAddButton, FriendCancelButton } from '../addfriendmodal/styles';

const DeleteAccount = () => {
    const mutation = useMutation(() => sulmoggoApi.deleteUser(), {
        onSuccess: () => {
            alert('탈퇴가 완료되었습니다');
            navigate('/loginrending');
            userLogout();
        }
    })
    const navigate = useNavigate();
    const deleteAccount = () => {
        if (window.confirm('정말로 탈퇴하시겠습니까?'))
            mutation.mutate();
    }
    return (
        <LiveRendingWrap>
            <LiveRendingCont>
                <h3>정말 탈퇴하시겠습니까?</h3>
                <p className='subtitle'>회원 탈퇴 시 모든 정보가 삭제됩니다.</p>
                <img src='/images/img_deleterending.png' alt='img' className='mainimg' />
                <ButtonWrapper style={{ margin: '0' }}>
                    <FriendCancelButton onClick={() => deleteAccount()}>탈퇴하기</FriendCancelButton>
                    <FriendAddButton onClick={() => navigate('/')}>계속이용하기</FriendAddButton>
                </ButtonWrapper>
            </LiveRendingCont>
        </LiveRendingWrap>
    );
};

export default DeleteAccount;