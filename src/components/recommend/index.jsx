import { useQuery } from '@tanstack/react-query';
import React from 'react';
import sulmoggoApi from '../../shared/apis';
import { AlchholTag, SnackTag } from '../../styles/CommonStyles';
import { RecommendItem, RecommendWrap } from './styles';

const Recommend = () => {
    const { data } = useQuery(["products"], () =>
        sulmoggoApi.getProducts().then((res) => res.data));
    console.log(data);
    return (
        <RecommendWrap>
            <h2>이상품 어때요?</h2>
            <section className="recommendsection">
                {data?.map((item, index) => (
                    <RecommendItem key={item.id} onClick={() => window.open(`${item.redirectUrl}`, '_blank')}>
                        <img src={item.imageUrl} alt='상품이미지' />
                        <p className='title'>{item.name}</p>
                        <span className='price'>{item.price} <p>원</p></span>
                        <div className='tag'>
                            <AlchholTag >{item.alcoholtag}</AlchholTag>
                        </div>
                    </RecommendItem>
                ))}
            </section>
        </RecommendWrap>
    );
};

export default Recommend;