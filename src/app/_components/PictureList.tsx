import Image from "next/image";
import { useState } from "react";

function PictureList({ images }: { images: string[] }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
    const selectedImage =
        selectedImageIndex >= 0 ? images[selectedImageIndex] : null;
    const [isLoading, setIsLoading] = useState(true);

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) =>
            prev > 0 ? prev - 1 : images.length - 1,
        );
        setIsLoading(true);
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) =>
            prev < images.length - 1 ? prev + 1 : 0,
        );
        setIsLoading(true);
    };

    return (
        <>
            <div className="mt-3 flex flex-col justify-evenly">
                <div className="grid grid-cols-3 gap-1 sm:grid-cols-3 sm:gap-1">
                    {images.map((imageUrl, index) => (
                        <div
                            key={index}
                            className="relative aspect-square cursor-pointer"
                            onClick={() => setSelectedImageIndex(index)}
                        >
                            <Image
                                src={imageUrl}
                                alt={`갤러리 이미지 ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="rounded-lg object-cover"
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,..."
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 모달 */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                    onClick={() => setSelectedImageIndex(-1)}
                >
                    {/* 닫기 버튼 */}
                    <button
                        className="absolute right-4 top-4 z-50 rounded-full bg-white/25 p-2 text-white hover:bg-white/40"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex(-1);
                            setIsLoading(true);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <div className="flex h-[85vh] w-[vw] items-end">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-white" />
                            </div>
                        )}
                        <Image
                            src={selectedImage}
                            alt="확대된 이미지"
                            fill
                            className="object-contain"
                            quality={100}
                            onLoadingComplete={() => setIsLoading(false)}
                            onLoad={() => setIsLoading(false)}
                        />
                        {/* 이전 버튼 */}
                        <button
                            className="absolute left-4 z-50 rounded-full bg-white/25 p-2 text-white hover:bg-white/40"
                            onClick={handlePrevImage}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        {/* 다음 버튼 */}
                        <button
                            className="absolute right-4 z-50 rounded-full bg-white/25 p-2 text-white hover:bg-white/40"
                            onClick={handleNextImage}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default PictureList;
