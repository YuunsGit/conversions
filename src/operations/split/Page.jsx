import React from "react";
import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Page({ page, selects, setSelects }) {
  const pageNum = page.pageNumber;

  useEffect(() => {
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
  }, [page]);

  const select = () => {
    const newSet = selects;

    if (selects.has(pageNum)) {
      newSet.delete(pageNum);
    } else {
      newSet.add(pageNum);
    }

    setSelects(new Set(newSet));
  };

  return (
    <div
      className={"relative p-2 pb-0 duration-150 ".concat(
        selects.has(pageNum)
          ? "bg-lime-400"
          : "bg-stone-200 hover:bg-stone-300 "
      )}
      onClick={select}
    >
      <CheckCircleIcon
        className={"absolute left-0 right-0 mx-auto h-20 w-20 fill-lime-400 duration-150 ".concat(
          selects.has(pageNum) ? "" : "opacity-0"
        )}
      />
      <canvas className="w-32 md:w-40" id={"page-" + pageNum} />
      <p className="prose prose-stone select-none text-center">{pageNum}</p>
    </div>
  );
}
