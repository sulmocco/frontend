import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlchholTag, SnackTag } from '../../styles/CommonStyles';
import { RecommendItem } from './styles';

const Recommend = ({ url, img, title, price, tag }) => {
    return (
        <RecommendItem onClick={() => window.open(`${url}`, '_blank')}>
            <img src={img} alt='상품이미지' />
            <p className='title'>{title}</p>
            <span className='price'>{price} <p>원</p></span>
            <div className='tag'>
                <AlchholTag >{tag}</AlchholTag>
                <SnackTag >{tag}</SnackTag>
            </div>
        </RecommendItem>
    );
};

export default Recommend;