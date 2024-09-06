import React from 'react';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Start.css';
import { Wand2 } from 'lucide-react';

// 로컬 이미지 경로
const images = [
    '/img/img.png',
    '/img/img_1.png',
    '/img/img_2.png',
    '/img/img_3.png',
    '/img/img_4.png',
    '/img/img_5.png',
    '/img/img_6.png'
];

function StartPage() {
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

    const handleButtonClick = () => {
        // 버튼 클릭 시 '/' 경로로 이동
        navigate('/start');
    };

    const settings = {
        dots: true,
        centerMode: true,
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 3,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 1000,
        cssEase: "linear",
    };

    return (
        <div className="start-slider-container">
            <h1>동화책 만들기</h1>
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index} className="start-image-wrapper">
                        <img src={src} alt={`Slide ${index + 1}`} className="start-image"/>
                    </div>
                ))}
            </Slider>

            <button className="start-submit-button" onClick={handleButtonClick}>
                <Wand2 size={24}/>
                동화 생성하기
            </button>
        </div>
    );
}

export default StartPage;