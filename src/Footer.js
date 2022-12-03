import { HeartIcon } from "@heroicons/react/24/solid";
import { ReactComponent as GithubFilled } from "./img/github-filled.svg";
import { ReactComponent as LinkedinFilled } from "./img/linkedin-filled.svg";

export default function Footer() {
    return (
        <>
            <footer className="bg-stone-100 py-6 px-[5%] md:px-[30%] flex flex-col justify-between w-screen text-stone-500 clear-both">
                <div className="text-center mx-auto">
                    Developed with{" "}
                    <HeartIcon className="w-5 h-5 inline-block fill-red-500 hover:animate-bounce" />{" "}
                    by Yunus Emre Kepenek
                </div>
                <hr className="my-6 border-stone-300" />
                <div className="text-center mx-auto flex space-x-2">
                    <a
                        href="https://github.com/YuunsGit"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GithubFilled className="w-8 h-8 fill-stone-600 hover:fill-stone-800" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/yekepenek/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <LinkedinFilled className="w-8 h-8 fill-stone-600 hover:fill-stone-800" />
                    </a>
                </div>
                <div className="text-center mx-auto">
                    This is an{" "}
                    <a
                        href="https://github.com/YuunsGit/conversions"
                        className="underline underline-offset-2 hover:text-stone-900 inline-block z-0"
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
