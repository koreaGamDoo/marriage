"use client";

import useObserver from "@/hook/useObserver";
import { motion } from "framer-motion";
import Image from "next/image";

function Introduce() {
    const { ref: ref1, animation: animation1 } = useObserver(0);
    const { ref: ref2, animation: animation2 } = useObserver(0.1);

    return (
        <>
            <div className="introduceInfo bg-[#f8f8f8]">
                <div className="gsap-div flex h-full min-h-96 flex-col items-center justify-center pb-40">
                    <motion.div
                        ref={ref1}
                        initial="hidden"
                        animate={animation1}
                        className="introduce-title"
                    >
                        <div className="gsap-opacity mb-8 flex justify-center">
                            <p className="gsap-opacity font-['Cafe24Shiningstar'] text-[15vw] tracking-wider sm:text-[60px]">
                                INTRODUCE
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        ref={ref2}
                        initial="hidden"
                        animate={animation2}
                        className="introduceUs flex justify-evenly gap-3"
                    >
                        <div className="jh flex h-[300px] flex-col items-center text-sm">
                            <div className="mb-2.5 h-[130px] w-[130px] overflow-hidden rounded-full bg-[#bdbdbd]">
                                <Image
                                    className="profile object-cover object-[center_-10px]"
                                    src={"/images/introduce_groom.jpg"}
                                    width={130}
                                    height={130}
                                    alt={"Joohan"}
                                />
                            </div>
                            <div className="humanInfo1 mb-2.5 flex h-5 items-center">
                                <span className="text-[#0e6ca5]">
                                    신랑 &nbsp;
                                </span>
                                <span>박주한&nbsp;</span>
                                <Image
                                    className="cursor-pointer"
                                    src="/images/phoneblue.png"
                                    width={10}
                                    height={10}
                                    alt={"Phone"}
                                    onClick={() =>
                                        (document.location.href =
                                            "tel:010-7651-6447")
                                    }
                                />
                            </div>
                            <div className="hashtag mb-2.5 flex flex-col items-center text-xs">
                                <p>#개발자 &nbsp;#ISFJ &nbsp;#섬세한</p>
                                <p>#귀염둥이 &nbsp;#댕집사</p>
                            </div>
                            <div className="detail-introduce flex flex-col items-center">
                                <Image
                                    src="/images/dog.png"
                                    width={30}
                                    height={30}
                                    alt={"Phone"}
                                />
                                <p className="mt-[5px] font-cafe24 text-[15px]">
                                    다정다감한 남편이 되겠습니다
                                </p>
                            </div>
                        </div>
                        <div className="gj flex h-[300px] flex-col items-center text-sm">
                            <div className="mb-2.5 h-[130px] w-[130px] overflow-hidden rounded-full bg-[#bdbdbd]">
                                <Image
                                    className="profile object-cover"
                                    src={"/images/introduce_bride.jpg"}
                                    width={130}
                                    height={130}
                                    alt={"Gyeongju"}
                                />
                            </div>
                            <div className="humanInfo2 mb-2.5 flex h-5 items-center">
                                <span className="text-[#e880ff]">
                                    신부 &nbsp;
                                </span>
                                <span>전경주&nbsp;</span>
                                <Image
                                    className="cursor-pointer"
                                    src="/images/phone.png"
                                    width={10.5}
                                    height={10.5}
                                    alt={"Phone"}
                                    onClick={() =>
                                        (document.location.href =
                                            "tel:010-2146-9601")
                                    }
                                />
                            </div>
                            <div className="hashtag mb-2.5 flex flex-col items-center text-xs">
                                <p>#특수교사 &nbsp;#ISTJ &nbsp;#따뜻한</p>
                                <p>#장난기많은 &nbsp;#냥집사</p>
                            </div>
                            <div className="detail-introduce flex flex-col items-center">
                                <Image
                                    src={"/images/sun.png"}
                                    width={30}
                                    height={30}
                                    alt={"Phone"}
                                />
                                <p className="mt-[5px] font-cafe24 text-[15px]">
                                    햇살같은 아내가 되겠습니다
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
export default Introduce;
