'use client';

import { useEffect, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const useObserver = (delay: number = 0) => {
    const animation = useAnimation();
    const [hasAnimated, setHasAnimated] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    useEffect(() => {
        // 초기 상태 설정
        if (!hasAnimated) {
            animation.set({
                y: 50,
                opacity: 0,
            });
        }

        if (inView && !hasAnimated) {
            animation.start({
                y: 0, // 최종 위치를 0으로 설정
                opacity: 1,
                transition: {
                    duration: 1.2,
                    delay: delay,
                    ease: [0.25, 0.1, 0.25, 1],
                },
            });
            setHasAnimated(true);
        }
        // else {
        //     animation.start({
        //         y: 50, // 다시 아래로 이동
        //         opacity: 0,
        //         transition: {
        //             duration: 1.2,
        //             ease: [0.42, 0, 1, 1],
        //         },
        //     });
        // }
    }, [animation, inView, hasAnimated]);

    return { ref, animation };
};

export default useObserver;
