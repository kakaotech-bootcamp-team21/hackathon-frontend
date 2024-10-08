import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import './Book.css';

const Book = () => {
    const [page, setPage] = useState(0);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
                setPhotos(response.data.slice(0, 10));
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, []);

    const generatePages = () => {
        const storyContent = [
            "옛날 옛적에, 작은 마을에 귀여운 토끼가 살고 있었어요.",
            "토끼는 매일 당근을 먹으며 즐겁게 지냈답니다.",
            "어느 날, 토끼는 숲속 깊은 곳으로 모험을 떠나기로 했어요.",
            "숲속에서 토끼는 많은 새로운 친구들을 만났어요.",
            "부엉이, 다람쥐, 여우와 함께 신나는 시간을 보냈죠.",
            "하지만 해가 지자 토끼는 집으로 돌아가고 싶어졌어요.",
            "친구들의 도움으로 무사히 집에 돌아온 토끼는",
            "가족들과 함께 맛있는 당근 스프를 먹으며 행복한 시간을 보냈답니다.",
            "그 후로도 토끼는 가끔씩 숲속 친구들을 만나러 갔어요.",
            "모두가 행복하게 살았답니다. 끝!"
        ];

        return storyContent.map((content, index) => ({
            content,
            image: photos[index] ? photos[index].url : ''
        }));
    };

    const pages = generatePages();

    const onFlip = (e) => {
        setPage(e.data);
    };

    return (
        <div className="book-container">
            <HTMLFlipBook
                width={400}
                height={600}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={onFlip}
            >
                {pages.map((pageData, index) => (
                    <div key={index} className="book-fairy-tale-page">
                        <div className="book-page-content">
                            <div className="book-page-image" style={{ backgroundImage: `url(${pageData.image})` }}></div>
                            <div className="book-page-text">{pageData.content}</div>
                            <div className="book-page-number">{index + 1}</div>
                        </div>
                    </div>
                ))}
            </HTMLFlipBook>
            <button className="book-custom-button book-prev" onClick={() => setPage(page - 1)} disabled={page === 0}>
                <ChevronLeft size={24} />
            </button>
            <button className="book-custom-button book-next" onClick={() => setPage(page + 1)} disabled={page === pages.length - 1}>
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default Book;