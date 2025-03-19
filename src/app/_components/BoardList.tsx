import { useState, useRef, useEffect } from "react";

function BoardList({ guestbook }: { guestbook: any }) {
    const [expandedItems, setExpandedItems] = useState<number[]>([]);
    const [overflowItems, setOverflowItems] = useState<number[]>([]);
    const [shrinkingItems, setShrinkingItems] = useState<number[]>([]);
    const contentRefs = useRef<{ [key: number]: HTMLParagraphElement | null }>(
        {},
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const newOverflowItems: number[] = [];
            guestbook.forEach((item: any) => {
                const element = contentRefs.current[item.no];
                if (element && element.scrollHeight > element.clientHeight) {
                    newOverflowItems.push(item.no);
                }
            });
            setOverflowItems(newOverflowItems);
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [guestbook, expandedItems]);

    const toggleExpand = (no: number) => {
        if (expandedItems.includes(no)) {
            setShrinkingItems((prev) => [...prev, no]);
            setExpandedItems((prev) => prev.filter((id) => id !== no));
            setTimeout(() => {
                setShrinkingItems((prev) => prev.filter((id) => id !== no));
                setTimeout(() => {
                    const element = contentRefs.current[no];
                    if (
                        element &&
                        element.scrollHeight > element.clientHeight
                    ) {
                        setOverflowItems((prev) =>
                            prev.includes(no) ? prev : [...prev, no],
                        );
                    }
                }, 50);
            }, 300);
        } else {
            setExpandedItems((prev) => [...prev, no]);
        }
    };

    return (
        <div className="relative flex h-[500px] flex-col gap-2 overflow-y-auto scrollbar-none scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thin [&::-webkit-scrollbar]:fixed [&::-webkit-scrollbar]:bottom-0 [&::-webkit-scrollbar]:right-0 [&::-webkit-scrollbar]:top-0 [&::-webkit-scrollbar]:z-[9999] [&::-webkit-scrollbar]:w-[8px]">
            {guestbook.map((item: any) => (
                <div
                    key={item.no}
                    className={`rounded-lg border-[1px] border-[#e9e9e9] p-2 px-[17px] py-[13px] leading-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.10)]`}
                >
                    <div className="flex items-center justify-between">
                        <p className="text-[14px] font-bold">
                            {item.name.length > 15
                                ? `${item.name.slice(0, 15)}...`
                                : item.name}
                        </p>
                        <p className="text-[10px] text-gray-400">
                            {item.created}
                        </p>
                    </div>
                    <div
                        className={`my-[10px] flex items-start overflow-hidden`}
                        style={{
                            maxHeight: expandedItems.includes(item.no)
                                ? "1000px"
                                : "50px",
                            transition: "max-height 300ms ease-in-out",
                        }}
                    >
                        <p
                            ref={(el) => {
                                contentRefs.current[item.no] = el;
                            }}
                            className={`w-full whitespace-pre-wrap break-words text-[14px] ${
                                expandedItems.includes(item.no) ||
                                shrinkingItems.includes(item.no)
                                    ? ""
                                    : "line-clamp-2"
                            }`}
                        >
                            {item.content}
                        </p>
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            onClick={() => toggleExpand(item.no)}
                            className={`text-[12px] text-blue-500 hover:underline ${
                                expandedItems.includes(item.no) ||
                                overflowItems.includes(item.no)
                                    ? "opacity-100"
                                    : "pointer-events-none opacity-0"
                            }`}
                        >
                            {expandedItems.includes(item.no)
                                ? "접기"
                                : "전체보기"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BoardList;
