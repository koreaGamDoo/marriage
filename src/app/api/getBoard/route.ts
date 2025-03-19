import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await pool.query(
            "SELECT * FROM guestbook ORDER BY no DESC",
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { message: "방명록에 작성된 글이 없습니다.", data: [] },
                { status: 200 },
            );
        }

        return NextResponse.json(
            {
                message: "방명록 정보가 성공적으로 조회되었습니다.",
                data: result.rows,
            },
            { status: 200 },
        );
    } catch (err: any) {
        console.error(err);
        return NextResponse.json(
            { error: "Database error", details: err },
            { status: 500 },
        );
    }
}
