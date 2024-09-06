import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Wand2 } from 'lucide-react';
import Loading from './Loading';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/fairytale/creation`, {
                keyword,
                message
            });
            const storyId = response.data.storyId; // 서버에서 받은 storyId
            setIsLoading(false);
            navigate(`/mybook/${storyId}`); // storyId를 URL에 포함하여 전달
        } catch (error) {
            console.error('Error sending request:', error.response ? error.response.data : error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="home-container">
            {isLoading && <Loading />}
            <form onSubmit={handleSubmit} className="home-storybook-form">
                <div className="home-form-section home-left-section">
                    <h2 className="home-section-title">마법의 동화책이란?</h2>
                    <div>마법의 동화책 설명이 여기에 들어갑니다.</div>
                </div>
                <div className="home-form-section home-right-section">
                    <h2 className="home-section-title">이야기를 만들기 위한 옵션을 선택해주세요 !</h2>
                    <div className="home-input-group">
                        <span className="home-category-label">키워드</span>
                        <input
                            className="home-input-field"
                            placeholder="우주, 여러 행성"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="home-input-group">
                        <span className="home-category-label">메세지</span>
                        <input
                            className="home-input-field"
                            placeholder="짧음, 보통, 장문"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="home-submit-button" disabled={isLoading}>
                        <Wand2 size={24}/>
                        {isLoading ? '동화 생성 중...' : '이야기 만들기'}
                    </button>
                </div>
            </form>

            <img src="/img/magic.png" alt="Magic" className="home-magic-image"/>
        </div>
    );
};

export default Home;