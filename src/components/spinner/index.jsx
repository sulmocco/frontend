import React from 'react';
import { SpinnerWrap } from './styles';

const Spinner = () => {
    return (
        <SpinnerWrap>
            <img src='/images/spinner.svg' alt='로딩스피너' />
        </SpinnerWrap>
    );
};

export default Spinner;