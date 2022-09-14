import React from 'react';
import { SpinnerWrap } from './styles';

const Spinner = (props) => {
    return (
        <SpinnerWrap size={props.size}>
            <video autoPlay loop muted>
                <source src="/spinner.mp4" type="video/mp4" />
            </video>
            <p>잠시만 기다려 주세요.</p>
        </SpinnerWrap>
    );
};

export default Spinner;