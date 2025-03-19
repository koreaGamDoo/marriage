import { useState } from "react";
import { toast } from "react-hot-toast";

function BoardDelete({
    setModalIsOpen,
    selectedNo,
    refetch,
}: {
    setModalIsOpen: (open: boolean) => void;
    selectedNo: string;
    refetch: () => void;
}) {
    const [password, setPassword] = useState<string>("");

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!password) {
            toast.error("비밀번호를 입력해 주세요.", {
                duration: 800,
                position: "top-center",
                style: {
                    fontSize: "14px",
                    background: "#fff",
                    color: "#333",
                },
                id: "unique-toast",
            });
            return;
        }

        fetch("/api/deleteBoard", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedNo, password }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`서버 에러 발생: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                toast.success("삭제되었습니다.", {
                    duration: 1000,
                    position: "top-center",
                    style: {
                        fontSize: "14px",
                        background: "#fff",
                        color: "#333",
                    },
                    id: "unique-toast",
                });
                setModalIsOpen(false);
                refetch();
            })
            .catch((error) => {
                toast.error("삭제에 실패했습니다. 비밀번호를 확인해주세요.", {
                    duration: 700,
                    position: "top-center",
                    style: {
                        fontSize: "14px",
                        background: "#fff",
                        color: "#333",
                    },
                    id: "unique-toast",
                });
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="survey">
                <div className="survey-contents mt-5 flex h-[70px] flex-col justify-evenly">
                    <span className="text-[15px]">
                        비밀번호 <span style={{ color: "red" }}>*</span>
                    </span>
                    <input
                        className="survey-content-input h-9 w-full rounded-md border border-[#eae7e7] bg-transparent px-2 text-sm leading-9 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.1)]"
                        type="text"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className="survey-button pt-[30px]">
                    <button
                        type="submit"
                        className="mx-auto block rounded-md bg-[#d5c9b2] px-4 py-2.5 text-white shadow-md"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </form>
    );
}

export default BoardDelete;
