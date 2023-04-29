import React, { useState, useEffect } from "react";
import { ReactComponent as Gear } from "../../img/Gear.svg";
import { pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export default function RotationSelector({ fileBuffer, cancel, rotate, degree, setDegree }) {
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function loadPages() {
      const pdfDoc = await pdfjs.getDocument({ data: fileBuffer }).promise;
      const firstPage = await pdfDoc.getPage(1);
      const canvas = document.getElementById("page");
      const viewport = firstPage.getViewport({
        scale: canvas.width / firstPage.getViewport({ scale: 1 }).width,
      });
      canvas.height = viewport.height;
      const render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      firstPage.render(render_context);
    }
    loadPages();
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("page");
    canvas.style.transform = "rotate(" + degree + "deg)";
  }, [degree]);

  const rotateAndSave = () => {
    setProcessing(true);
    rotate();
  };

  return (
    <div className="w-full">
      {processing ? (
        <div className="md:ma-10 mx-auto mt-8 block h-auto max-w-max px-10">
          <Gear className="h-14 w-14" />
        </div>
      ) : (
        <div className="flex sm:flex-row flex-col gap-x-24 justify-center gap-y-4">
          <div className="aspect-square flex justify-center">
            <canvas id="page" className="bg-slate-200 mx-auto max-h-80 p-4 my-auto transition-transform transform-gpu"></canvas>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div
              className="mx-auto p-3 block h-auto max-w-max cursor-pointer select-none rounded-md bg-slate-700 font-semibold text-white hover:bg-slate-800"
              onClick={() => setDegree(degree + 90)}
            >
              <ArrowPathRoundedSquareIcon className="h-8 w-8" />
            </div>
            <div
              className="text-l mx-auto mt-8 block h-auto max-w-max cursor-pointer select-none rounded-md bg-lime-500 px-10 py-5 font-semibold text-white hover:bg-lime-600"
              onClick={rotateAndSave}
            >
              ROTATE & SAVE
            </div>
            <div
              className="mx-auto my-2 block h-auto max-w-max cursor-pointer select-none rounded-md font-semibold text-stone-500 hover:text-stone-700"
              onClick={cancel}
            >
              GO BACK
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
