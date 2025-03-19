import { NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL_BOARD = process.env.DISCORD_WEBHOOK_URL_BOARD!;

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch(DISCORD_WEBHOOK_URL_BOARD, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Discord webhook 전송 실패");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Discord webhook 에러:", error);
        return NextResponse.json({ error: "알림 전송 실패" }, { status: 500 });
    }
}
