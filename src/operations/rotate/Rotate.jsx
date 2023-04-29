import React, { useState } from "react";
import Input from "../../components/Input";
import Done from "../../components/Done";

import { PDFDocument, degrees } from "pdf-lib";
import { pdfjs } from "react-pdf/dist/esm/entry.webpack";
import RotationSelector from "./RotationSelector";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Rotate() {
  const [file, setFile] = useState();
  const [degree, setDegree] = useState(0);
  const [downloaded, setDownloaded] = useState(false);

  const rotate = async () => {
    const pdfDoc = await PDFDocument.load(file.buffer);

    for (let page of pdfDoc.getPages()) {
      page.setRotation(degrees(degree % 360));
    }

    const newBytes = await pdfDoc.save();
    const blob = new Blob([newBytes]);
    const href = URL.createObjectURL(blob);

    const a = Object.assign(document.createElement("a"), {
      href,
      style: "display: none",
      download: file.name.replace(".pdf", "") + "_rotate.pdf",
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
        <h1 className="text-center text-6xl">Rotate</h1>
        <p className="text-center text-xl md:mx-12">
          Rotate allows all pages in a document to be rotated in a given
          direction.
        </p>
      </div>
      <hr className="mx-auto my-14 w-[70%]" />
      {downloaded ? (
        <Done />
      ) : file ? (
        <RotationSelector fileBuffer={file.buffer} degree={degree} setDegree={(d) => setDegree(d)} rotate={rotate} cancel={() => setFile(null)} />
      ) : (
        <Input setFile={(file) => setFile(file)} />
      )}
    </main>
  );
}
