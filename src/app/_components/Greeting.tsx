"use client";

import Image from "next/image";
import useObserver from "@/hook/useObserver";
import { motion } from "framer-motion";

function Greeting() {
    const { ref: ref1, animation: animation1 } = useObserver(0);
    const { ref: ref2, animation: animation2 } = useObserver(0.1);
    const { ref: ref3, animation: animation3 } = useObserver(0.2);
    const { ref: ref4, animation: animation4 } = useObserver(0.3);
    const { ref: ref5, animation: animation5 } = useObserver(0.4);
    const { ref: ref6, animation: animation6 } = useObserver(0.5);
    const { ref: ref7, animation: animation7 } = useObserver(0.6);

    return (
        <div className="greeting-header gsap-div h-[650px] w-full break-keep bg-white pb-10 pl-5 pr-5 pt-10 sm:h-[700px]">
            <div className="greeting-content text-center leading-8">
                <div className="greeting-content relative text-center leading-8">
                    <div className="mb-[40px] flex items-center justify-center gap-4">
                        <div className="h-[1px] w-24 bg-[#dea5a4] sm:w-32"></div>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="#dea5a4" // 테일윈드의 pink-500 색상
                            className="h-7 w-7"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <div className="h-[1px] w-24 bg-[#dea5a4] sm:w-32"></div>
                    </div>
                    <div className="mx-auto">
                        <Image
                            className="greeting-image"
                            src="/images/greeting-back.png"
                            alt={"mainPic"}
                            width={500} // width 값을 10에서 500으로 수정
                            height={250}
                            priority // 이미지 우선 로딩을 위해 priority 추가
                        />
                    </div>
                    <div className="overlay-text absolute inset-0 mt-[50px] flex flex-col items-center justify-center">
                        <motion.p
                            ref={ref1}
                            initial="hidden"
                            animate={animation1}
                            className="first mb-[20px] font-['Cafe24Shiningstar'] text-[8vw] font-[600] sm:text-[40px]"
                        >
                            소중한 분을 초대합니다.
                        </motion.p>
                        <motion.p
                            ref={ref2}
                            initial="hidden"
                            animate={animation2}
                            className="other mb-[-0.8vh] text-[4vw] sm:text-[16px]"
                        >
                            서로에 대한 믿음과 사랑으로
                        </motion.p>
                        <motion.p
                            ref={ref3}
                            initial="hidden"
                            animate={animation3}
                            className="other text-[4vw] sm:text-[16px]"
                        >
                            하루를 채워가며 하나의 삶이되었습니다.
                        </motion.p>
                        <motion.p
                            ref={ref4}
                            initial="hidden"
                            animate={animation4}
                            className="other mb-[-0.8vh] text-[4vw] sm:text-[16px]"
                        >
                            눈부신 날들을 함께걷기로 약속하고
                        </motion.p>
                        <motion.p
                            ref={ref5}
                            initial="hidden"
                            animate={animation5}
                            className="other text-[4vw] sm:text-[16px]"
                        >
                            설렘으로 새로운 시작을 준비하려고 합니다.
                        </motion.p>
                        <motion.p
                            ref={ref6}
                            initial="hidden"
                            animate={animation6}
                            className="other mb-[-0.8vh] text-[4vw] sm:text-[16px]"
                        >
                            첫 걸음을 따뜻한 축복으로 함께해 주세요.
                        </motion.p>
                        <motion.p
                            ref={ref7}
                            initial="hidden"
                            animate={animation6}
                            className="other text-[4vw] sm:text-[16px]"
                        >
                            큰 기쁨으로 간직하겠습니다.
                        </motion.p>
                    </div>
                </div>
            </div>

            <br />

            <motion.div
                ref={ref7}
                initial="hidden"
                animate={animation7}
                className="familyInfo mt-[20px] text-center leading-8"
            >
                <div className="man">
                    <strong>
                        <span className="member text-[4vw] sm:text-[20px]">
                            최용석&nbsp; · &nbsp;박성희{" "}
                        </span>
                    </strong>
                    <span className="center text-[4vw] sm:text-[16px]">
                        의 차남 &nbsp; 신랑
                    </span>
                    <strong>
                        <span className="member text-[4vw] sm:text-[20px]">
                            &nbsp;최주영
                        </span>
                    </strong>
                </div>
                <div className="girl">
                    <strong>
                        <span className="member text-[4vw] sm:text-[20px]">
                            이광희&nbsp; · &nbsp;조희숙{" "}
                        </span>
                    </strong>
                    <span className="center text-[4vw] sm:text-[16px]">
                        의 장녀 &nbsp; 신부
                    </span>
                    <strong>
                        <span className="member text-[4vw] sm:text-[20px]">
                            &nbsp;이지원
                        </span>
                    </strong>
                </div>
            </motion.div>
        </div>
    );
}
export default Greeting;
