"use client";

import Header from "@/app/_components/Header";
import Greeting from "@/app/_components/Greeting";
import Location from "./Location";
import Ceremony from "./Ceremony";
import Introduce from "./Introduce";
import Pictures from "./Pictures";
import Participant from "./Participant";
import Board from "./Board";
import { useState, useEffect } from "react";
import Account from "./Account";
import Footer from "./Footer";

function CardContent() {
    const [showOverlay, setShowOverlay] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const fullText1 = "햇살이 반짝이는 여름,";
    const fullText2 = "두 사람의 마음을 모아 하나가 되려합니다.";

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }, []);

    useEffect(() => {
        let currentIndex1 = 0;
        let currentIndex2 = 0;
        let typingInterval1: NodeJS.Timeout;
        let typingInterval2: NodeJS.Timeout;

        // 커서 깜빡임 효과
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        // 랜덤 타이핑 속도 생성 함수
        const getRandomTypingSpeed = () => Math.floor(Math.random() * 60) + 40;

        // 첫 번째 문장 타이핑 효과
        const typeFirstSentence = () => {
            typingInterval1 = setInterval(() => {
                if (currentIndex1 < fullText1.length) {
                    setText1((prev) => fullText1.slice(0, currentIndex1 + 1));
                    currentIndex1++;
                } else {
                    clearInterval(typingInterval1);
                    // 첫 번째 문장 완료 후 대기 시간도 조정
                    setTimeout(typeSecondSentence, 500);
                }
            }, getRandomTypingSpeed());
        };

        // 두 번째 문장 타이핑 효과
        const typeSecondSentence = () => {
            typingInterval2 = setInterval(() => {
                if (currentIndex2 < fullText2.length) {
                    setText2((prev) => fullText2.slice(0, currentIndex2 + 1));
                    currentIndex2++;
                } else {
                    clearInterval(typingInterval2);
                    // 타이핑 완료 후 1초 뒤에 페이드아웃 시작
                    setTimeout(() => {
                        setFadeOut(true);
                        // 페이드아웃 애니메이션을 위해 1초 더 기다린 후 오버레이 제거
                        setTimeout(() => {
                            setShowOverlay(false);
                            document.body.style.overflow = "unset";
                        }, 1000);
                    }, 1000);
                }
            }, getRandomTypingSpeed());
        };

        typeFirstSentence();

        if (showOverlay) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            clearInterval(typingInterval1);
            clearInterval(typingInterval2);
            clearInterval(cursorInterval);
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <>
            {showOverlay && (
                <div
                    className={`fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-1000 ease-out ${fadeOut ? "opacity-0" : "opacity-100"}`}
                >
                    <div className="text-center text-lg text-white sm:text-2xl">
                        {text1}
                        {text1.length > 0 &&
                            text2.length === 0 &&
                            showCursor &&
                            "|"}
                        <br />
                        {text2}
                        {text2.length > 0 && showCursor && "|"}
                    </div>
                </div>
            )}
            <div className="card-main">
                <Header />
                <Greeting />
                <Ceremony />
                <Pictures />
                <Location />
                <Account />
                <Board />
                <Participant />
                <Footer />
            </div>
        </>
    );
}

export default CardContent;
