import React from "react";
import { AlchholTag, Separator, SnackTag, ThemeTag } from "../../styles/CommonStyles";
import {
  AddHostFriendButton,
  Chat,
  ChatHeader,
  ChatInputWrapper,
  ChatWrapper,
  LiveWrapper,
  ProfileCircle,
  ProfileWrap,
  VideoButton,
  VideoContainer,
} from "./styles";

const Live = (props) => {
  return (
    <LiveWrapper>
      <div className="live_left_box">
        <div className="upper">
          <ProfileWrap>
            <ProfileCircle />
            <div>
              <h1>방제목목목방제목목목방제목목목</h1>
              <div className="userWrap">
                <div className="username">dnflxlaghkxlsld_99</div>
                <AddHostFriendButton>
                  <img src="/images/icon_addfriend.svg" alt="add friend" />
                  <span>친구추가</span>
                </AddHostFriendButton>
              </div>
            </div>
          </ProfileWrap>
          <div className="infoWrap">
            <div className="tagWrap">
              <AlchholTag>주종</AlchholTag>
              <SnackTag>안주</SnackTag>
              <ThemeTag>테마</ThemeTag>
            </div>
            <div className="statWrap">
              <img src="/images/icon_clock_grey_02.svg" alt="clock" />
              <span>24h 00:00</span>
              <Separator />
              <img src="/images/icon_people_grey_02.svg" alt="people" />
              <span>100,000</span>
            </div>
          </div>
        </div>
        <VideoContainer>
          <div className="videoWrap">
          </div>
          <div className="videoButtonWrap">
            <VideoButton>
              <img src="/images/icon_video_available.svg" alt="play video" />
            </VideoButton>
            <VideoButton>
              <img src="/images/icon_audio_available.svg" alt="play audio" />
            </VideoButton>
          </div>
        </VideoContainer>
      </div>
      <div className="live_right_box">
        <ChatHeader>
          <div>
            <img src="/images/icon_chat.svg" alt="chat" />
            <span>채팅</span>
          </div>
          <button>
            <img src="/images/icon_out.svg" alt="out" />
          </button>
        </ChatHeader>
        <ChatWrapper>
          {[...Array(100)].map(x => {
            return <Chat>
              <span className="chatuser">달콩콩이</span>
              <span className="chattext">: 이렇게진짜 길게써버려도 걍된다는거죠 인생이라는건 그런겁니다</span>
            </Chat>
          })}

        </ChatWrapper>
        <ChatInputWrapper>
          <div>
            <input type="text" placeholder="채팅을 입력해 주세요" />
            <button>
              <img src="/images/icon_send.svg" alt="paper airplane" />
            </button>
          </div>
        </ChatInputWrapper>
      </div>
    </LiveWrapper>
  );
};

export default Live;
