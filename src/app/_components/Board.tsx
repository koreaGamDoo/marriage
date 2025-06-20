"use client";

import useObserver from "@/hook/useObserver";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
    RiCloseLargeFill,
    RiCornerDownRightLine,
    RiMessage2Line,
} from "react-icons/ri";
import Modal from "react-modal";
import "swiper/css";
import BoardCreate from "./BoardCreate";
import BoardDelete from "./BoardDelete";
import BoardList from "./BoardList";
import CommendCreate from "./CommendCreate";

function Board() {
    const [guestbook, setGuestbook] = useState<any[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [modalIsOpen3, setModalIsOpen3] = useState(false);
    const [modalIsOpen4, setModalIsOpen4] = useState(false);
    const [selectedNo, setSelectedNo] = useState<string>("");
    const [admin, setAdmin] = useState<number>(0);

    const { ref: ref1, animation: animation1 } = useObserver(0);
    const { ref: ref2, animation: animation2 } = useObserver(0.1);
    const { ref: ref3, animation: animation3 } = useObserver(0.2);
    const { ref: ref4, animation: animation4 } = useObserver(0.3);

    useEffect(() => {
        const isAnyModalOpen = modalIsOpen || modalIsOpen2 || modalIsOpen3;
        document.body.style.overflow = isAnyModalOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modalIsOpen, modalIsOpen2, modalIsOpen3]);

    const adminVerify = () => {
        setAdmin(admin + 1);
    };

    const customStyles = {
        content: {
            inset: "5%",
            width: "90%",
            maxWidth: "400px",
            maxHeight: "95vh",
            height: "fit-content",
            alignSelf: "center",
            margin: "auto",
            padding: "30px",
            overflow: "auto", // 스크롤 추가
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
    };

    const fetchData = () => {
        fetch("/api/getBoard")
            .then((res) => res.json())
            .then((data) => {
                if (data.data.length > 0) setGuestbook(data.data);
                else
                    setGuestbook([
                        {
                            no: "no",
                            content: "자유롭게 결혼 축하해주세요!",
                            name: "최주영❤️이지원 커플",
                        },
                    ]);
            });
    };

    const refetch = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();

        // 60초마다 데이터 새로고침
        const interval = setInterval(fetchData, 60000);

        // 컴포넌트 언마운트 시 인터벌 정리
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="gsap-div flex h-[1000px] flex-col bg-orange-50 px-4 py-10">
                <motion.div
                    ref={ref1}
                    initial="hidden"
                    animate={animation1}
                    className="board-title"
                >
                    <div className="gsap-opacity mb-5 flex items-center justify-center">
                        <p
                            className="gsap-opacity font-['Cafe24Shiningstar'] text-[17vw] tracking-wider sm:text-[60px]"
                            onClick={adminVerify}
                        >
                            BOARD
                        </p>
                        {admin >= 5 && (
                            <FontAwesomeIcon
                                icon={faXmark}
                                className="ml-1 cursor-pointer text-sm text-red-500"
                                onClick={() => setAdmin(0)}
                            />
                        )}
                    </div>
                </motion.div>
                <motion.div ref={ref2} initial="hidden" animate={animation2}>
                    <div className="gsap-opacity mb-10 flex h-[100px] flex-col items-center justify-evenly">
                        <p>신랑, 신부에게 전하고 싶은 말을</p>
                        <p>자유롭게 적어주세요</p>
                    </div>
                </motion.div>
                <motion.div
                    ref={ref3}
                    initial="hidden"
                    animate={animation3}
                    className="board z-0 w-[100%] text-center"
                >
                    <div className="scrollbar-hide mx-auto h-[500px] w-full max-w-[600px] overflow-y-auto px-4">
                        <div className="flex flex-col gap-2 py-4">
                            {guestbook
                                ?.filter((item) => !item.target) // target이 없는 항목만 필터링
                                .map((item) => {
                                    const comments = guestbook.filter(
                                        (comment) => comment.target === item.no,
                                    );

                                    return (
                                        <div key={item.no} className="relative">
                                            <div className="mx-auto flex w-full flex-col items-center justify-center rounded-lg bg-[#ebdddd] p-5 text-left">
                                                <div className="flex w-full items-center justify-between">
                                                    <p className="text-[14px] font-bold">
                                                        {item.name.length > 20
                                                            ? `${item.name.slice(0, 20)}...`
                                                            : item.name}
                                                    </p>
                                                    <FontAwesomeIcon
                                                        icon={faXmark}
                                                        className="cursor-pointer text-sm transition-colors hover:text-red-500"
                                                        onClick={() => {
                                                            if (
                                                                item.no !== "no"
                                                            ) {
                                                                setSelectedNo(
                                                                    item.no,
                                                                );
                                                                setModalIsOpen3(
                                                                    true,
                                                                );
                                                            } else {
                                                                toast.error(
                                                                    "삭제할 수 없는 방명록입니다.",
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </div>

                                                <div className="my-4 w-full">
                                                    <p className="whitespace-pre-wrap break-words text-[14px]">
                                                        {item.content}
                                                    </p>
                                                </div>

                                                <div className="flex w-full items-center justify-end gap-2">
                                                    <p className="text-[10px] text-[#aaa]">
                                                        {item.created}
                                                    </p>
                                                    {admin >= 5 && (
                                                        <RiMessage2Line
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                setSelectedNo(
                                                                    item.no,
                                                                );
                                                                setModalIsOpen4(
                                                                    true,
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-2 flex h-auto flex-col gap-2 text-left">
                                                {comments.map((comment) => (
                                                    <div
                                                        key={comment.no}
                                                        className="flex"
                                                    >
                                                        <div>
                                                            <RiCornerDownRightLine className="inline" />
                                                        </div>
                                                        <div className="flex w-[90%] flex-col rounded-lg bg-[#f0f0f0] px-3 py-2">
                                                            <span className="mt-1 block min-w-0 flex-1 whitespace-pre-wrap break-words text-[12px] italic text-gray-600">
                                                                {
                                                                    comment.content
                                                                }
                                                            </span>
                                                            <div className="mt-2 flex items-center justify-end gap-2">
                                                                <span className="block text-[10px] italic text-[#aaa]">
                                                                    {
                                                                        comment.created
                                                                    }
                                                                </span>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faXmark
                                                                    }
                                                                    className="cursor-pointer text-xs transition-colors hover:text-red-500"
                                                                    onClick={() => {
                                                                        if (
                                                                            comment.no !==
                                                                            "no"
                                                                        ) {
                                                                            setSelectedNo(
                                                                                comment.no,
                                                                            );
                                                                            setModalIsOpen3(
                                                                                true,
                                                                            );
                                                                        } else {
                                                                            toast.error(
                                                                                "삭제할 수 없는 방명록입니다.",
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    ref={ref4}
                    initial="hidden"
                    animate={animation4}
                    className="board-button ml-auto flex justify-end gap-[5px] pr-[30px] pt-[30px]"
                >
                    {/* <div
                            onClick={() => {
                                if (guestbook[0].no === "no") {
                                    toast.error("아직 방명록이 없습니다.", {
                                        duration: 2000,
                                        position: "top-center",
                                        id: "unique-toast",
                                    });
                                } else {
                                    setModalIsOpen(true);
                                }
                            }}
                            className="mx-auto flex h-[35px] w-[80px] cursor-pointer items-center justify-center rounded bg-[grey] text-center shadow-md hover:opacity-90"
                        >
                            <p className="text-[14px] text-white">전체보기</p>
                        </div> */}
                    <div
                        onClick={() => setModalIsOpen2(true)}
                        className="mx-auto flex h-[35px] w-[80px] cursor-pointer items-center justify-center rounded bg-[grey] text-center shadow-md hover:opacity-90"
                    >
                        <p className="text-[14px] text-white">방명록 작성</p>
                    </div>
                </motion.div>
                <Modal
                    isOpen={modalIsOpen}
                    shouldCloseOnOverlayClick={false}
                    onRequestClose={() => setModalIsOpen(false)}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className="boardCreateInfo">
                        <div className="relative mb-2.5 flex h-10 items-start justify-center border-b-2 border-gray-300">
                            <p className="flex-1 text-center font-bold">
                                방명록 리스트
                            </p>
                            <RiCloseLargeFill
                                onClick={() => setModalIsOpen(false)}
                            />
                        </div>
                        <BoardList guestbook={guestbook} />
                    </div>
                </Modal>
                <Modal
                    isOpen={modalIsOpen2}
                    shouldCloseOnOverlayClick={false}
                    onRequestClose={() => setModalIsOpen2(false)}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className="boardCreateInfo">
                        <div className="relative mb-2.5 flex h-10 items-start justify-center border-b-2 border-gray-300">
                            <p className="flex-1 text-center font-bold">
                                방명록 작성
                            </p>
                            <RiCloseLargeFill
                                onClick={() => setModalIsOpen2(false)}
                            />
                        </div>
                        <BoardCreate
                            setModalIsOpen={setModalIsOpen2}
                            refetch={refetch}
                        />
                    </div>
                </Modal>
                <Modal
                    isOpen={modalIsOpen3}
                    shouldCloseOnOverlayClick={false}
                    onRequestClose={() => setModalIsOpen3(false)}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className="boardDeleteInfo">
                        <div className="relative mb-2.5 flex h-10 items-start justify-center border-b-2 border-gray-300">
                            <p className="flex-1 text-center font-bold">
                                방명록 삭제
                            </p>
                            <RiCloseLargeFill
                                onClick={() => setModalIsOpen3(false)}
                            />
                        </div>
                        <BoardDelete
                            setModalIsOpen={setModalIsOpen3}
                            selectedNo={selectedNo}
                            refetch={refetch}
                        />
                    </div>
                </Modal>
                <Modal
                    isOpen={modalIsOpen4}
                    shouldCloseOnOverlayClick={false}
                    onRequestClose={() => setModalIsOpen4(false)}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className="boardDeleteInfo">
                        <div className="relative mb-2.5 flex h-10 items-start justify-center border-b-2 border-gray-300">
                            <p className="flex-1 text-center font-bold">
                                댓글 달기
                            </p>
                            <RiCloseLargeFill
                                onClick={() => setModalIsOpen4(false)}
                            />
                        </div>
                        <CommendCreate
                            setModalIsOpen={setModalIsOpen4}
                            selectedNo={Number(selectedNo)}
                            refetch={refetch}
                        />
                    </div>
                </Modal>
            </div>
        </>
    );
}
export default Board;
