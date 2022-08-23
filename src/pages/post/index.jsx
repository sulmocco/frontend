import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { set, useForm } from "react-hook-form";
import { WhiteButton } from "../../styles/CommonStyles";
import sulmoggoApi from "../../shared/apis";
import Spinner from '../../components/spinner';

// 웹 에디터 관리
import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useSelector } from "react-redux";
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const Post = () => {
  const tag = ["맥주", "소주", "와인", "막걸리", "양주", "전통주"];
  const [tagList, setTagList] = useState("맥주");
  const [tagColor, setTagColor] = useState(0);
  const [imgList, SetImgList] = useState([]);
  const [content, SetContent] = useState("");
  const [thumbnail, SetThumbnail] = useState("");
  const [thumbnailImg, SetThumbnailImg] = useState("");
  const navigate = useNavigate();
  const editorRef = useRef();
  const username = useSelector((state) => state.user.username);
  const { tableId } = useParams();
  const [isEdit, setEdit] = useState(false);
  // const { data, status } = useQuery(['table'], () => sulmoggoApi.getDetail(tableId).then(res => res.data), {
  //   cacheTime: 0,
  // });
  // console.log(data);

  // 게시글 수정일때
  // useEffect(() => {
  //   if (tableId !== undefined) {
  //     setEdit(true)
  //     setTagList(data?.alcoholtag);
  //     setTagColor(tag.findIndex((el) => el == data?.alcoholtag));
  //   } else {
  //     setEdit(false)
  //   }
  // }, []);
  // 태그 선택
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
      console.log(res);
      navigate(`/tables`);
    } catch (err) {
      console.log(err);
    }
  };

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 업로드 이미지 관리
  const onUploadImage = async (blob, callback) => {
    try {
      const formData = new FormData();
      formData.append("file", blob);
      const url = await sulmoggoApi.img(formData);
      console.log(url.data[0].url);
      callback(url.data[0].url, "alt text");
      SetImgList((state) => [...state, url.data[0].url]);
    } catch (err) {
      console.log(err);
    }

    return false;
  };

  // 웹 에디터 content영역 확인하기
  const onChange = () => {
    console.log(editorRef.current?.getInstance().getHTML());
    console.log("이미지리스트확인", imgList);
    SetContent(editorRef.current?.getInstance().getHTML());
  };

  // 최초 이미지 업로드 및 대표 이미지 선택시 썸네일 지정
  // useEffect(() => {
  //   SetThumbnailImg(imgList[thumbnail]);
  // }, [imgList, thumbnail]);

  // if (status === 'loading') {
  //   return <Spinner />
  // }

  return (
    <Wrap>
      {isEdit ? <h2>게시글 수정</h2> : <h2>게시글 작성</h2>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>
          <div>제목</div>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            // defaultValue={isEdit && data?.title}
            autoComplete="off"
            {...register("title", {
              required: true,
            })}
          />
        </Title>
        <Subtitle>
          <div>추천술 선택</div>
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
          </ul>
        </Subtitle>
        <Content>
          <Editor
            ref={editorRef} // DOM 선택용 useRef
            placeholder="내용을 입력해주세요."
            // defaultValue={isEdit && data.content}
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
                        console.log("썸네일 이미지 설정");
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
            // defaultValue={isEdit && data?.freetag}
            autoComplete="off"
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
        <Button>
          <div>
            <Link to="/tables">
              <WhiteButton className="whitebutton">취소하기</WhiteButton>
            </Link>
            <button className="bluebutton">작성완료</button>
          </div>
        </Button>
      </form>
    </Wrap>
  );
};

export default Post;

const Wrap = styled.section`
  h2 {
    font-size: 32px;
    margin-top: 100px;
  }
`;

const Title = styled.div`
  div {
    font-weight: 700;
    margin-top: 50px;
    font-size: 26px;
  }

  input {
    width: 100%;
    height: 64px;
    background: #f2f3f3;
    border-radius: 10px;
    border: none;
    font-size: 20px;
    padding: 20px;
    margin-top: 10px;
  }
`;

const Subtitle = styled.div`
  div {
    margin-top: 25px;
    font-size: 20px;
    font-weight: 700;
  }

  ul {
    display: flex;
    gap: 10px;
    li {
      cursor: pointer;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 73px;
      height: 33px;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;

      &.fill {
        background: #2459e0;
        border-radius: 20px;
        color: white;
      }
    }
  }
`;

const Content = styled.div`
  margin-top: 40px;
`;

const Image = styled.div`
  margin-top: 40px;

  .pre_image {
    font-size: 14px;
    color: #bcbcbc;
  }

  div {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }

  .upload {
    margin-top: 20px;
    display: flex;
  }

  .Img {
    width: 180px;
    height: 180px;
    background: #f2f3f3;
    border-radius: 10px;
    position: relative;
    margin-right: 20px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      /* background-size: cover; */
    }

    .border {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;

      &:hover {
        border: 3px solid #2459e0;
        border-radius: 10px;
      }
    }
    .main {
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: #2459e0;
      border-radius: 5px;
      color: white;
      padding: 10px;
    }
  }
`;

const Tag = styled.div`
  margin-top: 30px;
  div {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }

  input {
    width: 100%;
    height: 64px;
    background: #f2f3f3;
    border-radius: 10px;
    border: none;
    font-size: 20px;
    padding: 20px;
    margin-top: 10px;
  }
`;

const Button = styled.div`
  display: flex;
  width: 100%;
  margin-top: 80px;

  div {
    display: flex;
    margin: 0 auto;
  }

  .whitebutton {
    margin-right: 60px;
    width: 368px;
    height: 88px;
    cursor: pointer;
  }

  button {
    width: 368px;
    height: 88px;
    border: none;
    font-weight: 700;
    font-size: 2rem;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.white};
  }
`;
