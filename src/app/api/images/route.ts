import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export async function GET() {
    const directory = path.join(process.cwd(), "public/images/marriage");

    try {
        const filenames = fs.readdirSync(directory);
        const imageFiles = filenames.filter(
            (file) =>
                file.endsWith(".png") ||
                file.endsWith(".jpg") ||
                file.endsWith(".jpeg"),
        );

        // 각 이미지의 메타데이터를 비동기적으로 가져옵니다
        const imagesWithDimensions = await Promise.all(
            imageFiles.map(async (filename) => {
                const imagePath = path.join(directory, filename);
                const metadata = await sharp(imagePath).metadata();
                return {
                    filename,
                    width: metadata.width,
                    height: metadata.height,
                };
            }),
        );

        return NextResponse.json({ images: imagesWithDimensions });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to read directory" },
            { status: 500 },
        );
    }
}
