"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // 사용자 인터랙션이 있을 때 재생을 시도합니다
        const handleInteraction = () => {
            if (audioRef.current) {
                audioRef.current.play().catch((error) => {
                    console.log("Audio playback failed:", error);
                });
            }
        };
        const handleVisibilityChange = () => {
            if (audioRef.current) {
                if (document.hidden) {
                    audioRef.current.pause();
                } else {
                    audioRef.current.play().catch((error) => {
                        console.log("Audio playback failed:", error);
                    });
                }
            }
        };

        window.addEventListener("click", handleInteraction);
        window.addEventListener("touchstart", handleInteraction);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, []);

    const handleMuteToggle = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="absolute m-[5px] sm:fixed">
            <audio
                ref={audioRef}
                src="/sounds/music.mp3"
                style={{ display: "none" }}
            />
            <button
                onClick={handleMuteToggle}
                className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full border-none bg-gray-500/30"
            >
                <div
                    className={`relative ${
                        isMuted ? "h-[20px] w-[20px]" : "h-[18px] w-[18px]"
                    }`}
                >
                    <Image
                        src="/images/speakeroff.png"
                        alt="speaker off"
                        fill
                        priority
                        className={`transition-opacity duration-100 ${
                            isMuted ? "opacity-100" : "opacity-0"
                        }`}
                    />
                    <Image
                        src="/images/speakeron.png"
                        alt="speaker on"
                        fill
                        priority
                        className={`absolute top-0 transition-opacity duration-100 ${
                            isMuted ? "opacity-0" : "opacity-100"
                        }`}
                    />
                </div>
            </button>
        </div>
    );
}
