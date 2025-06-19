import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

function Header() {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <>
            <div className="header-main flex h-[1300px] w-[100%] flex-col items-center bg-[#f9eaec] dark:bg-[#f9eaec] sm:rounded-t-[20px]">
                <div className="header-content mt-8 flex w-[90%] flex-col items-center rounded-[10px] bg-white shadow-[0_20px_20px_rgba(0,0,0,0.1)] dark:bg-white">
                    <div className="header-back flex h-[150px] items-center justify-center">
                        <p className="header-title cursor-pointer font-['Cafe24Shiningstar'] text-[10vw] tracking-wider hover:opacity-80 sm:text-[40px]">
                            저희, 결혼합니다!
                        </p>
                    </div>
                    <div className="name relative w-[80%] text-center text-[#456e2a]">
                        <div className="stars absolute h-full w-full">
                            <div className="star-1"></div>
                            <div className="star-2"></div>
                            <div className="star-3"></div>
                            <div className="star-4"></div>
                            <div className="star-5"></div>
                            <div className="star-6"></div>
                            <div className="star-7"></div>
                            <div className="sparkle-1"></div>
                            <div className="sparkle-2"></div>
                            <div className="sparkle-3"></div>
                            <div className="sparkle-4"></div>
                            <div className="sparkle-5"></div>
                            <div className="sparkle-6"></div>
                            <div className="sparkle-7"></div>
                            <div className="sparkle-8"></div>
                        </div>
                        <Image
                            src="/images/header_couple_picture.jpg"
                            alt="mainPic"
                            width={300}
                            height={400}
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                            priority
                        />
                    </div>
                    <div className="name mx-0 my-[30px] h-[50px] w-[80%] text-center text-[7vw]">
                        <p className="name-title font-['BodoniModa'] text-[20px]">
                            JOOYOUNG & JIWON
                        </p>
                    </div>
                    <div className="header-location mb-[60px] h-auto w-[90%] content-center border-b border-t border-[#EBADAD] py-3 text-center text-[14px] sm:text-[15px]">
                        <p>2025년 8월 9일 토요일 오후 2시 30분</p>
                        <p>국방컨벤션 1F 에메랄드 홀</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;
