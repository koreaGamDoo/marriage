'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const Desktop = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const [isMounted, setIsMounted] = useState(false);
    const isDesktop = useMediaQuery({
        minWidth: 769
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return isDesktop ? children : null;
};

export const Mobile = ({ children }: any) => {
    const [isMounted, setIsMounted] = useState(false);
    const isMobile = useMediaQuery({
        maxWidth: 768
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return isMobile ? children : null;
};
