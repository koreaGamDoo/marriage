import { useState } from "react";
import { toast } from "react-hot-toast";

function BoardCreate({
    setModalIsOpen,
    refetch,
}: {
    setModalIsOpen: (open: boolean) => void;
    refetch: () => void;
}) {
    const [name, setName] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
        { condition: name === "", message: "성함 또는 별명을 입력해 주세요." },
        { condition: content === "", message: "방명록 내용을 입력해 주세요." },
        { condition: password === "", message: "비밀번호를 입력해 주세요." },
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

        fetch("/api/insertBoard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, content, password }),
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

                // Discord 알림 전송
                fetch("/api/sendNotiBoard", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: `새로운 방명록이 작성되었습니다!\n\n[작성자]\n${name}\n\n[내용]\n${content}\n\n\n\n\n\n****************************`,
                    }),
                }).catch((error) => {
                    console.error("Discord 알림 전송 실패:", error);
                });
            })
            .catch((error) => {
                toast.dismiss(loadingToast);
                toast.error("오류가 발생했습니다.", toastStyle);
            });
    };
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPassword(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="survey">
                <div className="survey-contents mt-5 flex h-[70px] flex-col">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 text-[15px]">
                            성함 또는 별명
                        </span>
                        <span className="mr-[-7px] flex items-center pt-[5px] text-[11px] text-red-500">
                            *
                        </span>
                        <span className="flex items-center text-[11px] text-red-500">
                            필수
                        </span>
                    </div>
                    <input
                        className="survey-content-input h-9 w-full rounded-md border border-[#eae7e7] bg-transparent px-2 text-sm leading-9 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.1)] placeholder:text-[11px] sm:placeholder:text-[14px]"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="부부가 예상할 수 있는 별명으로 부탁드려요!"
                    />
                </div>

                <div className="survey-contents mt-5 flex h-[200px] flex-col">
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

                <div className="survey-contents mt-5 flex h-[70px] flex-col">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 text-[15px]">
                            비밀번호
                        </span>
                        <span className="mr-[-7px] flex items-center pt-[5px] text-[11px] text-red-500">
                            *
                        </span>
                        <span className="flex items-center text-[11px] text-red-500">
                            필수
                        </span>
                    </div>
                    <input
                        className="survey-content-input h-9 w-full rounded-md border border-[#eae7e7] bg-transparent px-2 text-sm leading-9 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.1)] placeholder:text-[11px] sm:placeholder:text-[14px]"
                        type="text"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="방명록 삭제를 위한 비밀번호입니다."
                    />
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

export default BoardCreate;
