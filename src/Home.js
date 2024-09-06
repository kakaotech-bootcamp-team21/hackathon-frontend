import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import { Wand2 } from 'lucide-react';
import Loading from './Loading';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState(''); // 제목 상태 관리
    const [keyword, setKeyword] = useState(''); // 키워드 상태 관리
    const [message, setMessage] = useState(''); // 메시지 상태 관리

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // 서버로 POST 요청 보내기
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/fairytale/creation`, {
                title, // 제목
                keyword, // 키워드
                message // 메시지
            });
            console.log('서버 응답:', response.data);
            setIsLoading(false);
            navigate('/mybook'); // 요청 성공 시 페이지 이동
        } catch (error) {
            console.error('Error sending request:', error.response ? error.response.data : error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="home-container">
            {isLoading && <Loading />}
            <form onSubmit={handleSubmit} className="storybook-form">
                <div className="form-section left-section">
                    <h2 className="section-title">마법의 동화책이란?</h2>
                    <div>
                        설명이 들어갈겁니다.
                    </div>
                </div>
                <div className="form-section right-section">
                    <h2 className="section-title">이야기를 만들기 위한 옵션을 선택해주세요 !</h2>
                    <div className="input-group">
                        <span className="category-label">제목</span>
                        <input
                            className="input-field"
                            placeholder="신데렐라"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <span className="category-label">키워드</span>
                        <input
                            className="input-field"
                            placeholder="우주, 여러 행성"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <span className="category-label">메세지</span>
                        <input
                            className="input-field"
                            placeholder="짧음, 보통, 장문"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={isLoading}>
                        <Wand2 size={24}/>
                        {isLoading ? '동화 생성 중...' : '이야기 만들기'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Home;