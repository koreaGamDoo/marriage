import CardContent from "./CardContent";
import AudioPlayer from "./AudioPlayer";
import Head from "next/head";

async function MainPage() {
    return (
        <>
            {/* 웹 */}
            <div>
                <div
                    className="audio-player"
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    {/* 나중에 오디오 연결해 */}
                    <div
                        className="audio-player"
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                            zIndex: 50,
                            position: "fixed",
                            top: 0,
                            right: 0,
                        }}
                    >
                        <AudioPlayer />
                    </div>
                </div>
                <div className="m-auto my-0 hidden w-[400px] px-0 py-[30px] sm:block">
                    <CardContent />
                </div>

                {/* 모바일 */}
                <div className="sm:hidden">
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
                    <CardContent />
                </div>
            </div>
        </>
    );
}
export default MainPage;
