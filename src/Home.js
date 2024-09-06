import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
import Loading from './Loading';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/mybook');
        }, 3000); // 3초 후 페이지 이동
    };

    return (
        <div className="home-container">
            {isLoading && <Loading />}
            <form onSubmit={handleSubmit} className="storybook-form">
                <div className="form-section left-section">
                    <h2 className="section-title">원작을 볼건가요 안볼건가요?</h2>
                    <div className="buttons">
                        <button type="button" className="option-button">예</button>
                        <button type="button" className="option-button">아니오</button>
                    </div>
                </div>
                <div className="form-section right-section">
                    <h2 className="section-title">교훈을 선택한 경우</h2>
                    <div className="input-group">
                        <span className="category-label">각색할 원작</span>
                        <input className="input-field" placeholder="신데렐라" />
                    </div>
                    <div className="input-group">
                        <span className="category-label">배경</span>
                        <input className="input-field" placeholder="우주, 여러 행성" />
                    </div>
                    <div className="input-group">
                        <span className="category-label">페이지 수</span>
                        <input className="input-field" placeholder="짧음, 보통, 장문" />
                    </div>
                    <button type="submit" className="submit-button">
                        <Wand2 size={24} />
                        동화 생성하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Home;