import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ButtonWrapper, FriendAddButton, FriendCancelButton } from '../../components/addfriendmodal/styles';
import sulmoggoApi from "../../shared/apis";
import { PostWrap, Title, Subtitle, Content, Image, Tag } from './styles'

// 웹 에디터 관리
import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useEffect } from 'react';

const Post = () => {
  const tag = ["맥주", "소주", "와인", "막걸리", "양주", "전통주", "기타"];
  const [tagList, setTagList] = useState(null);
  const [tagColor, setTagColor] = useState();
  const [imgList, SetImgList] = useState([]);
  const [content, SetContent] = useState("");
  const [thumbnail, SetThumbnail] = useState("");
  const [thumbnailImg, SetThumbnailImg] = useState("");
  const navigate = useNavigate();
  const editorRef = useRef();
  const username = localStorage.getItem("username");
  const [tagdisable, setTagDisable] = useState(false);
  const [textdisable, setTextDisable] = useState(false);

  //태그 선택
  const addTag = (e) => {
    setTagColor(e.target.value);
    setTagList(tag[e.target.value]);
  };

  // 게시글 작성 요청
  const onSubmit = async (data) => {
    const newData = {
      title: data.title,
      content: editorRef.current?.getInstance().getHTML(),
      alcoholtag: tagList,
      freetag: data.freetag,
      thumbnail: thumbnailImg || imgList[0],
      imgUrlList: imgList,
      username,
    };

    try {
      const res = await sulmoggoApi.tables(newData);
      // console.log(res);
      navigate(`/tables`);
    } catch (err) {
      // console.log(err);
    }
  };

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onChange'
  });

  // 업로드 이미지 관리
  const onUploadImage = async (blob, callback) => {
    try {
      const formData = new FormData();
      formData.append("file", blob);
      const url = await sulmoggoApi.img(formData);
      callback(url.data[0].url, "alt text");
      SetImgList((state) => [...state, url.data[0].url]);
    } catch (err) {
    }

    return false;
  };


  // 웹 에디터 content영역 확인하기
  const onChange = () => {
    const content = editorRef.current?.getInstance().getHTML()
    if (content.length > 60000) {
      alert("내용이 너무 많습니다.")
      setTextDisable(false)
    }
    if (12 < content.length < 60000) {
      setTextDisable(true);
    }
    SetContent(content);
  };

  useEffect(() => {
    if (tagList !== null && tagColor !== null) {
      setTagDisable(true);
    }
  }, [tagList, tagColor]);


  return (
    <PostWrap>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>
          <div>제목</div>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            autoComplete="off"
            maxLength={50}
            {...register("title", {
              required: true,
            })}
          />
        </Title>
        <Subtitle>
          <div className='titlebox'>
            <div>추천술 선택</div>
            <div className="guidebubble">
              술을 선택해 주세요
            </div>
          </div>
          <ul
            onClick={(e) => {
              addTag(e);
            }}
          >
            {tagColor === 0 ? (
              <li value="0" className="fill">
                맥주
              </li>
            ) : (
              <li value="0">맥주</li>
            )}
            {tagColor === 1 ? (
              <li value="1" className="fill">
                소주
              </li>
            ) : (
              <li value="1">소주</li>
            )}
            {tagColor === 2 ? (
              <li value="2" className="fill">
                와인
              </li>
            ) : (
              <li value="2">와인</li>
            )}
            {tagColor === 3 ? (
              <li value="3" className="fill">
                막걸리
              </li>
            ) : (
              <li value="3">막걸리</li>
            )}
            {tagColor === 4 ? (
              <li value="4" className="fill">
                양주
              </li>
            ) : (
              <li value="4">양주</li>
            )}
            {tagColor === 5 ? (
              <li value="5" className="fill">
                전통주
              </li>
            ) : (
              <li value="5">전통주</li>
            )}
            {tagColor === 6 ? (
              <li value="6" className="fill">
                기타
              </li>
            ) : (
              <li value="6">기타</li>
            )}
          </ul>
        </Subtitle>
        <Content>
          <Editor
            ref={editorRef} // DOM 선택용 useRef
            placeholder="내용을 입력해주세요."
            previewStyle="vertical" // 미리보기 스타일 지정
            height="600px" // 에디터 창 높이
            initialEditType="wysiwyg" // 초기 입력모드 설정
            toolbarItems={[
              // 툴바 옵션 설정
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "image", "link"],
              ["code", "codeblock"],
            ]}
            useCommandShortcut={false} // 키보드 입력 컨트롤 방지
            hooks={{
              addImageBlobHook: onUploadImage,
            }} // 이미지 가로채기
            onChange={onChange}
          ></Editor>
        </Content>
        <Image>
          <div>사진 업로드</div>
          <div className="pre_image">
            업로드한 이미지를 <span style={{ color: "red" }}>클릭</span> 시
            대표이미지로 설정이 가능합니다.
          </div>
          <div className="upload">
            {imgList.map((v, i) => {
              return (
                <div key={i}>
                  {content.includes(v) ? (
                    <div
                      className="Img"
                      onClick={(e) => {
                        SetThumbnail(i);
                        SetThumbnailImg(v);
                        // console.log("썸네일 이미지 설정");
                      }}
                    >
                      <img src={v} alt="img" />
                      {thumbnail === i ? (
                        <div className="main">대표</div>
                      ) : null}
                      <div className="border"></div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Image>
        <Tag>
          <div>자유태그</div>
          <input
            type="text"
            placeholder="자유태그 입력(한개만 입력 가능, 띄어쓰기 포함 10글자까지)"
            autoComplete="off"
            maxLength={10}
            {...register("freetag", {
              required: "자유태그를 입력해주세요.",
            })}
          />
          {errors.freetag && (
            <div style={{ color: "red", margin: "10px 0 0 10px" }}>
              {errors.freetag.message}
            </div>
          )}
        </Tag>
        <ButtonWrapper style={{ margin: '14.4rem 0 16rem 0' }}>
          <FriendCancelButton className="whitebutton" onClick={() => navigate(-1)}>취소하기</FriendCancelButton>
          <FriendAddButton className="bluebutton" disabled={!textdisable || !tagdisable || !isDirty || !isValid}>작성완료</FriendAddButton>
        </ButtonWrapper>
      </form>
    </PostWrap>
  );
};

export default Post;
