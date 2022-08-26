import React from 'react';
import sulmoggoApi from '../../shared/apis';
import { FriendCont, FriendWrap } from './styles';

const FriendList = (props) => {

    const { profile, level, username } = props;

    return (
        <FriendWrap>
            <FriendCont>
                <div className='section'>
                    <div className="img">
                        <img src={profile || '/images/profile_default.svg'} alt="" />
                        <span></span>
                    </div>
                    <div className='desc'>
                        <span>{level || '술고래'}</span>
                        <h4>{username || '닉네임'}</h4>
                    </div>
                </div>
            </FriendCont>
        </FriendWrap>
    );
};

export default FriendList;