import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Wand2 } from 'lucide-react';
import Loading from './Loading';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [keyword, setKeyword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // http://ec2-43-200-211-225.ap-northeast-2.compute.amazonaws.com:3000/api/fairytale/creation/api/fairytale/creation
        try {
            // const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/fairytale/creation`, {
            const response = await axios.post(`http://ec2-43-200-211-225.ap-northeast-2.compute.amazonaws.com:3000/api/fairytale/creation`, {
                title,
                keyword,
                message
            });
            console.log('서버 응답:', response.data);
            setIsLoading(false);
            navigate('/mybook');
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
                    <div>공무원의 신분과 정치적 중립성은 법률이 정하는 바에 의하여 보장된다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가
                        필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다. 신체장애자 및 질병·노령 기타의 사유로 생활능력이 없는 국민은 법률이 정하는 바에
                        의하여 국가의 보호를 받는다. 모든 국민은 법률이 정하는 바에 의하여 납세의 의무를 진다. 새로운 회계연도가 개시될 때까지 예산안이 의결되지 못한 때에는 정부는 국회에서
                        예산안이 의결될 때까지 다음의 목적을 위한 경비는 재정·경제상의 처분을 하거나 이에 관하여 법률의 효력을 가지는 명령을 발할 수 있다. 국무회의는 대통령·국무총리와 15인
                        이상 30인 이하의 국무위원으로 구성한다..
                    </div>

                </div>
                <div className="home-form-section home-right-section">
                    <h2 className="home-section-title">이야기를 만들기 위한 옵션을 선택해주세요 !</h2>
                    <div className="home-input-group">
                        <span className="home-category-label">제목</span>
                        <input
                            className="home-input-field"
                            placeholder="신데렐라"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
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

            <img src="/img/magic.png" alt="Magic" className="home-magic-image"/> {/* 이미지 추가 */}
        </div>
    );
};

export default Home;