"use client";

import useObserver from "@/hook/useObserver";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "react-hot-toast";

export const accountList = [
    {
        name: "신랑",
        account: "352-0903-9414-43",
    },
    {
        name: "신랑아버지",
        account: "110-280-218845",
    },
    {
        name: "신랑어머니",
        account: "110-295-035318",
    },
    {
        name: "신부",
        account: "352-1995-0702-83",
    },
    {
        name: "신부아버지",
        account: "302-3633-0855-81",
    },
    {
        name: "신부어머니",
        account: "601153-56-018596",
    },
];

function Account() {
    const { ref: ref1, animation: animation1 } = useObserver(0);
    const { ref: ref2, animation: animation2 } = useObserver(0.1);
    const { ref: ref3, animation: animation3 } = useObserver(0.2);
    const { ref: ref4, animation: animation4 } = useObserver(0.3);
    const { ref: ref5, animation: animation5 } = useObserver(0.4);

    const copyAddress = (num: number) => {
        navigator.clipboard.writeText(accountList[num].account);
        toast.success("계좌가 복사되었습니다", {
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
            <div className="accountInfo gsap-div h-full w-full break-keep bg-[#faf3f3] pb-40 pt-10">
                <motion.div
                    ref={ref1}
                    initial="hidden"
                    animate={animation1}
                    className="mb-[50px] flex w-full justify-between px-4"
                >
                    <Image
                        className="greeting-image pt-5"
                        src="/images/heartribbon.png"
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
                    className="location-title"
                >
                    <div className="gsap-opacity mb-8 flex justify-center">
                        <p className="gsap-opacity px-4 font-['Cafe24Shiningstar'] text-[12vw] tracking-wider sm:text-[60px]">
                            마음 전하실 곳
                        </p>
                    </div>
                </motion.div>

                <div className="participant-contents mx-auto mb-10 flex h-[100px] w-[90%] flex-col items-center justify-evenly">
                    <motion.p ref={ref3} initial="hidden" animate={animation3}>
                        참석이 어려우신 분들을 위해 기재했습니다.
                    </motion.p>
                    <motion.p ref={ref4} initial="hidden" animate={animation4}>
                        너그러운 마음으로 양해 부탁드립니다.
                    </motion.p>
                </div>

                <motion.div
                    ref={ref5}
                    initial="hidden"
                    animate={animation5}
                    className="w-full max-w-md px-4 [&>*]:transform-none"
                >
                    <Accordion
                        variant="splitted"
                        className="w-full max-w-md px-4 [&>*]:transform-none"
                        selectionMode="multiple"
                    >
                        <AccordionItem
                            key="1"
                            aria-label="Accordion 1"
                            title={<span className="font-bold">신랑측</span>}
                            className="rounded-[10px] bg-[#ffffff] pb-2"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="align-center flex flex-row justify-between rounded-md bg-[#EBEBEB] p-3">
                                    <div className="flex-start flex flex-col">
                                        <span className="mb-3 font-bold">
                                            최주영
                                        </span>
                                        <span className="text-[14px]">
                                            352-0903-9414-43
                                        </span>
                                        <span className="text-[14px]">
                                            농협은행 최주영
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <div
                                            className="board-button flex h-[30px] w-[60px] cursor-pointer items-center justify-evenly rounded-md bg-[#969595] px-1 py-1 shadow-md"
                                            onClick={() => copyAddress(0)}
                                        >
                                            <a className="text-bold text-[11px] text-white hover:opacity-90 sm:text-sm">
                                                복사
                                            </a>
                                            <Image
                                                className="copyIcon cursor-pointer"
                                                src={
                                                    "/images/copyIcon_white.png"
                                                }
                                                alt={"copyIcon"}
                                                width={15}
                                                height={15}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="align-center flex flex-row justify-between rounded-md bg-[#EBEBEB] p-3">
                                    <div className="flex-start flex flex-col">
                                        <span className="mb-3 font-bold">
                                            최용석
                                        </span>
                                        <span className="text-[13px] sm:text-[14px]">
                                            110-280-218845
                                        </span>
                                        <span className="text-[14px]">
                                            신한은행 최용석
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <div
                                            className="board-button flex h-[30px] w-[60px] cursor-pointer items-center justify-evenly rounded-md bg-[#969595] px-1 py-1 shadow-md"
                                            onClick={() => copyAddress(1)}
                                        >
                                            <a className="text-bold text-[11px] text-white hover:opacity-90 sm:text-sm">
                                                복사
                                            </a>
                                            <Image
                                                className="copyIcon cursor-pointer"
                                                src={
                                                    "/images/copyIcon_white.png"
                                                }
                                                alt={"copyIcon"}
                                                width={15}
                                                height={15}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            key="2"
                            aria-label="Accordion 2"
                            title={<span className="font-[700]">신부측</span>}
                            className="rounded-[10px] bg-[#ffffff] pb-2"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="align-center flex flex-row justify-between rounded-md bg-[#EBEBEB] p-3">
                                    <div className="flex-start flex flex-col">
                                        <span className="mb-3 font-bold">
                                            이지원
                                        </span>
                                        <span className="text-[14px]">
                                            352-1995-0702-83
                                        </span>
                                        <span className="text-[14px]">
                                            농협은행 이지원
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <div
                                            className="board-button flex h-[30px] w-[60px] cursor-pointer items-center justify-evenly rounded-md bg-[#969595] px-1 py-1 shadow-md"
                                            onClick={() => copyAddress(3)}
                                        >
                                            <a className="text-bold text-[11px] text-white hover:opacity-90 sm:text-sm">
                                                복사
                                            </a>
                                            <Image
                                                className="copyIcon cursor-pointer"
                                                src={
                                                    "/images/copyIcon_white.png"
                                                }
                                                alt={"copyIcon"}
                                                width={15}
                                                height={15}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="align-center flex flex-row justify-between rounded-md bg-[#EBEBEB] p-3">
                                    <div className="flex-start flex flex-col">
                                        <span className="mb-3 font-bold">
                                            이광희
                                        </span>
                                        <span className="text-[14px] sm:text-[15px]">
                                            302 3633 0855 81
                                        </span>
                                        <span className="text-[14px]">
                                            농협은행 이광희
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <div
                                            className="board-button flex h-[30px] w-[60px] cursor-pointer items-center justify-evenly rounded-md bg-[#969595] px-1 py-1 shadow-md"
                                            onClick={() => copyAddress(4)}
                                        >
                                            <a className="text-bold text-[11px] text-white hover:opacity-90 sm:text-sm">
                                                복사
                                            </a>
                                            <Image
                                                className="copyIcon cursor-pointer"
                                                src={
                                                    "/images/copyIcon_white.png"
                                                }
                                                alt={"copyIcon"}
                                                width={15}
                                                height={15}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="align-center flex flex-row justify-between rounded-md bg-[#EBEBEB] p-3">
                                    <div className="flex-start flex flex-col">
                                        <span className="mb-3 font-bold">
                                            조희숙
                                        </span>
                                        <span className="text-[14px]">
                                            601153-56-018596
                                        </span>
                                        <span className="text-[14px]">
                                            농협은행 조희숙
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <div
                                            className="board-button flex h-[30px] w-[60px] cursor-pointer items-center justify-evenly rounded-md bg-[#969595] px-1 py-1 shadow-md"
                                            onClick={() => copyAddress(5)}
                                        >
                                            <a className="text-bold text-[11px] text-white hover:opacity-90 sm:text-sm">
                                                복사
                                            </a>
                                            <Image
                                                className="copyIcon cursor-pointer"
                                                src={
                                                    "/images/copyIcon_white.png"
                                                }
                                                alt={"copyIcon"}
                                                width={15}
                                                height={15}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
            </div>
        </>
    );
}
export default Account;
