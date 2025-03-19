import GetCalendarDataset from "@/app/_components/Calendar";
import useObserver from "@/hook/useObserver";
import { motion } from "framer-motion";
import Image from "next/image";

function Ceremony() {
    const { ref: ref1, animation: animation1 } = useObserver(0);
    const { ref: ref2, animation: animation2 } = useObserver(0.1);
    const { ref: ref3, animation: animation3 } = useObserver(0.2);
    const { ref: ref4, animation: animation4 } = useObserver(0.3);
    const { ref: ref5, animation: animation5 } = useObserver(0.4);

    return (
        <>
            <div className="gsap-div h-[950px] w-full break-keep bg-[#f8f8f8] pb-10 pl-5 pr-5 pt-10">
                <div className="ceremony-title">
                    <motion.div
                        ref={ref1}
                        initial="hidden"
                        animate={animation1}
                        className="mb-[30px] flex w-full justify-between px-4 pt-5"
                    >
                        <Image
                            className="greeting-image"
                            src="/images/pinkhearts.png"
                            alt={"mainPic"}
                            width={500} // width 값을 10에서 500으로 수정
                            height={250}
                            priority // 이미지 우선 로딩을 위해 priority 추가
                        />
                    </motion.div>
                    <motion.div
                        ref={ref2}
                        initial="hidden"
                        animate={animation2}
                        className="gsap-opacity mb-5 flex w-full justify-center"
                    >
                        <p className="gsap-opacity px-4 font-['Cafe24Shiningstar'] text-[15vw] tracking-wider sm:text-[60px]">
                            WEDDING DAY
                        </p>
                    </motion.div>

                    <motion.div
                        ref={ref3}
                        initial="hidden"
                        animate={animation3}
                        className="flex flex-col gap-y-2 text-center text-[13px] sm:text-[15px]"
                    >
                        <p>2025년 5월 31일 토요일 | 오후 4시 20분</p>
                        <p>Saturday, May 31, 2025 | PM 4:20</p>
                    </motion.div>
                </div>

                <div className="w-full px-5">
                    <div className="w-full">
                        <motion.div
                            ref={ref4}
                            initial="hidden"
                            animate={animation4}
                        >
                            <div className="mt-[30px] flex items-center justify-center gap-4">
                                <div className="h-[1px] w-1/2 bg-gray-300"></div>
                                <span className="text-2xl">5</span>
                                <div className="h-[1px] w-1/2 bg-gray-300"></div>
                            </div>
                        </motion.div>

                        <motion.div
                            ref={ref5}
                            initial="hidden"
                            animate={animation5}
                        >
                            <GetCalendarDataset />
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Ceremony;
