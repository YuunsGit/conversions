import React, { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useDropzone } from "react-dropzone";

export default function Input({ setFile }) {
  const [error, setError] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (files) => {
      handleUpload(files[0]);
    },
  });

  const handleUpload = async (toUpload) => {
    if (!toUpload || !toUpload.name.endsWith(".pdf")) {
      setError("Uploaded file is not a PDF document.");
      return;
    }

    const fileBuffer = await toUpload.arrayBuffer();
    setFile({
      name: toUpload.name,
      buffer: fileBuffer,
    });

    setError(null);
  }

  return (
    <>
      {error && (
        <p className="mx-auto mb-5 text-center text-red-600">{error}</p>
      )}
      <label className="md:ma-10 text-l mx-auto block h-auto max-w-max cursor-pointer select-none rounded-md bg-lime-500 px-10 py-5 font-semibold text-white hover:bg-lime-600">
        CHOOSE FILE
        <input
          type="file"
          accept="application/pdf"
          className="absolute hidden h-full w-full"
          onChange={(e) => handleUpload(e.target.files[0])}
        />
      </label>
      <span className="my-3 hidden text-center md:block">or</span>
      <div
        {...getRootProps()}
        className="mx-auto hidden max-w-2xl rounded-3xl border-2 border-dashed bg-stone-50 py-36 px-64 hover:bg-stone-100 md:block"
      >
        <input {...getInputProps()} />
        <p className="text-center">
          <span className="text-l font-semibold">Drop file here</span>
          <br />
          <ArrowDownTrayIcon className="mx-auto my-2 h-8 w-8" />
        </p>
      </div>
    </>
  );
}
