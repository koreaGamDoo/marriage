"use server";

import MainPage from "@/app/_components/MainPage";
import "@/app/page.css";
import Head from "next/head";

export default async function Home() {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="color-scheme" content="light only" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
                />
            </Head>
            <MainPage />
        </>
    );
}
