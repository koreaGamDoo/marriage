import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, content, pw, target } = await req.json();

    try {
        const result = await pool.query(
            "INSERT INTO guestbook (name, content, pw, created, target) VALUES ($1, $2, $3, TO_CHAR(NOW(), 'YYYY.MM.DD HH24:MI'), $4) RETURNING *",
            [name, content, pw, target],
        );

        if (result.rows.length === 0) {
            throw new Error("Insert failed");
        }

        return NextResponse.json(
            { message: "방명록 정보가 성공적으로 저장되었습니다." },
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
