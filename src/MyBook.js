import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HTMLFlipBook from 'react-pageflip';
import './MyBook.css';

const loadingImages = [
    '/img/loading2.png',
    '/img/loading1.png',
    '/img/loading3.png'
];

const MyBook = () => {
    const [page, setPage] = useState(0);
    const [storyData, setStoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState({});
    const navigate = useNavigate();
    const { storyId } = useParams(); // URL에서 storyId 가져옴

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 전체 데이터를 요청
                // `${process.env.REACT_APP_API_URL}/api/fairytale/entire`
                // const response = await axios.get(`http://ec2-43-200-211-225.ap-northeast-2.compute.amazonaws.com:3000/api/fairytale/entire`);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/fairytale/entire`);
                const story = response.data.find(story => story.storyId === parseInt(storyId, 10)); // storyId로 필터링
                if (story) {
                    setStoryData(story);
                } else {
                    console.error('해당 storyId에 해당하는 데이터가 없습니다.');
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching story data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [storyId]);

    const generatePages = () => {
        if (storyData && storyData.parts) {
            return storyData.parts.map((part) => ({
                content: part.content,
                image: part.imageUri
            }));
        } else {
            return Array(10).fill(null).map((_, index) => ({
                content: "열심히 그림 그리는 중...",
                image: loadingImages[index % loadingImages.length]
            }));
        }
    };

    const pages = generatePages();

    const onFlip = (e) => {
        setPage(e.data);
    };

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => ({
            ...prev,
            [index]: true
        }));
    };

    const renderImage = (image, index) => {
        if (isLoading || !loadedImages[index]) {
            return (
                <div className="mybook-page-image" style={{ backgroundImage: `url(${loadingImages[index % loadingImages.length]})` }}>
                    {image && (
                        <img
                            src={image}
                            alt=""
                            onLoad={() => handleImageLoad(index)}
                            style={{ display: 'none' }}
                        />
                    )}
                </div>
            );
        } else {
            return (
                <div className="mybook-page-image" style={{ backgroundImage: `url(${image})` }}></div>
            );
        }
    };

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

    return (
        <div className="mybook-container">
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
                {renderLastPage()}
            </HTMLFlipBook>
        </div>
    );
};

export default MyBook;