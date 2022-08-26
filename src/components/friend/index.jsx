import React from 'react';
import sulmoggoApi from '../../shared/apis';
import { getLevel } from '../../shared/modules';
import { FriendCont, FriendWrap } from './styles';

const FriendList = (props) => {

    const { profile, level, username, isOnair } = props;

    return (
        <FriendWrap>
            <FriendCont>
                <div className='section'>
                    <div className="img">
                        <img src={profile} alt='프로필 이미지' />
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
                <button>삭제하기</button>
            </FriendCont>
        </FriendWrap>
    );
};

export default FriendList;