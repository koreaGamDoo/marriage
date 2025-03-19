/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
import "@/styles/Global.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "5월 31일 (토) 오후 16시 20분",
    description: "잠실 더컨벤션 / 1F 그랜드볼룸",
    icons: {
        icon: "/images/marriage.png",
    },
    openGraph: {
        images: [
            {
                // url: "https://github.com/parkjoohan/gjh_marriage/blob/master/public/images/metaImage.png?raw=true",
                url: "https://github.com/parkjoohan/gjh_marriage/blob/master/public/images/metaImage2.jpg?raw=true",
                width: 1200,
                height: 1800,
            },
        ],
    },
    colorScheme: "only light",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className="bg-[rgb(252,221,225)] dark:bg-[rgb(252,221,225)] dark:text-black">
                <Suspense>
                    <ThemeProvider forcedTheme="light" attribute="class">
                        {children}
                    </ThemeProvider>
                    <Toaster position="top-center" />
                </Suspense>

                <script src="https://cdn.tailwindcss.com"></script>
                <script
                    defer
                    src="https://developers.kakao.com/sdk/js/kakao.min.js"
                ></script>
                <script
                    type="text/javascript"
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appKey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer`}
                />
            </body>
        </html>
    );
}
