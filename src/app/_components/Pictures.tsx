"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { useEffect, useState } from "react";
import useObserver from "@/hook/useObserver";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { RiCloseLargeFill } from "react-icons/ri";
import PictureList from "./PictureList";

function Pictures() {
    const [images, setImages] = useState<
        Array<{
            url: string;
            width: number;
            height: number;
        }>
    >([]);
    const [selectedImage, setSelectedImage] = useState<{
        url: string;
        width: number;
        height: number;
    } | null>(null);
    const [activeIndexes, setActiveIndexes] = useState<number[]>([0, 1, 2]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { ref: ref1, animation: animation1 } = useObserver(0);
    const { ref: ref2, animation: animation2 } = useObserver(0.1);

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
            zIndex: 1000,
            overflow: "auto", // 스크롤 추가
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 999,
        },
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("/api/images");
                const data = await response.json();
                const imageUrls = data.images.map(
                    (image: {
                        filename: string;
                        width: number;
                        height: number;
                    }) => ({
                        url: `/images/marriage/${image.filename}`,
                        width: image.width,
                        height: image.height,
                    }),
                );
                setImages(imageUrls);
            } catch (error) {
                console.error("이미지를 불러오는데 실패했습니다:", error);
            }
        };

        fetchImages();
    }, []);

    return (
        <>
            <div className="gsap-div flex h-[800px] w-full flex-col items-center break-keep bg-[#f8f8f8] px-4 sm:h-[900px]">
                <motion.div
                    ref={ref1}
                    initial="hidden"
                    animate={animation1}
                    className="pictures-title"
                >
                    <div className="gsap-opacity mb-8 flex justify-center">
                        <p className="gsap-opacity px-4 font-['Cafe24Shiningstar'] text-[15vw] tracking-wider sm:text-[60px]">
                            GALLERY
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    ref={ref2}
                    initial="hidden"
                    animate={animation2}
                    className="pictures relative z-0 w-[90%]"
                >
                    {images.length > 0 && (
                        <>
                            <div className="relative h-[460px] w-full overflow-hidden">
                                <Image
                                    className="picture absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain"
                                    src={selectedImage?.url || images[0]?.url}
                                    width={
                                        selectedImage?.width || images[0]?.width
                                    }
                                    height={
                                        selectedImage?.height ||
                                        images[0]?.height
                                    }
                                    alt={"JH"}
                                    priority
                                />
                            </div>
                            <div className="mt-[20px] max-[360px]:mt-[0px] sm:mt-[20px]">
                                <Swiper
                                    className="h-[110px]"
                                    modules={[
                                        Navigation,
                                        Pagination,
                                        Scrollbar,
                                        A11y,
                                    ]}
                                    slidesPerView={3}
                                    spaceBetween={
                                        window.innerWidth <= 320
                                            ? 10
                                            : window.innerWidth <= 640
                                              ? -20
                                              : -50
                                    }
                                    speed={500}
                                    loop={true}
                                    watchSlidesProgress={true}
                                    updateOnWindowResize={true}
                                    observer={true}
                                    observeParents={true}
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                    }}
                                    scrollbar={{
                                        draggable: true,
                                        hide: false,
                                        dragSize: 50,
                                    }}
                                >
                                    {images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="relative mx-auto h-[80px] w-[80px]">
                                                <div className="absolute inset-0 rounded-full bg-white" />
                                                <div
                                                    className="absolute inset-0 overflow-hidden rounded-full"
                                                    style={{
                                                        transform:
                                                            "translate3d(0,0,0)",
                                                        willChange: "transform",
                                                    }}
                                                >
                                                    <Image
                                                        className={`picture h-full w-full transform cursor-pointer object-cover transition-all duration-300 ${
                                                            selectedImage?.url ===
                                                                image.url ||
                                                            (!selectedImage &&
                                                                index === 0)
                                                                ? "scale-110"
                                                                : "opacity-50 hover:opacity-70"
                                                        }`}
                                                        src={image.url}
                                                        width={image.width}
                                                        height={image.height}
                                                        alt={"JH"}
                                                        onClick={() => {
                                                            setSelectedImage(
                                                                image,
                                                            );
                                                        }}
                                                        priority={index < 3}
                                                    />
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </>
                    )}
                </motion.div>
                <div className="mt-[30px] flex w-full justify-end px-4">
                    <div
                        onClick={() => setModalIsOpen(true)}
                        className="flex h-[35px] w-[80px] cursor-pointer items-center justify-center rounded bg-[grey] shadow-md hover:opacity-90"
                    >
                        <p className="text-[14px] text-white">갤러리 보기</p>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                ariaHideApp={false}
                htmlOpenClassName="overflow-hidden"
                bodyOpenClassName="overflow-hidden"
            >
                <div className="boardCreateInfo">
                    <div className="relative mb-2.5 flex h-10 items-start justify-center border-b-2 border-gray-300">
                        <p className="flex-1 text-center font-bold">갤러리</p>
                        <RiCloseLargeFill
                            onClick={() => setModalIsOpen(false)}
                        />
                    </div>
                    <PictureList images={images.map((image) => image.url)} />
                </div>
            </Modal>
        </>
    );
}
export default Pictures;
