"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";

const CountDown = () => {
    const setDate = useMemo(() => new Date("2025-05-31T16:20:00+0900"), []);
    const [day, setDay] = useState<number>(0);
    const [hour, setHour] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const timeDiff = setDate.getTime() - now.getTime();
            const dis = Math.abs(timeDiff);
            const min1 = 1000 * 60;

            const h = Math.floor(dis / (min1 * 60 * 24));
            const m = Math.floor((dis % (min1 * 60 * 24)) / (min1 * 60));
            const d = Math.floor((dis % (min1 * 60)) / min1);
            const s = Math.floor((dis % min1) / 1000);

            setDay(h);
            setHour(m);
            setMinutes(d);
            setSeconds(s);
        };

        updateCountdown();

        const countdown = setInterval(() => {
            updateCountdown();
        }, 1000);

        return () => clearInterval(countdown);
    }, [setDate]);

    return (
        <div className="d-day-contents flex w-full flex-col">
            <div className="d-day-title mb-5 flex justify-center">
                <p>주한</p>{" "}
                <Image
                    src="/images/heart.png"
                    width={20}
                    height={20}
                    alt={"Heart"}
                />
                <p>
                    {new Date() > setDate ? "경주 결혼한지" : "경주 결혼식까지"}
                </p>
            </div>
            <div className="mx-auto flex h-[100px] w-[100%] flex-row items-center justify-around sm:w-[90%]">
                <div className="flex h-20 w-1/4 flex-col items-center">
                    <div className="count-circle flex h-[55px] w-[55px] items-center justify-center rounded-full bg-[#dea5a4] text-white shadow-[1px_1px_1px_1px_#a7a7a7]">
                        <p>{day}</p>
                    </div>
                    <p className="mt-2.5 text-xs">Days</p>
                </div>
                <div className="flex h-20 w-1/4 flex-col items-center">
                    <div className="count-circle flex h-[55px] w-[55px] items-center justify-center rounded-full bg-[#dea5a4] text-white shadow-[1px_1px_1px_1px_#a7a7a7]">
                        <p>{hour}</p>
                    </div>
                    <p className="mt-2.5 text-xs">Hours</p>
                </div>
                <div className="flex h-20 w-1/4 flex-col items-center">
                    <div className="count-circle flex h-[55px] w-[55px] items-center justify-center rounded-full bg-[#dea5a4] text-white shadow-[1px_1px_1px_1px_#a7a7a7]">
                        <p>{minutes}</p>
                    </div>
                    <p className="mt-2.5 text-xs">Minutes</p>
                </div>
                <div className="flex h-20 w-1/4 flex-col items-center">
                    <div className="count-circle flex h-[55px] w-[55px] items-center justify-center rounded-full bg-[#dea5a4] text-white shadow-[1px_1px_1px_1px_#a7a7a7]">
                        <p>{seconds}</p>
                    </div>
                    <p className="mt-2.5 text-xs">Seconds</p>
                </div>
            </div>
        </div>
    );
};

export default CountDown;
