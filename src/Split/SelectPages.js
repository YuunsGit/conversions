import { pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { useEffect, useState } from "react";
import Page from "./Page";

export default function SelectPages(props) {
    const [selects, setSelects] = useState(new Set());
    const [pages, setPages] = useState([]);

    useEffect(() => {
        loadPages();
    }, []);

    const loadPages = async () => {
        const pdfDoc = await pdfjs.getDocument({ data: props.fileBuffer })
            .promise;
        const newPages = [];

        for (let i = 1; i <= pdfDoc.numPages; i++) {
            const pdfPage = await pdfDoc.getPage(i);
            const page = (
                <Page
                    page={pdfPage}
                    pageNum={i}
                    selects={selects}
                    setSelects={setSelects}
                />
            );
            newPages.push(page);
        }
        setPages(newPages);
    };

    return (
        <>
            <h2 className="prose prose-stone text-center mx-auto mb-6 text-xl">
                Select pages to extract:
            </h2>
            <div
                id="page-container"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto"
            >
                {pages}
            </div>
            <div
                className="block mx-auto my-8 bg-lime-500 rounded-md px-10 py-5 max-w-max md:ma-10 h-auto text-white font-semibold text-l select-none hover:bg-lime-600 cursor-pointer"
                onClick={() => props.split(selects, pages.length)}
            >
                SPLIT & SAVE
            </div>
        </>
    );
}
