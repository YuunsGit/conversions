import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Done() {
  return (
    <div className="text-center text-xl">
      <CheckBadgeIcon className="mx-auto inline h-8 w-10 fill-lime-400" />
      File downloaded successfully.
      <a
        href="/"
        className="md:ma-10 mx-auto my-6 block h-auto max-w-max cursor-pointer select-none rounded-md bg-stone-300 px-6 py-4 font-semibold text-white hover:bg-stone-400"
      >
        GO BACK
      </a>
    </div>
  );
}
