import { useMutation } from '@tanstack/react-query';
import React from 'react';
import sulmoggoApi from '../../shared/apis';
import { getLevel } from '../../shared/modules';
import { FriendCont, FriendWrap } from './styles';

const FriendList = (props) => {

    const { profile, level, username, isOnair } = props;
    // console.log(username)

    const mutation = useMutation(async (username) => await sulmoggoApi.deleteFriends(username), {
        onSuccess: () => {
            alert('친구삭제 완료!');
        },
    });

    const deleteFriend = () => {
        if (window.confirm('친구를 삭제하시겠습니까?')) {
        }
        mutation.mutate(username);
    }

    return (
        <FriendWrap>
            <FriendCont>
                <div className='section'>
                    <div className="img">
                        <img src={profile || '/images/profile_default.svg'} alt='프로필 이미지' />
                        {isOnair ? (
                            <span style={{ backgroundColor: '#FDC250' }}></span>
                        ) : (
                            <span></span>
                        )}
                    </div>
                    <div className='desc'>
                        <span>{getLevel(level)}</span>
                        <h4>{username}</h4>
                    </div>
                </div>
                <button onClick={() => deleteFriend()}>삭제하기</button>
            </FriendCont>
        </FriendWrap>
    );
};

export default FriendList;