import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import sulmoggoApi from '../../shared/apis';
import { AlchholTag, FreeTag } from '../../styles/CommonStyles';
import { DetailCont, DetailHeader, DetailWrap, Icon } from './styles';
import Spinner from '../../components/spinner';
import Comment from '../../components/comment';
import { useNavigate, useParams } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';

const Detail = () => {
    const user = localStorage.getItem('username');
    const { tableId } = useParams();
    const { data, status } = useQuery(['table'], async () => await sulmoggoApi.getDetail(tableId).then(res => res.data), {
        cacheTime: 0,
    });
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    //게시글 삭제
    const deleteMutation = useMutation(async (tableId) => await sulmoggoApi.deletePost(tableId), {
        onSuccess: () => {
            alert('술상이 엎어졌습니다');
            navigate(`/tables`);
        },
        onError: (error) => {
            alert('실패', error);
        }
    });
    //북마크
    const postBookmarkMutation = useMutation(async () => await sulmoggoApi.postBookmark(tableId), {
        onSuccess: () => {
            queryClient.refetchQueries('table');
        },
        onError: (error) => {
            console.error(error);
        }
    });
    const deleteBookmarkMutation = useMutation(async () => await sulmoggoApi.deleteBookmark(tableId), {
        onSuccess: () => {
            queryClient.refetchQueries('table');
        },
        onError: (error) => {
            console.log(error)
        }
    });
    const handleBookmark = () => {
        if (data.bookmark) {
            deleteBookmarkMutation.mutate();
        } else {
            postBookmarkMutation.mutate();
        }
    }
    //좋아요
    const postLikeMutation = useMutation(async () => await sulmoggoApi.postLike(tableId), {
        onSuccess: () => {
            queryClient.invalidateQueries('table');
        },
        onError: (error) => {
            console.log(error)
        }
    });
    const deleteLikeMutation = useMutation(async () => await sulmoggoApi.deleteLike(tableId), {
        onSuccess: () => {
            queryClient.invalidateQueries('table');
        },
        onError: (error) => {
            console.log(error)
        }
    });
    const handleLike = () => {
        if (data.like) {
            deleteLikeMutation.mutate(tableId)
        } else {
            postLikeMutation.mutate(tableId)
        }
    }
    if (status === 'loading') {
        return <Spinner />
    }
    return (
        <DetailWrap>
            <DetailHeader>
                <section className='title'>
                    <h3>{data.title}</h3>
                    {data.bookmark ? (
                        <img src='/images/icon_bookmark_on.svg' alt='북마크' onClick={handleBookmark} />
                    ) : (
                        <img src='/images/icon_bookmark.svg' alt='북마크' onClick={handleBookmark} />
                    )}
                </section>
                <section className='user'>
                    <img src={data?.profileimgurl || '/images/profile_default.svg'} alt='프로필 이미지' />
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
                    {data.username === user && (
                        <span className='edit'>
                            <p onClick={() => navigate(`/editpost/${tableId}`)}>수정</p>
                            <p onClick={() => {
                                if (window.confirm('정말로 술상을 엎으시겠습니까?'))
                                    deleteMutation.mutate(tableId)
                            }}>삭제</p>
                        </span>
                    )}
                </section>
                <section className='main'>
                    <Viewer initialValue={data.content} />
                    {/* {data.content} */}
                </section>
                <section className='footer'>
                    <Icon like={data?.like} onClick={handleLike}>
                        <div className='icon'>
                            {data.like ? (
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
            <Comment postId={tableId} key={tableId} />
        </DetailWrap >
    );
};

export default Detail;