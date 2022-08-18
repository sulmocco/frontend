import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useRef } from 'react';
import Spinner from '../../components/spinner';
import sulmoggoApi from '../../shared/apis';
import { ProfileEditWrap } from './style';

const ProfileEdit = () => {
    const username_ref = useRef();
    const level_ref = useRef();
    const queryClient = useQueryClient();
    const { data, status } = useQuery(['user'], () => sulmoggoApi.getUser().then(res => res.data));
    console.log(data);

    const mutation = useMutation((data) => sulmoggoApi.putUser(data), {
        onMutate: (variables) => {
            console.log('onMutate', variables);
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(['user']);
        },
        onError: (error) => {
            alert('실패', error.message)
        }
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ username: username_ref.current.value, level: level_ref.current.value });
    }

    // 로딩스피너 적용
    if (status === 'loading') {
        return (<Spinner />)
    }
    return (
        <ProfileEditWrap>
            <div className="profile_img">
                <img src={data?.profile} alt='프로필이미지' />
            </div>
            <div className="profile-desc">
                <h5>계정정보</h5>
                <div className='input'>
                    <label htmlFor="">ID</label>
                    <input type="text" placeholder='아이디' defaultValue={data?.userId || ''} readOnly />
                </div>
                <div className='input'>
                    <label htmlFor="">닉네임</label>
                    <input type="text" placeholder='닉네임' defaultValue={data?.username || ''} ref={username_ref} />
                </div>
                <div className='input'>
                    <label htmlFor="">등급</label>
                    <input type="text" placeholder='등급' defaultValue={data?.level || ''} ref={level_ref} />
                </div>
                <button onClick={handleSubmit}>수정하기</button>
            </div>
        </ProfileEditWrap>
    );
};

export default ProfileEdit;