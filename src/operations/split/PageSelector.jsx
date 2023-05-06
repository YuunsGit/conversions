import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Gear } from "../../img/Gear.svg";
import { pdfjs } from "react-pdf/dist/esm/entry.webpack";
import Page from "./Page";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PageSelector({
  fileBuffer,
  selects,
  split,
  cancel,
  pageCount,
  setSelects,
}) {
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    async function loadPages() {
      const pdfDoc = await pdfjs.getDocument({ data: fileBuffer }).promise;
      pageCount.current = pdfDoc.numPages;

      const pdfPages = [];
      for (let i = 1; i <= pageCount.current; i++) {
        const pdfPage = await pdfDoc.getPage(i);
        pdfPages.push(pdfPage);
      }
      setPages(pdfPages);
      setProcessing(false);
    }
    loadPages();
  }, []);

  const splitAndSave = () => {
    if (selects.size === 0) {
      setError("You must select at least one page.");
      return;
    }
    setProcessing(true);
    split();
  };

  const selectAll = () => {
    for (let i = 0; i < pageCount.current + 1; i++) {
      const newSet = selects;

      if (selects.has(i)) {
        newSet.delete(i);
      } else {
        newSet.add(i);
      }

      setSelects(new Set(newSet));
    }
  };

  return (
    <div className="mx-auto">
      {processing ? (
        <Gear className="h-14 w-14" />
      ) : (
        <>
          <div className="mb-4 flex flex-col justify-between md:flex-row">
            <h2 className="prose prose-stone my-auto mb-6 text-center text-xl md:mb-0 md:text-left">
              Select pages to extract:
            </h2>
            <button
              onClick={selectAll}
              className="my-auto rounded-md bg-slate-800 px-5 py-2 text-white hover:bg-slate-700"
            >
              Select all
            </button>
          </div>
          <div
            id="page-container"
            className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6"
          >
            {pages.map((page) => (
              <Page
                page={page}
                key={page.pageNumber}
                selects={selects}
                setSelects={(pages) => setSelects(pages)}
              />
            ))}
          </div>
          <div
            className="md:ma-10 text-l mx-auto mt-8 block h-auto max-w-max cursor-pointer select-none rounded-md bg-lime-500 px-10 py-5 font-semibold text-white hover:bg-lime-600"
            onClick={splitAndSave}
          >
            SPLIT & SAVE
          </div>
          <div
            onClick={cancel}
            className="md:ma-10 mx-auto my-6 block h-auto max-w-max cursor-pointer select-none rounded-md font-semibold text-stone-500 hover:text-stone-700"
          >
            GO BACK
          </div>
          {error && (
            <p className="mx-auto mb-5 text-center text-red-600">{error}</p>
          )}
        </>
      )}
    </div>
  );
}
