import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, content, password } = await req.json();

    try {
        const result = await pool.query(
            "INSERT INTO guestbook (name, content, pw, created) VALUES ($1, $2, $3, TO_CHAR(NOW(), 'YYYY.MM.DD HH24:MI'))",
            [name, content, password],
        );

        return NextResponse.json(
            { message: "방명록 작성 성공" },
            { status: 200 },
        );
    } catch (err: any) {
        console.error(err);
        return NextResponse.json(
            { error: "Database error", details: err.message },
            { status: 500 },
        );
    }
}
