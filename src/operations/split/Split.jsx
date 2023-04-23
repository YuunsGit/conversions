import React, { useRef, useState } from "react";
import Input from "./Input";
import PageSelector from "./PageSelector";
import Done from "./Done";

import { PDFDocument } from "pdf-lib";
import { pdfjs } from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Split() {
  const [file, setFile] = useState();
  const [downloaded, setDownloaded] = useState(false);
  const [selects, setSelects] = useState(new Set());
  const pageCount = useRef(0);

  const upload = async (uploaded) => {
    const fileBuffer = await uploaded.arrayBuffer();

    setFile({
      name: uploaded.name,
      buffer: fileBuffer,
    });
  };

  const split = async () => {
    const pdfDoc = await PDFDocument.load(file.buffer);

    const toExclude = [...Array(pageCount).keys()].filter((el) => {
      return !Array.from(selects)
        .map((i) => i - 1)
        .includes(el);
    });

    for (let page of toExclude.reverse()) {
      pdfDoc.removePage(page);
    }

    const newBytes = await pdfDoc.save();

    const blob = new Blob([newBytes]);
    const href = URL.createObjectURL(blob);

    const a = Object.assign(document.createElement("a"), {
      href,
      style: "display: none",
      download: file.name.replace(".pdf", "") + "_split.pdf",
    });
    document.body.appendChild(a);

    a.click();
    URL.revokeObjectURL(href);
    a.remove();

    setDownloaded(true);
  };

  return (
    <main className="mx-auto my-24 flex min-h-screen w-screen max-w-7xl flex-col">
      <div className="prose prose-stone mx-12 md:mx-auto">
        <h1 className="text-center text-6xl">Split</h1>
        <p className="text-center text-xl md:mx-12">
          Splits the PDF of multiple pages into a new PDF from selected pages.
        </p>
      </div>
      <hr className="mx-auto my-14 w-[70%]" />
      {downloaded ? (
        <Done />
      ) : file ? (
        <PageSelector
          fileBuffer={file.buffer}
          split={(selects, pageNum) => split(selects, pageNum)}
          selects={selects}
          cancel={() => setFile(null)}
          pageCount={pageCount}
          setSelects={(pages) => setSelects(pages)}
        />
      ) : (
        <Input upload={upload} />
      )}
    </main>
  );
}
