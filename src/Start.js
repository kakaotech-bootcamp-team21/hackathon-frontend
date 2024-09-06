import React from 'react';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Start.css';
import {Eye, Wand2} from 'lucide-react';
import axios from 'axios';

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

    const handleButtonClick2 = () => {
        // 버튼 클릭 시 '/list' 경로로 이동
        navigate('/list');
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
            <h1>엄마의 CHAT장</h1>
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index} className="start-image-wrapper">
                        <img src={src} alt={`Slide ${index + 1}`} className="start-image"/>
                    </div>
                ))}
            </Slider>
<div style={{display: "flex", justifyContent: "space-between", marginTop: "30px"}}>
            <button className="start-submit-button" onClick={handleButtonClick}>
                <Wand2 size={24}/>
                새로운 이야기 만들기
            </button>

            {/* '/list'로 이동하는 버튼 */}
            <button className="start-list-button" onClick={handleButtonClick2}>
                <Eye size={24}/>
                기존 이야기 다시보기
            </button>
</div>
        </div>
    );
}

export default StartPage;