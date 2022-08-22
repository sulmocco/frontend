import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import sulmoggoApi from "../../shared/apis";
import { Separator } from "../../styles/CommonStyles";
import {
  CommentWrap,
  CommentsList,
  CommentOne,
  NewComment,
} from "./styles";

const Comment = ({ postId }) => {
  const [content, setContent] = useState("");
  const username = useSelector((state) => state.user.username);
  const queryClient = useQueryClient();
  const [onModify, setOnModify] = useState(null);
  const [modifyContent, setModifyContent] = useState(null);

  const newComment = useMutation(
    async () => {
      await sulmoggoApi.postReply(postId || 0, { content }).then(() => {
        alert("댓글이 작성되었습니다.");
        setContent("");
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("post");
      },
    }
  );

  const getComments = async () => {
    const res = await sulmoggoApi.getReplies(postId || 0)
    console.log(res.data);
    return res.data
  };

  const deleteComment = useMutation(
    async (replyId) => {
      const res = await sulmoggoApi.deleteReply(replyId).then(() => {
        alert("삭제가 완료되었습니다.");
      });
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("post");
      },
    }
  );

  const updateComment = useMutation(
    async (replyId) => {
        const res = await sulmoggoApi.updateReply(replyId, {content: modifyContent}).then(() => {
            alert("수정이 완료되었습니다.")
            setModifyContent("")
            setOnModify(null)
        })
        return res
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries("post")
            
        }
    }
  )

  const { data, isSuccess } = useQuery(["post"], getComments);

  
  return (
    <CommentWrap>
      <h2>댓글</h2>
      <NewComment>
        <input
          type="text"
          placeholder="댓글을 입력해주세요."
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button disabled={content === ""} onClick={() => newComment.mutate()}>
          작성하기
        </button>
      </NewComment>
      <CommentsList>
            {isSuccess && data.map(x => (<CommentOne>
            <div className="upper">
              <div className="nickname">{x.username}</div>
              {x.username === username &&
                (x.replyId !== onModify ? (
                  <div>
                    <button 
                    onClick={() => {
                        setOnModify(x.replyId)
                        setModifyContent(x.content)
                        }}>수정</button>
                    <Separator />
                    <button
                      onClick={() => {
                        if (window.confirm("댓글을 삭제하시겠습니까?"))
                          deleteComment.mutate(x.replyId);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => {
                        if(window.confirm("댓글을 수정하시겠습니까?")){
                            updateComment.mutate(x.replyId)
                        }
                    }}>수정완료</button>
                  </div>
                ))}
            </div>
            {x.replyId === onModify ? (
              <input type="text" value={modifyContent} onChange={(e) => setModifyContent(e.target.value)}/>
            ) : (
              <div className="content">{x.content}</div>
            )}
            <div className="createdAt">
              <img src="/images/icon_clock.svg" alt="시계"/>
              <p>{new Date(x.createdAt).toLocaleString()}</p>
            </div>
          </CommentOne>
        ))}
      </CommentsList>
    </CommentWrap>
  );
};

export default Comment;
