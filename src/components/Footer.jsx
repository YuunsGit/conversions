import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { ReactComponent as GithubFilled } from "../img/GitHub.svg";
import { ReactComponent as LinkedinFilled } from "../img/LinkedIn.svg";

export default function Footer() {
  return (
    <>
      <footer className="clear-both flex w-screen flex-col justify-between bg-stone-100 py-6 px-[5%] text-stone-500 md:px-[30%]">
        <div className="mx-auto text-center">
          Made with <HeartIcon className="inline-block h-5 w-5 fill-red-500" />{" "}
          by
          <br />
          <a
            href="https://www.yuuns.tech/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold duration-100 hover:text-stone-700"
          >
            Yunus Emre Kepenek{" "}
            <ArrowTopRightOnSquareIcon className="my-auto inline h-4 w-4" />
          </a>
        </div>
        <hr className="my-6 border-stone-300" />
        <div className="mx-auto flex space-x-2 text-center">
          <a
            href="https://github.com/YuunsGit"
            target="_blank"
            rel="noreferrer"
          >
            <GithubFilled className="h-8 w-8 fill-stone-600 hover:fill-stone-800" />
          </a>
          <a
            href="https://www.linkedin.com/in/yekepenek/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedinFilled className="h-8 w-8 fill-stone-600 hover:fill-stone-800" />
          </a>
        </div>
        <div className="mx-auto text-center">
          This is an{" "}
          <a
            href="https://github.com/YuunsGit/conversions"
            className="z-0 inline-block underline underline-offset-2 hover:text-stone-900"
            target="_blank"
            rel="noreferrer"
          >
            open source
          </a>{" "}
          project.
        </div>
      </footer>
    </>
  );
}
