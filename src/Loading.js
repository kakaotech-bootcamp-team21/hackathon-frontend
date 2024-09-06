import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Loading.css';

const Loading = () => {
    const loadingRef = useRef(null);

    useEffect(() => {
        const loadingElement = loadingRef.current;
        gsap.to(loadingElement, {
            rotation: 360,
            repeat: -1,
            duration: 1,
            ease: "linear"
        });
    }, []);

    return (
        <div className="loading-overlay">
            <div className="loading-spinner" ref={loadingRef}></div>
            <p>생성중입니다...</p>
        </div>
    );
};
// http://ec2-43-200-211-225.ap-northeast-2.compute.amazonaws.com:3000/api/fairytale/entire/22
export default Loading;