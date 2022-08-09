import React from "react";
import {
  GuideText,
  UpperWrapper,
  Wrapper,
  CenterWrapper,
  OptionsWrapper,
} from "./styles";

const InputWrapper = (props) => {
    const {error, title, dropdown, options, guide, open} = props;
  return (
    <>
      <Wrapper>
        <UpperWrapper>
          <label htmlFor="email" className="title">
            {title}
          </label>
          <div className="error">
            {error && <img src="/images/icon_information.svg" />}
            {error}
          </div>
        </UpperWrapper>
        <CenterWrapper error={error} dropdown={dropdown}>
          {props.children}
        </CenterWrapper>
        {dropdown && (
          <OptionsWrapper open={open}>
            {options?.map((x, i) => {
              return (
                <div key={i} id={x.value} name={x.text} onClick={props.onOptionChange}>
                  <p>{x.text}</p>
                </div>
              );
            })}
          </OptionsWrapper>
        )}
        <GuideText>{guide}</GuideText>
      </Wrapper>
    </>
  );
};

export default InputWrapper;
