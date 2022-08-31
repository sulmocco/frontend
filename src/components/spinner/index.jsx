import React from 'react';
import { SpinnerWrap } from './styles';

const Spinner = (props) => {
    return (
        <SpinnerWrap size={props.size}>
            <img src='/images/icon_spinner.svg' alt='로딩스피너' />
            <p>잠시만 기다려 주세요.</p>
        </SpinnerWrap>
    );
};

export default Spinner;