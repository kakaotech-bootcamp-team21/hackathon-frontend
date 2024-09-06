import React, { useState } from 'react';
import { Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
import './Review.css'; // 별도의 CSS 파일

// 별 다섯 개를 나타내는 컴포넌트
const StarRating = () => {
    const [rating, setRating] = useState(0); // 현재 별점 상태
    const [hover, setHover] = useState(0);   // 호버 상태

    return (
        <div className="review-star-container">
            {Array(5).fill(null).map((_, index) => {
                const starIndex = index + 1;
                return (
                    <Star
                        key={starIndex}
                        className={`review-star ${starIndex <= (hover || rating) ? 'review-star-filled' : ''}`}
                        onMouseEnter={() => setHover(starIndex)} // 마우스 호버 시
                        onMouseLeave={() => setHover(0)}         // 호버 해제 시
                        onClick={() => setRating(starIndex)}     // 클릭 시 별점 설정
                    />
                );
            })}
        </div>
    );
};

function Review() {
    const reviewImage = '/img/review.png'; // 단 하나의 이미지 경로
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

    const handleButtonClick2 = () => {
        navigate('/'); // 버튼 클릭 시 "/" 경로로 이동
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>저희가 만든 동화는 어떠셨나요?</h1>
            <StarRating />  {/* 별 다섯개 표시 */}
            <img
                src={reviewImage}
                alt="Review"
                style={{ width: '300px', height: 'auto', marginTop: '20px' }}
            />
            <button className="review-button" onClick={handleButtonClick2} style={{marginLeft : "230px"}}>
                <Eye size={24} />
                홈으로 돌아가기
            </button>
        </div>
    );
}

export default Review;