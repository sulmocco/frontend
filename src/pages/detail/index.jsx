import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import sulmoggoApi from '../../shared/apis';
import { AlchholTag, FreeTag } from '../../styles/CommonStyles';
import { DetailCont, DetailHeader, DetailWrap, Icon } from './styles';
import { useState } from 'react';
import Spinner from '../../components/spinner';
import Comment from '../../components/comment';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
    const { tableId } = useParams();
    const { data, status } = useQuery(['detail'], () => sulmoggoApi.getDetail(tableId).then(res => res.data));
    const navigate = useNavigate();
    const deleteMutation = useMutation((tableId) => sulmoggoApi.deletePost(tableId), {
        onSuccess: () => {
            alert('삭제성공');
            navigate(`/tables`);
        },
        onError: (error) => {
            alert('실패', error);
        }
    });
    const [like, setLike] = useState(data?.isLike);
    const [bookMark, setBookmark] = useState(data?.isBookmark);
    //북마크
    const bookmarkMutation = useMutation(() => sulmoggoApi.bookmark(tableId, { data: bookMark }, {
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    }));
    const handleBookmark = () => {
        setBookmark(!bookMark);
        bookmarkMutation.mutate(tableId, { data: bookMark })
    }
    //좋아요
    const likeMutation = useMutation(() => sulmoggoApi.like(tableId, { data: like }, {
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    }));
    const handleLike = () => {
        setLike(!like);
        likeMutation.mutate(tableId, { data: like })
    }
    if (status == 'loading') {
        return <Spinner />
    }
    return (
        <DetailWrap>
            <DetailHeader>
                <section className='title'>
                    <h3>{data.title}</h3>
                    {data.isBookmark ? (
                        <img src='/images/icon_bookmark_on.svg' alt='북마크' onClick={handleBookmark} />
                    ) : (
                        <img src='/images/icon_bookmark.svg' alt='북마크' onClick={handleBookmark} />
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
                        <p onClick={() => navigate(`/post/${tableId}`)}>수정</p>
                        <p onClick={() => deleteMutation.mutate(tableId)}>삭제</p>
                    </span>
                </section>
                <section className='main'>
                    <p>{data.content}</p>
                </section>
                <section className='footer'>
                    <Icon like={like} onClick={handleLike}>
                        <div className='icon'>
                            {data.islike ? (
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
            <Comment postId={0} key={tableId} />
        </DetailWrap >
    );
};

export default Detail;