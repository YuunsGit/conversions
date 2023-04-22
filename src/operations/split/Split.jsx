import React, { useRef, useState } from "react";
import Input from "./Input";
import PageSelector from "./PageSelector";
import Done from "./Done";

import { PDFDocument } from "pdf-lib";
import { pdfjs } from "react-pdf/dist/esm/entry.webpack";
import Page from "./Page";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Split() {
  const [file, setFile] = useState();
  const [downloaded, setDownloaded] = useState(false);
  const pages = useRef([]);
  const selects = useRef(new Set());

  const upload = async (uploaded) => {
    const fileBuffer = await uploaded.arrayBuffer();
    const pdfDoc = await pdfjs.getDocument({ data: fileBuffer }).promise;

    const pdfPages = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const pdfPage = await pdfDoc.getPage(i);
      const page = (
        <Page page={pdfPage} pageNum={i} key={i} selects={selects} />
      );
      pdfPages.push(page);
    }
    pages.current = pdfPages;

    setFile({
      name: uploaded.name,
      buffer: fileBuffer,
    });
  };

  const split = async () => {
    const pdfDoc = await PDFDocument.load(file.buffer);

    const toExclude = [...Array(pages.current.length).keys()].filter((el) => {
      return !Array.from(selects.current)
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
    <main className="mx-auto my-24 flex w-screen max-w-7xl flex-col">
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
          pages={pages}
          split={(selects, pageNum) => split(selects, pageNum)}
          selects={selects}
          cancel={() => setFile(null)}
        />
      ) : (
        <Input upload={upload} />
      )}
    </main>
  );
}
