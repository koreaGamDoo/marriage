"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

function CommendCreate({
    setModalIsOpen,
    selectedNo,
    refetch,
}: {
    setModalIsOpen: (open: boolean) => void;
    selectedNo: number;
    refetch: () => void;
}) {
    const [content, setContent] = useState<string>("");

    const toastStyle = {
        duration: 800,
        position: "top-center" as const,
        style: {
            fontSize: "14px",
            background: "#fff",
            color: "#333",
        },
        id: "unique-toast",
    };

    const validations = [
        { condition: content === "", message: "방명록 내용을 입력해 주세요." },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const invalidField = validations.find((v) => v.condition);
        if (invalidField) {
            toast.error(invalidField.message, {
                ...toastStyle,
                id: "unique-toast",
            });
            return;
        }

        const loadingToast = toast.loading("전송 중입니다...", {
            ...toastStyle,
            id: "loading-toast",
        });

        fetch("/api/insertCommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "경주한 커플",
                content: content,
                pw: "0317",
                target: selectedNo,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 에러 발생: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                toast.dismiss(loadingToast);
                toast.success("전달되었습니다.", {
                    duration: 2000,
                    position: "top-center",
                    style: {
                        fontSize: "14px",
                        background: "#fff",
                        color: "#333",
                    },
                    id: "unique-toast",
                });
                refetch();
                setModalIsOpen(false);
            })
            .catch((error) => {
                toast.dismiss(loadingToast);
                toast.error("오류가 발생했습니다.", toastStyle);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="commend">
                <div className="commend-contents mt-5 flex h-[200px] flex-col">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 text-[15px]">
                            방명록 내용
                        </span>
                        <span className="mr-[-7px] flex items-center pt-[5px] text-[11px] text-red-500">
                            *
                        </span>
                        <span className="flex items-center text-[11px] text-red-500">
                            필수
                        </span>
                    </div>
                    <textarea
                        className="survey-content-input h-[200px] w-full resize-none rounded-md border border-[#eae7e7] bg-transparent p-2 text-sm leading-5 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.1)]"
                        value={content}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setContent(e.target.value)
                        }
                    ></textarea>
                </div>
            </div>

            <div className="survey-button pt-[30px]">
                <button
                    type="submit"
                    className="mx-auto block rounded-md bg-[#d5c9b2] px-4 py-2.5 text-white shadow-md"
                >
                    전달
                </button>
            </div>
        </form>
    );
}

export default CommendCreate;
