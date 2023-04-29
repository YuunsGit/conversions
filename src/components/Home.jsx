import React from "react";
import { ReactComponent as Exclude } from "../img/Exclude.svg";
import { Link } from "react-router-dom";

import {
  Square2StackIcon,
  BookmarkIcon,
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

import { LockClosedIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <main className="mx-auto my-20 flex w-screen max-w-7xl flex-col space-y-20">
      <div className="space-between mx-auto flex flex-col justify-center text-center text-5xl font-extrabold text-stone-900 md:flex-row md:space-x-5 md:text-left md:text-6xl">
        <span className="block md:hidden">Edit PDFs,</span>
        <Exclude className="mx-auto h-32 w-44 md:h-72 md:w-72" />
        <span className="my-auto hidden md:block">
          Edit PDFs,
          <br />
          <u>anywhere.</u>
        </span>
        <span className="block md:hidden">anywhere.</span>
      </div>
      <div className="prose prose-stone mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2">
        <Link
          to="/split"
          className="w-72 rounded-xl bg-stone-100 py-5 px-7 no-underline hover:bg-stone-200 lg:w-96"
        >
          <h1>
            Split <Square2StackIcon className="inline-block h-8 w-8" />
          </h1>
          <p>
            Splits the PDF of multiple pages into a new PDF from selected pages.
          </p>
        </Link>
        <Link
          to="/rotate"
          className="w-72 rounded-xl bg-stone-100 py-5 px-7 no-underline hover:bg-stone-200 lg:w-96"
        >
          <h1>
            Rotate{" "}
            <ArrowPathRoundedSquareIcon className="inline-block h-8 w-8" />
          </h1>
          <p>
            Rotate allows all pages in a document to be rotated in a given
            direction.
          </p>
        </Link>
        <Link
          to="/"
          className="relative w-72 rounded-xl bg-stone-100 py-5 px-7 no-underline hover:bg-stone-200 lg:w-96"
        >
          <h1 className="text-gray-500 blur-sm">
            Stamp <BookmarkIcon className="inline-block h-8 w-8" />
          </h1>
          <p className="text-gray-500 blur-sm">
            Creates text watermark stamps to your PDF documents.
          </p>
          <LockClosedIcon className="absolute left-0 right-0 top-0 bottom-0 m-auto w-1/4" />
        </Link>
        <Link
          to="/"
          className="relative w-72 rounded-xl bg-stone-100 py-5 px-7 no-underline hover:bg-stone-200 lg:w-96"
        >
          <h1 className="text-gray-500 blur-sm">
            Convert <ArrowsRightLeftIcon className="inline-block h-8 w-8" />
          </h1>
          <p className="text-gray-500 blur-sm">
            Converts a file into PDF or any PDF file to another file type.
          </p>
          <LockClosedIcon className="absolute left-0 right-0 top-0 bottom-0 m-auto w-1/4" />
        </Link>
      </div>
      <div className="prose prose-stone mx-auto max-w-7xl">
        <h2>More tools soon…</h2>
      </div>
    </main>
  );
}
