import React from 'react';
import { RecommendItem } from './styles';

const Recommend = ({ img, title, price, tag }) => {
    return (
        <RecommendItem>
            <img src={img} alt='상품이미지' />
            <p className='title'>{title}</p>
            <span className='price'>{price} <p>원</p></span>
            <div className='tag'>
                <p>{tag}</p>
                <p>{tag}</p>
            </div>
        </RecommendItem>
    );
};

export default Recommend;