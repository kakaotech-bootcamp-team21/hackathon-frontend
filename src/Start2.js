import React, { useState } from 'react';
import './Start2.css';

const Start2 = () => {
    const [story, setStory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [changestory, setChangestory] = useState('');
    const [ifstory, setIfstory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // 나중에 여기에 POST 요청으로 데이터를 전송하는 기능을 추가할 수 있습니다.
        try {
            // POST 요청 보내는 기능을 여기에 추가
            // 예시:
            // const response = await axios.post('/api/your-endpoint', {
            //   changestory,
            //   ifstory,
            // });

            setStory(`Story based on: ${changestory}, with change: ${ifstory}`);
        } catch (error) {
            console.error('Error saving story:', error);
            setStory('Error saving story.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="book-page">
            <h2>fairy tale generator</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="changestory">🫧 각색할 원작 동화가 있나요? (있다면 제목 입력)</label>
                    <input
                        id="changestory"
                        type="text"
                        value={changestory}
                        onChange={(e) => setChangestory(e.target.value)}
                        placeholder="각색할 원작 동화 제목 (없으면 빈칸)"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="ifstory">🫧 원작 동화 내용 (간단히)</label>
                    <input
                        id="ifstory"
                        type="text"
                        value={ifstory}
                        onChange={(e) => setIfstory(e.target.value)}
                        placeholder="각색하고 싶은 내용 입력"
                        rows="3"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? '동화 만드는 중...' : '동화 만들기'}
                </button>
            </form>
            {story && (
                <div className="story">
                    <h2>Story:</h2>
                    <p className="whitespace-pre-wrap">{story}</p>
                </div>
            )}
        </div>
    );
};

export default Start2;