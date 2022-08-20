import styled from "styled-components";
// 디자인 시스템 기반 컴포넌트 모음

// 로그인, 회원가입 등에 사용되는 큰 버튼
// mt={"1rem"} 등으로 margin-top을 직접 지정해줄 수 있음. 디폴트는 2.4rem
export const BigButton = styled.button`
  /* width: 3.99rem; */
  width: 40rem;
  max-width: 100%;
  height: 7.2rem;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
  margin-top: ${(props) => props.mt || "2.4rem"};
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 2.6rem;
  font-weight: 700;
  max-width: 40rem;
`;

// 나의 술 레벨
export const UserLevel = styled.div`
  width: 4.7rem;
  height: 1.8rem;
  font-size: 1.2rem;
  line-height: 1.4rem;
  padding: 0.2rem;
  background-color: ${(props) => props.theme.bg_light_blue};
  color: ${(props) => props.theme.primary};
  text-align: center;
`;

// 버튼 베이스 스타일 (디자인 시스템)
export const ButtonBase = styled.button`
  width: 22.4rem;
  height: 6.4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1.8rem 0rem;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 2rem;
  border: none;
  &:disabled {
    background-color: ${(props) => props.theme.grey_04};
    color: ${(props) => props.theme.black_02};
    border: 1px solid #d6d6d6;
  }
`;
// 계속하기
export const BlueButton = styled(ButtonBase)`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
`;
// 취소하기
export const WhiteButton = styled(ButtonBase)`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black_02};
  border: 1px solid #d6d6d6;
`;

// 태그 베이스 스타일
export const TagBase = styled.div`
  font-size: 1.6rem;
  padding: 0.4rem 1.2rem;
  border-radius: 2rem;
  font-weight: 500;
  line-height: 1.9rem;
  border: 0.1rem solid transparent;
  color: ${(props) => props.theme.black_02};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// 주종 태그
export const AlchholTag = styled(TagBase)`
  background-color: ${(props) => props.theme.light_yellow_01};
`;
// 안주 태그
export const SnackTag = styled(TagBase)`
  background-color: ${(props) => props.theme.light_yellow_02};
`;
// 테마
export const ThemeTag = styled(TagBase)`
  background-color: ${(props) => props.theme.bg_light_blue};
`;
// 자유 태그
export const FreeTag = styled(TagBase)`
  border: 0.1rem solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.bg_light_blue};
`;

// 세로구분선
export const Separator = styled.div`
  display: inline-block;
  width: 0.1rem;
  height: 0.8rem;
  background-color: #d9d9d9;
  margin: 0rem 0.4rem;
`;

// 주종 버튼(파란색)
export const AlcoholButtons = styled.div`
  padding: 0.6rem 1.6rem 0.7rem;
  background-color: ${(props) => props.theme.primary};
  border-radius: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.white};
  letter-spacing: -0.04em;
  font-size: 1.6rem;
  line-height: 1.6rem;
`;

// 페이지 제목
export const PageTitle = styled.h1`
  font-size: 3.4rem;
  line-height: 4.1rem;
  letter-spacing: -0.02em;
  font-weight: 700;
`;