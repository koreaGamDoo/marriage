import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {
        relationship,
        attend,
        name,
        phone,
        companion,
        dinner,
        additional,
        agree,
    } = await req.json();

    try {
        const result = await pool.query(
            "INSERT INTO participant (relationship, attend, name, phone, companion, dinner, additional, agree) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [
                relationship,
                attend,
                name,
                phone,
                companion,
                dinner,
                additional,
                agree,
            ],
        );

        if (result.rows.length === 0) {
            throw new Error("Insert failed");
        }

        return NextResponse.json(
            { message: "참가자 정보가 성공적으로 저장되었습니다." },
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
