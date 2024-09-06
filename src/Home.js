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
    const [title, setTitle] = useState('');
    const [ifCondition, setIfCondition] = useState('');

    // 이야기 창조하기 버튼을 눌렀을 때 POST 요청
    const handleCreateStory = async (e) => {
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

    // 기존 동화를 각색하기 버튼을 눌렀을 때 POST 요청
    const handleAdaptStory = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/fairytale/origin`, {
                title,
                ifCondition
            });
            const storyId = response.data.storyId; // 서버에서 받은 storyId
            setIsLoading(false);
            navigate(`/mybook/${storyId}`); // 각색된 storyId를 URL에 포함하여 전달
        } catch (error) {
            console.error('Error sending request:', error.response ? error.response.data : error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="home-container">
            {isLoading && <Loading />}
            <form className="home-storybook-form">
                {/* 이야기 창조를 위한 섹션을 왼쪽으로 이동 */}
                <div className="home-form-section home-left-section">
                    <h2 className="home-section-title">이야기 창조를 위한 키워드와 메세지를 선택해주세요!</h2>
                    <div className="home-input-group">
                        <span className="home-category-label">키워드</span>
                        <input
                            className="home-input-field"
                            placeholder="강아지"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="home-input-group">
                        <span className="home-category-label">교훈</span>
                        <input
                            className="home-input-field"
                            placeholder="양치를 잘하자!"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <button onClick={handleCreateStory} className="home-submit-button" disabled={isLoading}>
                        <Wand2 size={24}/>
                        {isLoading ? '동화 생성 중...' : '이야기 만들기'}
                    </button>
                </div>

                {/* 기존 동화를 각색하는 섹션을 오른쪽으로 이동 */}
                <div className="home-form-section home-right-section">
                    <h2 className="home-section-title">기존에 있는 동화를 이용해 각색할 수도 있어요!</h2>
                    <div className="home-input-group">
                        <span className="home-category-label">제목</span>
                        <input
                            className="home-input-field"
                            placeholder="흥부와 놀부"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="home-input-group">
                        <span className="home-category-label">만약 ~라면?</span>
                        <input
                            className="home-input-field"
                            placeholder="제비가 아니라 남자였다면?!"
                            value={ifCondition}
                            onChange={(e) => setIfCondition(e.target.value)}
                        />
                    </div>
                    <button onClick={handleAdaptStory} className="home-submit-button" disabled={isLoading}>
                        <Wand2 size={24}/>
                        {isLoading ? '동화 각색 중...' : '기존 동화를 각색하기'}
                    </button>
                </div>
            </form>

            <img src="/img/magic.png" alt="Magic" className="home-magic-image"/>
        </div>
    );
};

export default Home;