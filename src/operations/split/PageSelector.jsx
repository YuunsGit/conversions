import React, { useState } from "react";
import { ReactComponent as Gear } from "../../img/Gear.svg";
import { pdfjs } from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PageSelector({ selects, pages, split, cancel }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState();

  const splitAndSave = () => {
    if (selects.current.size === 0) {
      setError("You must select at least one page.");
      return;
    }
    setProcessing(true);
    split();
  };

  return (
    <>
      <h2 className="prose prose-stone mx-auto mb-6 text-center text-xl">
        Select pages to extract:
      </h2>
      <div
        id="page-container"
        className="mx-auto grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6"
      >
        {pages.current}
      </div>
      {processing ? (
        <div className="md:ma-10 mx-auto mt-8 block h-auto max-w-max px-10">
          <Gear className="h-14 w-14" />
        </div>
      ) : (
        <div
          className="md:ma-10 text-l mx-auto mt-8 block h-auto max-w-max cursor-pointer select-none rounded-md bg-lime-500 px-10 py-5 font-semibold text-white hover:bg-lime-600"
          onClick={splitAndSave}
        >
          SPLIT & SAVE
        </div>
      )}
      <div
        onClick={() => cancel()}
        className="md:ma-10 mx-auto my-6 block h-auto max-w-max cursor-pointer select-none rounded-md font-semibold text-stone-500 hover:text-stone-700"
      >
        GO BACK
      </div>
      {error && (
        <p className="mx-auto mb-5 text-center text-red-600">{error}</p>
      )}
    </>
  );
}
