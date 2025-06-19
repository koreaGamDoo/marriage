"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import useObserver from "@/hook/useObserver";
import { motion } from "framer-motion";

declare global {
    interface Window {
        Kakao: any;
    }
}

function Footer() {
    const { ref: ref1, animation: animation1 } = useObserver(0);
    const { ref: ref2, animation: animation2 } = useObserver(0.1);
    const { ref: ref3, animation: animation3 } = useObserver(0.2);
    const { ref: ref4, animation: animation4 } = useObserver(0.3);
    const { ref: ref5, animation: animation5 } = useObserver(0.4);
    const { ref: ref6, animation: animation6 } = useObserver(0.5);

    const shareKakao = () => {
        if (window.Kakao) {
            const Kakao = window.Kakao;

            if (!Kakao.isInitialized()) {
                Kakao.init(`${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`);
            }

            Kakao.Share.sendDefault({
                objectType: "feed",
                content: {
                    title: "8월 9일 (토) 오후 14시 30분",
                    description: "국방컨벤션 / 1F 에메랄드 홀",
                    imageUrl:
                        "https://cdn.pixabay.com/photo/2017/08/06/20/11/wedding-2595862_1280.jpg",
                    imageWidth: 1200,
                    imageHeight: 630,
                    link: {
                        mobileWebUrl: "https://marriage-gules.vercel.app/",
                        webUrl: "https://marriage-gules.vercel.app/",
                    },
                },
                buttons: [
                    {
                        title: "청첩장 보기",
                        link: {
                            mobileWebUrl: "https://marriage-gules.vercel.app/",
                            webUrl: "https://marriage-gules.vercel.app/",
                        },
                    },
                ],
            });
        }
    };

    const copyAddress = () => {
        navigator.clipboard.writeText("https://marriage-gules.vercel.app/");
        toast.success("주소가 복사되었습니다", {
            duration: 2000,
            position: "top-center",
            style: {
                fontSize: "14px",
                background: "#fff",
                color: "#333",
            },
            id: "unique-toast",
        });
    };

    return (
        <>
            <div className="participantInfo overflow-hidden bg-[#f9eaec]">
                <div className="gsap-div flex h-full min-h-96 flex-col items-center justify-center px-4 py-12">
                    <motion.div
                        ref={ref1}
                        initial="hidden"
                        animate={animation1}
                        className="introduce-title"
                    >
                        <div className="gsap-opacity mb-8 flex justify-center">
                            <p className="gsap-opacity px-4 font-['Cafe24Shiningstar'] text-[13vw] tracking-wider sm:text-[60px]">
                                포토부스
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        ref={ref2}
                        initial="hidden"
                        animate={animation2}
                        className="mb-3"
                    >
                        <Image
                            src="/images/camera.gif"
                            alt="카메라 애니메이션"
                            width={200}
                            height={200}
                        />
                    </motion.div>
                    <div className="participant-contents mx-auto flex h-[100px] w-[90%] flex-col items-center justify-evenly">
                        <motion.p
                            ref={ref3}
                            initial="hidden"
                            animate={animation3}
                        >
                            소중한 날을 기록할 수 있도록
                        </motion.p>
                        <motion.p
                            ref={ref4}
                            initial="hidden"
                            animate={animation4}
                        >
                            포토부스를 준비했습니다.
                        </motion.p>
                    </div>
                    <div className="my-[50px] flex h-[130px] flex-col items-center justify-evenly">
                        <motion.div
                            ref={ref5}
                            initial="hidden"
                            animate={animation5}
                            className="board-button flex h-[40px] w-full cursor-pointer items-center justify-between rounded-md bg-[#FFE000] px-2 py-1 shadow-md"
                            onClick={shareKakao}
                        >
                            <a className="text-bold p-2 text-center text-sm text-black hover:opacity-90">
                                카카오톡으로 청첩장 전하기
                            </a>
                            <Image
                                className="ml-[10px]"
                                src={"/images/kakaotalk.png"}
                                alt={"kakaoPay"}
                                width={20}
                                height={20}
                            />
                        </motion.div>
                        <motion.div
                            ref={ref6}
                            initial="hidden"
                            animate={animation6}
                            className="board-button flex h-[40px] w-full cursor-pointer items-center justify-between rounded-md bg-[#EBADAD] px-2 py-1 shadow-md"
                            onClick={() => copyAddress()}
                        >
                            <a className="text-bold p-2 text-center text-sm text-black hover:opacity-90">
                                청첩장 주소 복사하기
                            </a>
                            <Image
                                className="ml-[10px]"
                                src={"/images/copyIcon.png"}
                                alt={"kakaoPay"}
                                width={20}
                                height={20}
                            />
                        </motion.div>
                    </div>
                    <div className="relative mt-[100px] flex w-full items-center justify-center">
                        <Image
                            className="mb-[-48px] w-full"
                            src={"/images/footerpicture.png"}
                            alt={"캐릭터 이미지"}
                            width={350}
                            height={350}
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                </div>
                <p className="my-[5px] text-center text-[10px] text-[#a7a6a6]">
                    ⓒ copyright Joohan Park
                </p>
            </div>
        </>
    );
}
export default Footer;
