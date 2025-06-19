import CountDown from "@/app/_components/CountDownFolder/CountDown";

function Calendar() {
    return (
        <>
            <div className="calendar-content w-9/10 mx-auto mb-8 mt-3">
                <div className="calendar-day flex justify-evenly">
                    <div className="flex h-10 w-10 items-center justify-center text-red-500">
                        일
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        월
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        화
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        수
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        목
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        금
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        토
                    </div>
                </div>
                <div className="calendar-count flex justify-evenly">
                    <div className="flex h-10 w-10 items-center justify-center">
                        {" "}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        {" "}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        {" "}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        {" "}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        {" "}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        1
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        2
                    </div>
                </div>
                <div className="calendar-count flex justify-evenly">
                    <div className="flex h-10 w-10 items-center justify-center text-red-500">
                        3
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        4
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        5
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        6
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        7
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        8
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="common-calandar-date relative flex h-10 w-10 items-center justify-center">
                            <span className="dday relative z-10 text-white">
                                9
                            </span>
                            <span className="absolute h-8 w-8 rounded-full bg-[#dea5a4]"></span>
                        </div>
                        <p className="calendar-time absolute pt-[35px] text-[10px] font-[600] sm:mr-[5px]">
                            오후 4:20
                        </p>
                    </div>
                </div>
                <div className="calendar-count flex justify-evenly">
                    <div className="flex h-10 w-10 items-center justify-center text-red-500">
                        10
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        11
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        12
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        13
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        14
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        15
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        16
                    </div>
                </div>
                <div className="calendar-count flex justify-evenly">
                    <div className="flex h-10 w-10 items-center justify-center text-red-500">
                        17
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        18
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        19
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        20
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        21
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        22
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        23
                    </div>
                </div>
                <div className="calendar-count flex justify-evenly">
                    <div className="flex h-10 w-10 items-center justify-center text-red-500">
                        24
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        25
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        26
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        27
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        28
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        29
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        30
                    </div>
                </div>
                <div className="calendar-count flex justify-evenly">
                    <div className="flex h-10 w-10 items-center justify-center text-red-500">
                        31
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        {" "}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        {" "}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        {" "}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        {" "}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        {" "}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center">
                        {" "}
                    </div>
                </div>
            </div>

            <div
                data-orientation="horizontal"
                role="none"
                className="bg-border gsap-opacity my-2 h-[1px] w-full shrink-0"
                style={{
                    backgroundColor: "lightgrey",
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                }}
            ></div>

            <div className="d-day-div mt-8">
                <CountDown />
            </div>
        </>
    );
}

export default Calendar;
