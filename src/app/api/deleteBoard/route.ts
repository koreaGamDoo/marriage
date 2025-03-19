import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const { selectedNo, password } = await req.json();

    try {
        const result = await pool.query(
            "DELETE FROM guestbook WHERE no = $1 AND pw = $2",
            [selectedNo, password],
        );

        // 삭제된 행이 없는 경우 체크
        if (result.rowCount === 0) {
            return NextResponse.json(
                { error: "게시물이 없거나 비밀번호가 일치하지 않습니다." },
                { status: 404 },
            );
        }

        return NextResponse.json(
            { message: "방명록 삭제 성공" },
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
