import { useState } from "react";
import Input from "./Input";
import SelectPages from "./SelectPages";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { PDFDocument } from "pdf-lib";

export default function Split() {
    const [step, setStep] = useState(1);
    const [buffer, setBuffer] = useState();
    const [filename, setFilename] = useState();

    const selectPages = async (uploaded) => {
        if (!uploaded || !uploaded.name.endsWith(".pdf")) {
            const errContainer = document.getElementById("error");
            errContainer.innerHTML = "Uploaded file is not a PDF document.";
            errContainer.setAttribute(
                "class",
                errContainer.getAttribute("class").replace("hidden", "block")
            );
            return;
        }
        const fileBuffer = await uploaded.arrayBuffer();
        setFilename(uploaded.name);
        setBuffer(fileBuffer);
        setStep(2);
    };

    async function split(selects, pageNum) {
        const pdfDoc = await PDFDocument.load(buffer);

        const toExclude = [...Array(pageNum).keys()].filter((el) => {
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
            download: filename.replace(".pdf", "") + "_split.pdf",
        });
        document.body.appendChild(a);

        a.click();
        URL.revokeObjectURL(href);
        a.remove();

        setStep(3);
    }

    const DisplayStep = () => {
        switch (step) {
            case 1:
                return <Input selectPages={selectPages} />;
            case 2:
                return (
                    <SelectPages
                        fileBuffer={buffer}
                        split={(selects, pageNum) => split(selects, pageNum)}
                    />
                );
            case 3:
                return (
                    <div className="text-xl text-center">
                        <CheckBadgeIcon className="inline fill-lime-400 w-10 h-8 mx-auto" />
                        File downloaded successfully.
                        <div
                            onClick={() => window.location.reload(false)}
                            className="block mx-auto my-6 bg-stone-300 rounded-md px-5 py-2 max-w-max md:ma-10 h-auto text-white font-semibold select-none hover:bg-stone-400 cursor-pointer"
                        >
                            SPLIT AGAIN
                        </div>
                    </div>
                );
        }
    };

    return (
        <main className="flex flex-col mx-auto w-screen max-w-7xl my-24">
            <div className="prose prose-stone mx-12 md:mx-auto">
                <h1 className="text-6xl text-center">Split</h1>
                <p className="text-xl text-center md:mx-12">
                    Splits the PDF of multiple pages into a new PDF from
                    selected pages.
                </p>
            </div>
            <hr className="mx-auto w-[70%] my-14" />
            {DisplayStep()}
            <p
                id="error"
                className="hidden mx-auto text-center text-red-600 my-2"
            />
        </main>
    );
}
