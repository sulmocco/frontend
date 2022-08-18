import React from 'react';
import { useQuery } from '@tanstack/react-query';
import sulmoggoApi from '../../shared/apis';
import { AlchholTag, FreeTag } from '../../styles/CommonStyles';
import { DetailCont, DetailHeader, DetailWrap, Icon } from './styles';
import { useState } from 'react';
import Spinner from '../../components/spinner';

const Detail = () => {
    const [like, setLike] = useState(true);
    const { data, status } = useQuery(['detail'], () => sulmoggoApi.getDetail().then(res => res.data));
    console.log(data);
    if (status == 'loading') {
        return <Spinner />
    }
    return (
        <DetailWrap>
            <DetailHeader>
                <section className='title'>
                    <h3>{data.title}</h3>
                    {data.isBookmark ? (
                        <img src='/images/icon_bookmark_on.svg' alt='북마크' />
                    ) : (
                        <img src='/images/icon_bookmark.svg' alt='북마크' />
                    )}
                </section>
                <section className='user'>
                    <img src={data.profileimgurl} alt='프로필 이미지' />
                    <div className='desc'>
                        <p className='user-name'>{data.username}</p>
                        <div className='tag'>
                            <AlchholTag>{data.alcoholtag}</AlchholTag>
                            <FreeTag>{data.freetag}</FreeTag>
                        </div>
                    </div>
                </section>
            </DetailHeader>
            <DetailCont>
                <section className='header'>
                    <p>{data.createAt}</p>
                    <span className='edit'>
                        <p>수정</p>
                        <p>삭제</p>
                    </span>
                </section>
                <section className='main'>
                    <p>{data.content}</p>
                </section>
                <section className='footer'>
                    <Icon like={like} onClick={() => setLike(!like)}>
                        <div className='icon'>
                            {like ? (
                                <img src='/images/icon_like_on.svg' alt='좋아요' />
                            ) : (
                                <img src='/images/icon_like.svg' alt='좋아요' />
                            )}
                        </div>
                        <p>{data.likecount}</p>
                    </Icon>
                    <Icon>
                        <div className='icon'>
                            <img src='/images/icon_view.svg' alt='조회수' />
                        </div>
                        <p>{data.viewcount}</p>
                    </Icon>
                </section>
            </DetailCont>
        </DetailWrap >
    );
};

export default Detail;