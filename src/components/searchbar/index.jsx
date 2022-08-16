import React from "react";
import { useRef } from "react";
import { SearchBox } from "./styles";

// 검색창 컴포넌트
// 사용법
// <SearchBar placeholder=string onSearch={(keyword) => function(keyword)} maxLength=number />
// placeholder : 검색어가 없을 때 임시값. 기본값은 "검색어를 입력하세요."
// maxLength : 입력 가능한 최대 길이. 기본값은 20자.
// onSearch(필수) : 검색창에서 엔터 혹은 검색 버튼을 눌렀을 때 작동하는 함수. parameter로 입력된 키워드를 넘김.
const SearchBar = ({ placeholder, onSearch, maxLength }) => {
  const keywordRef = useRef();
  return (
    <SearchBox>
      <input
        type="text"
        placeholder={placeholder || "검색어를 입력하세요."}
        maxLength={maxLength || 20}
        ref={keywordRef}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSearch(e.target.value);
          }
        }}
      />
      <button>
        <img
          src="/images/icon_search.svg"
          onClick={() => onSearch(keywordRef.current.value)}
          alt="검색"
        />
      </button>
    </SearchBox>
  );
};

export default SearchBar;
