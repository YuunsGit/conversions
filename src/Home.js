import { ReactComponent as Exclude } from "./img/Exclude.svg";
import { Link } from "react-router-dom";

import {
    Square2StackIcon,
    BookmarkIcon,
    ArrowPathRoundedSquareIcon,
    ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
    return (
        <>
            <main className="flex flex-col mx-auto max-w-7xl w-screen my-20 space-y-20">
                <div
                    className="flex flex-col mx-auto justify-center space-between text-center text-5xl font-extrabold
                    md:text-6xl md:flex-row md:text-left md:space-x-5"
                >
                    <span className="block md:hidden">Edit PDFs.</span>
                    <Exclude className="w-44 h-32 md:w-72 md:h-72 mx-auto" />
                    <span className="hidden md:block my-auto">
                        Edit PDFs.
                        <br />
                        <u>Everywhere.</u>
                    </span>
                    <span className="block md:hidden">Everywhere.</span>
                </div>
                <div className="prose prose-stone mx-auto max-w-7xl gap-10 grid grid-cols-1 md:grid-cols-2">
                    <Link
                        to="/split"
                        className="no-underline bg-stone-100 w-72 lg:w-96 rounded-xl py-5 px-7 hover:bg-stone-200"
                    >
                        <h1>
                            Split{" "}
                            <Square2StackIcon className="w-8 h-8 inline-block" />
                        </h1>
                        <p>
                            Splits given PDF of multiple pages into a number of
                            smaller PDF documents.
                        </p>
                    </Link>
                    <Link
                        to="/rotate"
                        className="no-underline bg-stone-100 w-72 lg:w-96 rounded-xl py-5 px-7 hover:bg-stone-200"
                    >
                        <h1>
                            Rotate{" "}
                            <ArrowPathRoundedSquareIcon className="w-8 h-8 inline-block" />
                        </h1>
                        <p>
                            Rotate allows all pages in a document to be rotated
                            in a given direction.
                        </p>
                    </Link>
                    <Link
                        to="/stamp"
                        className="no-underline bg-stone-100 w-72 lg:w-96 rounded-xl py-5 px-7 hover:bg-stone-200"
                    >
                        <h1>
                            Stamp{" "}
                            <BookmarkIcon className="w-8 h-8 inline-block" />
                        </h1>
                        <p>
                            Creates text watermark stamps to your PDF documents.
                        </p>
                    </Link>
                    <Link
                        to="/convert"
                        className="no-underline bg-stone-100 w-72 lg:w-96 rounded-xl py-5 px-7 hover:bg-stone-200"
                    >
                        <h1>
                            Convert{" "}
                            <ArrowsRightLeftIcon className="w-8 h-8 inline-block" />
                        </h1>
                        <p>
                            Converts a file into PDF or any PDF file to a
                            another file type.
                        </p>
                    </Link>
                </div>
                <div className="prose prose-stone mx-auto max-w-7xl">
                    <h2>More tools soon…</h2>
                </div>
            </main>
        </>
    );
}
