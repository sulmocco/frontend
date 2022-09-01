import React from 'react';
import { NodataWrap } from './styles';

const Nodata = () => {
    return (
        <NodataWrap>
            <img src='/images/icon_nodata.svg' alt='nodata' />
            <p>검색 결과가 없습니다.</p>
        </NodataWrap>
    );
};

export default Nodata;