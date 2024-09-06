import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react'; // Home 아이콘 추가
import axios from 'axios';
import './MyBook.css';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 추가

const loadingImages = [
    '/img/loading2.png',
    '/img/loading1.png',
    '/img/loading3.png'
];


const MyBook = () => {
    const [page, setPage] = useState(0);
    const [storyData, setStoryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState({}); // 이미지 로드 상태 저장
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 추가
    const [showModal, setShowModal] = useState(false); // 모달 상태 추가

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 서버로부터 데이터를 요청
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/creation`);
                setStoryData(response.data);
                setIsLoading(false); // 데이터 로드 완료 시 로딩 상태 해제
            } catch (error) {
                console.error('Error fetching story data:', error);
                setIsLoading(false); // 오류 발생 시에도 로딩 상태 해제
            }
        };

        fetchData();
    }, []);

    const generatePages = () => {
        if (storyData) {
            return storyData.parts.map((part) => ({
                content: part.content,
                image: part.imageUrl
            }));
        } else {
            // 로딩 중일 때 페이지당 하나의 로딩 이미지를 순차적으로 표시
            return Array(10).fill(null).map((_, index) => ({
                content: "열심히 그림 그리는 중...",
                image: loadingImages[index % loadingImages.length] // 각 페이지마다 로딩 이미지를 순차적으로 표시
            }));
        }
    };

    const pages = generatePages();

    const onFlip = (e) => {
        setPage(e.data);
    };

    const handleImageLoad = (index) => {
        // 이미지가 로드되면 loadedImages 상태에 추가
        setLoadedImages((prev) => ({
            ...prev,
            [index]: true
        }));
    };

    const renderImage = (image, index) => {
        // 이미지가 로드되지 않았으면 로딩 이미지 표시
        if (isLoading || !loadedImages[index]) {
            return (
                <div className="mybook-page-image" style={{ backgroundImage: `url(${loadingImages[index % loadingImages.length]})` }}>
                    {/* 실제 이미지가 로드되면 handleImageLoad 실행 */}
                    {image && (
                        <img
                            src={image}
                            alt=""
                            onLoad={() => handleImageLoad(index)}
                            style={{ display: 'none' }} // 이미지가 로드될 때까지 숨김
                        />
                    )}
                </div>
            );
        } else {
            // 이미지가 로드되었으면 실제 이미지 표시
            return (
                <div className="mybook-page-image" style={{ backgroundImage: `url(${image})` }}></div>
            );
        }
    };

    // 마지막 장 표지에 "리뷰쓰기!" 버튼 추가
    const renderLastPage = () => {
        return (
            <div className="mybook-fairy-tale-page">
                <div className="mybook-page-content">
                    <h1>재미있었다면...<br></br>다른 사용자랑 공유하기!</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                        <button className="review-button" onClick={() => navigate('/review')}>
                            좋아요!
                        </button>
                        <button className="review-button" onClick={() => navigate('/review')}>
                            괜찮아요
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const handleShareClick = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            navigate('/review');
        }, 2000); // 2초 후 모달 사라짐
    };


    return (


        <div className="mybook-container">
            {/* 상단 오른쪽에 홈 버튼 추가 */}

            {/*<button className="home-button" onClick={() => navigate('/')}>*/}
            {/*    <Home size={32}/>*/}
            {/*</button>*/}
            <HTMLFlipBook
                width={400}
                height={600}
                size="stretch"
                minWidth={315}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                className="mybook-fairy-tale-book"
                onFlip={onFlip}
            >
                {pages.map((pageData, index) => (
                    <div key={index} className="mybook-fairy-tale-page">
                        <div className="mybook-page-content">
                            {renderImage(pageData.image, index)}
                            <div className="mybook-page-text">{pageData.content}</div>
                            <div className="mybook-page-footer">
                                <div className="mybook-page-number">{index + 1}</div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* 마지막 장 표지에 리뷰쓰기 버튼 */}
                {renderLastPage()}
            </HTMLFlipBook>
        </div>

    );
};

export default MyBook;