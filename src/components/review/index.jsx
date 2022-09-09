import React from 'react';
import { ReviewCont, ReviewWrap } from './styles';

const Review = () => {
    return (
        <ReviewWrap onClick={() => window.open('https://forms.gle/f7HJCdLQgV8VRHEu6', '_blank')}>
            <ReviewCont>
                <div className='left'>
                    <h4>🙏 여러분의 술모꼬<br />사용후기를 알려주세요</h4>
                    <p>후기 이벤트 참여하고 카페라떼 받기</p>
                    <span>Go!</span>
                </div>
                <img src='/images/icon_review.svg' alt='리뷰이미지' />
            </ReviewCont>
        </ReviewWrap>
    );
};

export default Review;