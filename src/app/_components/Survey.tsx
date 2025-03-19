import { useState } from "react";
import { toast } from "react-hot-toast";

declare global {
    interface Window {
        Kakao: any;
    }
}

function Survey({
    setModalIsOpen,
}: {
    setModalIsOpen: (open: boolean) => void;
}) {
    const [relationship, setRelationship] = useState<string>("");
    const [attend, setAttend] = useState<boolean | null>(null);
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [companion, setCompanion] = useState<string>("");
    const [dinner, setDinner] = useState<boolean | null>(null);
    const [additional, setAdditional] = useState<string>("");
    const [agree, setAgree] = useState<boolean | null>(null);

    const toastStyle = {
        duration: 2000,
        position: "top-center" as const,
        style: {
            fontSize: "14px",
            background: "#fff",
            color: "#333",
        },
        id: "unique-toast",
    };

    const validations = [
        {
            condition: relationship === "",
            message: "어느 측 하객인지 선택해 주세요.",
        },
        { condition: attend === null, message: "참석 여부를 선택해 주세요." },
        { condition: name === "", message: "성함을 입력해 주세요." },
        { condition: phone === "", message: "연락처를 입력해 주세요." },
        { condition: companion === "", message: "동행인원을 입력해 주세요." },
        { condition: dinner === null, message: "식사 여부를 선택해 주세요." },
        {
            condition: agree === null,
            message: "개인정보 수집 및 활용에 동의해 주세요.",
        },
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

        try {
            const res = await fetch("/api/insertParticipant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    relationship,
                    attend,
                    name,
                    phone,
                    companion,
                    dinner,
                    additional,
                    agree,
                }),
            });

            if (!res.ok) {
                throw new Error(`서버 에러 발생: ${res.status}`);
            }

            toast.dismiss(loadingToast);
            toast.success("전달되었습니다.", toastStyle);
            setModalIsOpen(false);

            // Discord 알림 전송
            fetch("/api/sendNotiParticipant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: `새로운 참석 여부가 등록되었습니다!\n\n[참석자]\n${name}\n\n[하객 관계]\n${relationship === "groom" ? "신랑" : "신부"}\n\n[참석 여부]\n${attend ? "참석" : "불참석"}\n\n[동행인원]\n${companion}\n\n[저녁 참석 여부]\n${dinner ? "가능" : "불가능"}\n\n[추가 전달 사항]\n${additional}\n\n\n\n\n****************************`,
                }),
            }).catch((error) => {
                console.error("Discord 알림 전송 실패:", error);
            });
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error("오류가 발생했습니다.", toastStyle);
        }
    };

    const handleRelationshipChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRelationship(event.target.value);
    };
    const handleAttendChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAttend(event.target.value === "attendY");
    };
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };
    const handleCompanionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCompanion(event.target.value);
    };
    const handleDinnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDinner(event.target.value === "dinnerY");
    };
    const handleAdditionalChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setAdditional(event.target.value);
    };
    const handleAgreeChange = () => {
        setAgree((prevAgree) => (prevAgree === true ? false : true));
    };

    const conditions =
        "참석여부 전달을 위한 개인정보 수집 및 이용에 동의해 주세요.\n· 제공 받는 자 : 모바일 청첩장 주문자 (신랑, 신부측)\n· 이용 목적 : 행사 참석여부 확인\n· 제공 항목 : 성함, 대표 연락처, 동행인원, 식사여부 중 제공받는 정보에 한함\n· 보유 기간 : 모바일 청첩장 만료시까지\n* 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의 거부 시 참석여부 서비스 이용이 불가합니다.";

    return (
        <form onSubmit={handleSubmit}>
            <div className="survey">
                <div className="survey-contents mt-3 flex h-[70px] flex-col justify-evenly">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 text-[15px]">
                            어느 측 하객이신가요?
                        </span>
                        <span className="mr-[-7px] flex items-center pt-[5px] text-[11px] text-red-500">
                            *
                        </span>
                        <span className="flex items-center text-[11px] text-red-500">
                            필수
                        </span>
                    </div>
                    <div className="survey-content flex rounded-md shadow-md">
                        <input
                            className="peer/groom hidden"
                            type="radio"
                            value="groom"
                            id="groomValue"
                            checked={relationship === "groom"}
                            onChange={handleRelationshipChange}
                        />
                        <label
                            htmlFor="groomValue"
                            className="h-9 flex-1 rounded-l-md border border-[#eae7e7] text-center text-sm font-normal leading-9 text-gray-500 transition-all duration-200 peer-checked/groom:border-[#d5c9b2] peer-checked/groom:text-[#2d1f1f] peer-checked/groom:shadow-[inset_0_0_3px_#2d1f1f]"
                        >
                            신랑
                        </label>
                        <input
                            className="peer/bride hidden"
                            type="radio"
                            value="bride"
                            id="brideValue"
                            checked={relationship === "bride"}
                            onChange={handleRelationshipChange}
                        />
                        <label
                            htmlFor="brideValue"
                            className="h-9 flex-1 rounded-r-md border border-[#eae7e7] text-center text-sm font-normal leading-9 text-gray-500 transition-all duration-200 peer-checked/bride:border-[#d5c9b2] peer-checked/bride:text-[#2d1f1f] peer-checked/bride:shadow-[inset_0_0_3px_#2d1f1f]"
                        >
                            신부
                        </label>
                    </div>
                </div>

                <div className="survey-contents mt-3 flex h-[70px] flex-col justify-evenly">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 text-[15px]">
                            참석 여부
                        </span>
                        <span className="mr-[-7px] flex items-center pt-[5px] text-[11px] text-red-500">
                            *
                        </span>
                        <span className="flex items-center text-[11px] text-red-500">
                            필수
                        </span>
                    </div>
                    <div className="survey-content flex rounded-md shadow-md">
                        <input
                            className="peer/attend-y hidden"
                            type="radio"
                            value="attendY"
                            id="attendYValue"
                            checked={attend === true}
                            onChange={handleAttendChange}
                        />
                        <label
                            htmlFor="attendYValue"
                            className="h-9 flex-1 rounded-l-md border border-[#eae7e7] text-center text-sm font-normal leading-9 text-gray-500 transition-all duration-200 peer-checked/attend-y:border-[#d5c9b2] peer-checked/attend-y:text-[#2d1f1f] peer-checked/attend-y:shadow-[inset_0_0_3px_#2d1f1f]"
                        >
                            참석
                        </label>
                        <input
                            className="peer/attend-n hidden"
                            type="radio"
                            value="attendN"
                            id="attendNValue"
                            checked={attend === false}
                            onChange={handleAttendChange}
                        />
                        <label
                            htmlFor="attendNValue"
                            className="h-9 flex-1 rounded-r-md border border-[#eae7e7] text-center text-sm font-normal leading-9 text-gray-500 transition-all duration-200 peer-checked/attend-n:border-[#d5c9b2] peer-checked/attend-n:text-[#2d1f1f] peer-checked/attend-n:shadow-[inset_0_0_3px_#2d1f1f]"
                        >
                            불참석
                        </label>
                    </div>
                </div>

                <div className="survey-contents mt-3 flex h-[70px] flex-col justify-evenly">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 text-[15px]">
                            성함
                        </span>
                        <span className="mr-[-7px] flex items-center pt-[5px] text-[11px] text-red-500">
                            *
                        </span>
                        <span className="flex items-center text-[11px] text-red-500">
                            필수
                        </span>
                    </div>
                    <input
                        className="survey-content-input h-9 w-full rounded-md border border-[#eae7e7] bg-transparent px-2 text-sm leading-9 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.1)]"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>

                <div className="survey-contents mt-3 flex h-[70px] flex-col justify-evenly">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 text-[15px]">
                            대표 연락처
                        </span>
                        <span className="mr-[-7px] flex items-center pt-[5px] text-[11px] text-red-500">
                            *
                        </span>
                        <span className="flex items-center text-[11px] text-red-500">
                            필수
                        </span>
                    </div>
                    <input
                        className="survey-content-input h-9 w-full rounded-md border border-[#eae7e7] bg-transparent px-2 text-sm leading-9 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.1)]"
                        type="text"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>

                <div className="survey-contents mt-3 flex h-[70px] flex-col justify-evenly">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 text-[15px]">
                            동행인원
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
                        value={companion}
                        onChange={handleCompanionChange}
                        placeholder={"본인 포함 총 인원"}
                    />
                </div>

                <div className="survey-contents mt-3 flex h-[70px] flex-col justify-evenly">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 text-[15px]">
                            식사 여부
                        </span>
                        <span className="mr-[-7px] flex items-center pt-[5px] text-[11px] text-red-500">
                            *
                        </span>
                        <span className="flex items-center text-[11px] text-red-500">
                            필수
                        </span>
                    </div>
                    <div className="survey-content flex rounded-md shadow-md">
                        <input
                            className="peer/dinner-y hidden"
                            type="radio"
                            value="dinnerY"
                            id="dinnerYValue"
                            checked={dinner === true}
                            onChange={handleDinnerChange}
                        />
                        <label
                            htmlFor="dinnerYValue"
                            className="h-9 flex-1 rounded-l-md border border-[#eae7e7] text-center text-sm font-normal leading-9 text-gray-500 transition-all duration-200 peer-checked/dinner-y:border-[#d5c9b2] peer-checked/dinner-y:text-[#2d1f1f] peer-checked/dinner-y:shadow-[inset_0_0_3px_#2d1f1f]"
                        >
                            가능
                        </label>
                        <input
                            className="peer/dinner-n hidden"
                            type="radio"
                            value="dinnerN"
                            id="dinnerNValue"
                            checked={dinner === false}
                            onChange={handleDinnerChange}
                        />
                        <label
                            htmlFor="dinnerNValue"
                            className="h-9 flex-1 rounded-r-md border border-[#eae7e7] text-center text-sm font-normal leading-9 text-gray-500 transition-all duration-200 peer-checked/dinner-n:border-[#d5c9b2] peer-checked/dinner-n:text-[#2d1f1f] peer-checked/dinner-n:shadow-[inset_0_0_3px_#2d1f1f]"
                        >
                            불가 (답례품 수령)
                        </label>
                    </div>
                </div>

                <div className="survey-contents mt-3 flex h-[100px] flex-col justify-evenly">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 text-[15px]">
                            추가 전달 사항
                        </span>
                    </div>
                    <textarea
                        className="survey-content-input h-[100px] w-full rounded-md border border-[#eae7e7] bg-transparent p-2 text-sm leading-5 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.1)] placeholder:text-[11px] sm:placeholder:text-[14px]"
                        value={additional}
                        onChange={handleAdditionalChange}
                        placeholder={"전달하실 내용을 입력해 주세요"}
                    />
                </div>

                <div className="survey-contents mt-3 flex h-[130px] flex-col justify-evenly">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 text-[15px]">
                            개인정보 수집 및 활용 동의
                        </span>
                        <span className="mr-[-7px] flex items-center pt-[5px] text-[11px] text-red-500">
                            *
                        </span>
                        <span className="flex items-center text-[11px] text-red-500">
                            필수
                        </span>
                    </div>
                    <textarea
                        className="survey-content-input h-[130px] w-full resize-none rounded-md border border-[#eae7e7] bg-transparent px-2 text-[11px] leading-4 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.1)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
                        value={conditions}
                        readOnly
                    />
                    <div>
                        <input
                            className="ml-1 h-[10px] w-[10px]"
                            type="checkbox"
                            value="agreeY"
                            id="agreeYValue"
                            checked={agree === true}
                            onChange={handleAgreeChange}
                        />
                        <label
                            className="ml-2.5 text-[12px]"
                            htmlFor="agreeYValue"
                        >
                            개인정보 수집 및 활용 동의
                        </label>
                    </div>
                </div>
            </div>

            <div className="survey-button pt-[30px]">
                <button
                    type="submit"
                    className="mx-auto flex h-[35px] w-[80px] cursor-pointer items-center justify-center rounded bg-[grey] text-center shadow-md hover:opacity-90"
                >
                    <p className="text-[14px] text-white">전달</p>
                </button>
            </div>
        </form>
    );
}

export default Survey;
