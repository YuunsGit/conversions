import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Page({ page, pageNum, selects, setSelects }) {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        renderPage();
    }, []);

    const select = () => {
        const newSet = selects;

        setSelected(!newSet.has(pageNum));
        if (newSet.has(pageNum)) {
            newSet.delete(pageNum);
        } else {
            newSet.add(pageNum);
        }

        setSelects(newSet);
    };

    const renderPage = () => {
        const canvas = document.getElementById("page-" + pageNum);
        const viewport = page.getViewport({
            scale: canvas.width / page.getViewport({ scale: 1 }).width,
        });
        canvas.height = viewport.height;
        canvas.parentElement.height = canvas.height + 16;
        const render_context = {
            canvasContext: document
                .getElementById("page-" + pageNum)
                .getContext("2d"),
            viewport: viewport,
        };
        page.render(render_context);
    };

    return (
        <div
            className={"relative p-2 pb-0 duration-100 ".concat(
                selects.has(pageNum)
                    ? "bg-lime-400"
                    : "bg-stone-200 hover:bg-stone-300 "
            )}
            onClick={select}
        >
            <CheckCircleIcon
                className={"absolute h-20 w-20 mx-auto left-0 right-0 fill-lime-400 ".concat(
                    selects.has(pageNum) ? "" : "hidden"
                )}
            />
            <canvas className="w-32 md:w-40" id={"page-" + pageNum} />
            <p className="prose prose-stone text-center select-none">
                {pageNum}
            </p>
        </div>
    );
}
