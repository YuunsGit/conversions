import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useDropzone } from "react-dropzone";

export default function Input(props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (files) => {
      props.selectPages(files[0]);
    },
  });

  return (
    <>
      <label className="block mx-auto bg-lime-500 rounded-md px-10 py-5 max-w-max md:ma-10 h-auto text-white font-semibold text-l select-none hover:bg-lime-600 cursor-pointer">
        CHOOSE FILE
        <input
          type="file"
          accept="application/pdf"
          className="hidden absolute w-full h-full"
          onChange={(e) => props.selectPages(e.target.files[0])}
        />
      </label>
      <span className="hidden text-center my-3 md:block">or</span>
      <div
        {...getRootProps()}
        className="hidden md:block bg-stone-50 mx-auto max-w-2xl py-36 px-64 rounded-3xl border-2 border-dashed hover:bg-stone-100"
      >
        <input {...getInputProps()} />
        <p className="text-center">
          <span className="text-l font-semibold">Drop file here</span>
          <br />
          <ArrowDownTrayIcon className="h-8 w-8 mx-auto my-2" />
        </p>
      </div>
    </>
  );
}
