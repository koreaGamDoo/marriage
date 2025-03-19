"use client";

import Image from "next/image";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { toast } from "react-hot-toast";
import useObserver from "@/hook/useObserver";
import { motion } from "framer-motion";

function Location() {
    const { ref: ref1, animation: animation1 } = useObserver(0);
    const { ref: ref2, animation: animation2 } = useObserver(0.1);
    const { ref: ref3, animation: animation3 } = useObserver(0.2);
    const { ref: ref4, animation: animation4 } = useObserver(0.3);
    const { ref: ref5, animation: animation5 } = useObserver(0.4);
    const { ref: ref6, animation: animation6 } = useObserver(0.5);
    const { ref: ref7, animation: animation7 } = useObserver(0.6);
    const { ref: ref8, animation: animation8 } = useObserver(0.7);
    const { ref: ref9, animation: animation9 } = useObserver(0.8);
    const { ref: ref10, animation: animation10 } = useObserver(0.9);

    const copyAddress = () => {
        navigator.clipboard.writeText("서울특별시 송파구 올림픽로 319");
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
            <div className="gsap-div flex h-[1500px] w-full flex-col items-center break-keep bg-[#ffffff] pt-10">
                <motion.div
                    ref={ref1}
                    initial="hidden"
                    animate={animation1}
                    className="location-title"
                >
                    <div className="gsap-opacity mb-8 flex justify-center">
                        <p className="gsap-opacity px-4 font-['Cafe24Shiningstar'] text-[15vw] tracking-wider sm:text-[60px]">
                            LOCATION
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    ref={ref2}
                    initial="hidden"
                    animate={animation2}
                    className="routeInfo flex flex-col gap-y-2 px-6 py-10 text-center"
                >
                    <p className="gsap-opacity flex items-center justify-center gap-2 text-center text-[15px] sm:text-[16px]">
                        잠실 더 컨벤션 (교통회관) 1F 그랜드볼룸
                    </p>
                    <div className="flex items-center justify-center gap-1">
                        <p className="gsap-opacity text-[14px] opacity-50 sm:text-[16px]">
                            서울특별시 송파구 올림픽로 319
                        </p>
                        <Image
                            className="copyIcon cursor-pointer"
                            onClick={() => copyAddress()}
                            src={"/images/copyIcon.png"}
                            alt={"copyIcon"}
                            width={15}
                            height={15}
                        />
                    </div>
                </motion.div>

                <motion.div
                    ref={ref3}
                    initial="hidden"
                    animate={animation3}
                    className="routeMap gsap-opacity relative w-[90%] py-4 pb-8"
                >
                    <Map
                        center={{
                            lat: 37.51568329656702,
                            lng: 127.10552336636238,
                        }}
                        style={{ width: "100%", height: "300px" }}
                        level={5}
                    >
                        <MapMarker
                            position={{
                                lat: 37.51568329656702,
                                lng: 127.10552336636238,
                            }}
                        />
                        <ZoomControl />
                    </Map>
                </motion.div>

                <motion.div
                    ref={ref4}
                    initial="hidden"
                    animate={animation4}
                    className="routeApp flex h-5 w-full items-center justify-between space-x-2 px-5 py-3 text-[0.875em]"
                >
                    <div
                        className="appItem gsap-opacity flex flex-1 items-center justify-center gap-2 rounded-md bg-white px-2 py-3 text-center shadow-md"
                        onClick={() =>
                            window.open("https://tmap.life/c728f463")
                        }
                    >
                        <Image
                            className="tmap"
                            src={"/images/tmap.png"}
                            alt={"TMap"}
                            width={25}
                            height={25}
                        />
                        <p className="text-tog-444 text-sm">TMAP</p>
                    </div>
                    <div
                        className="appItem gsap-opacity flex flex-1 items-center justify-center gap-2 rounded-md bg-white px-2 py-3 text-center shadow-md"
                        onClick={() => window.open("https://kko.to/gUGkA903ax")}
                    >
                        <Image
                            className="kakao"
                            src={"/images/kakaomap.png"}
                            alt={"Kakao"}
                            width={25}
                            height={25}
                        />
                        <p className="text-tog-444 text-sm">카카오</p>
                    </div>
                    <div
                        className="appItem gsap-opacity flex flex-1 items-center justify-center gap-2 rounded-md bg-white px-2 py-3 text-center shadow-md"
                        onClick={() => window.open("https://naver.me/GcWrqgGM")}
                    >
                        <Image
                            className="naver"
                            src={"/images/navermap.png"}
                            alt={"Naver"}
                            width={25}
                            height={25}
                        />
                        <p className="text-tog-444 text-sm">네이버</p>
                    </div>
                </motion.div>

                <motion.div
                    ref={ref5}
                    initial="hidden"
                    animate={animation5}
                    className="mt-4 w-full px-8 py-4"
                >
                    <div
                        data-orientation="horizontal"
                        role="none"
                        className="bg-border gsap-opacity my-2 h-[1px] w-full shrink-0"
                        style={{
                            backgroundColor: "#eba3a3",
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transform: "translate(0px, 0px)",
                            opacity: 1,
                        }}
                    ></div>
                </motion.div>

                <div className="transportInfo flex w-full flex-col gap-y-4 whitespace-pre-wrap break-keep px-8 text-[0.875em] leading-6">
                    <motion.div
                        ref={ref6}
                        initial="hidden"
                        animate={animation6}
                        className="subway"
                    >
                        <div className="gsap-opacity flex items-center py-2">
                            <h3 className="font-bold text-[#EEBCBC]">지하철</h3>
                        </div>
                        <div className="gsap-opacity py-4">
                            <p>
                                <strong className="text-[#AC3231]">
                                    2호선
                                </strong>{" "}
                                : 잠실역 8번 출구 (도보 6분)
                            </p>
                            <p>
                                <strong className="text-[#AC3231]">
                                    8호선
                                </strong>{" "}
                                : 잠실역 9번 출구 (도보 1분)
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        ref={ref7}
                        initial="hidden"
                        animate={animation7}
                        data-orientation="horizontal"
                        role="none"
                        className="bg-border gsap-opacity my-2 h-[1px] w-full shrink-0"
                        style={{
                            backgroundColor: "#eba3a3",
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transform: "translate(0px, 0px)",
                            opacity: 1,
                        }}
                    ></motion.div>

                    <motion.div
                        ref={ref8}
                        initial="hidden"
                        animate={animation8}
                        className="bus"
                    >
                        <div className="gsap-opacity flex items-center py-2">
                            <h3 className="font-bold text-[#EEBCBC]">버스</h3>
                        </div>
                        <div className="gsap-opacity py-4">
                            <strong className="text-[#AC3231]">일반버스</strong>
                            <p className="mb-2">
                                16, 30-1, 30-3, 30-5, 32, 70, 100, 101, 116,
                                119, 2002-2
                            </p>
                            <strong className="text-[#AC3231]">간선버스</strong>
                            <p className="mb-2">
                                301, 302, 303, 320, 333, 341, 351, 352, 360, N13
                            </p>
                            <strong className="text-[#AC3231]">지선버스</strong>
                            <p>
                                2311, 2412, 2415, 3216, 3217, 3313, 3314, 3315,
                                3317, 3318, 3319, 3411, 3412, 3413, 3414, 4318,
                                4319
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        ref={ref9}
                        initial="hidden"
                        animate={animation9}
                        data-orientation="horizontal"
                        role="none"
                        className="bg-border gsap-opacity my-2 h-[1px] w-full shrink-0"
                        style={{
                            backgroundColor: "#eba3a3",
                            translate: "none",
                            rotate: "none",
                            scale: "none",
                            transform: "translate(0px, 0px)",
                            opacity: 1,
                        }}
                    ></motion.div>

                    <motion.div
                        ref={ref10}
                        initial="hidden"
                        animate={animation10}
                        className="parking"
                    >
                        <div className="gsap-opacity flex items-center py-2">
                            <h3 className="font-bold text-[#EEBCBC]">주차</h3>
                        </div>
                        <div className="gsap-opacity py-4">
                            <p>건물 주차장 또는 주차요원 안내 / 2시간 무료</p>
                            <p
                                style={{
                                    fontStyle: "oblique",
                                    textDecoration: "underline",
                                }}
                            >
                                <strong>* 이후 추가요금 발생</strong>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
export default Location;
