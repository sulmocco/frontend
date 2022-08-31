import React from 'react';
import { SpinnerWrap } from './styles';

const Spinner = (props) => {
    return (
        <SpinnerWrap size={props.size}>
            <img src='/images/icon_loading.gif' alt='로딩이미지' />
            <p>잠시만 기다려 주세요.</p>
        </SpinnerWrap>
    );
};

export default Spinner;