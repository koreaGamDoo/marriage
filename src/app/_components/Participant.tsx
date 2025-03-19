"use client";

import { RiCloseLargeFill } from "react-icons/ri";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import Survey from "@/app/_components/Survey";
import useObserver from "@/hook/useObserver";
import { motion } from "framer-motion";

function Participant() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { ref: ref1, animation: animation1 } = useObserver(0);
    const { ref: ref2, animation: animation2 } = useObserver(0.1);
    const { ref: ref3, animation: animation3 } = useObserver(0.2);
    const { ref: ref4, animation: animation4 } = useObserver(0.3);
    const { ref: ref5, animation: animation5 } = useObserver(0.4);
    const { ref: ref6, animation: animation6 } = useObserver(0.5);

    useEffect(() => {
        if (modalIsOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modalIsOpen]);

    const customStyles = {
        content: {
            inset: "5%",
            width: "90%",
            maxWidth: "400px",
            maxHeight: "95vh",
            height: "fit-content",
            alignSelf: "center",
            margin: "auto",
            padding: "20px 30px 20px 30px",
            overflow: "auto", // 스크롤 추가
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
    };

    return (
        <>
            <div className="gsap-div flex h-[600px] flex-col bg-[#faf3f3] px-4 py-10">
                <motion.div
                    ref={ref1}
                    initial="hidden"
                    animate={animation1}
                    className="introduce-title"
                >
                    <div className="gsap-opacity mb-12 flex justify-center">
                        <p className="gsap-opacity px-4 font-['Cafe24Shiningstar'] text-[13vw] tracking-wider sm:text-[60px]">
                            참석 여부 전달
                        </p>
                    </div>
                </motion.div>
                <div className="participant-contents mx-auto mb-10 flex h-[200px] w-[90%] flex-col items-center justify-evenly">
                    <motion.p ref={ref2} initial="hidden" animate={animation2}>
                        결혼식에 참석해주시는 분들,
                    </motion.p>
                    <motion.p ref={ref3} initial="hidden" animate={animation3}>
                        한 분 한 분 더욱 귀하게 모실 수 있도록
                    </motion.p>
                    <motion.p ref={ref4} initial="hidden" animate={animation4}>
                        참석여부를 전달해주시면
                    </motion.p>
                    <motion.p ref={ref5} initial="hidden" animate={animation5}>
                        감사하겠습니다.
                    </motion.p>
                </div>

                <motion.div
                    ref={ref6}
                    initial="hidden"
                    animate={animation6}
                    onClick={() => setModalIsOpen(true)}
                    className="mx-auto flex h-[35px] w-[100px] cursor-pointer items-center justify-center rounded bg-[grey] text-center shadow-md hover:opacity-90"
                >
                    <p className="text-[14px] text-white">참석 여부 전달</p>
                </motion.div>

                <Modal
                    isOpen={modalIsOpen}
                    shouldCloseOnOverlayClick={false}
                    onRequestClose={() => setModalIsOpen(false)}
                    style={customStyles}
                    ariaHideApp={false}
                    htmlOpenClassName="overflow-hidden"
                    bodyOpenClassName="overflow-hidden"
                >
                    <div className="surveyInfo">
                        <div className="relative mb-2.5 flex h-10 items-start justify-center border-b-2 border-gray-300">
                            <p className="flex-1 text-center font-bold">
                                참석 여부 전달
                            </p>
                            <RiCloseLargeFill
                                onClick={() => setModalIsOpen(false)}
                            />
                        </div>
                        <Survey setModalIsOpen={setModalIsOpen} />
                    </div>
                </Modal>
            </div>
        </>
    );
}
export default Participant;
