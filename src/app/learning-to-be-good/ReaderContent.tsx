"use client";

import { detect } from "detect-browser";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ReaderContent() {
    const [isSafari, setIsSafari] = useState(false);

    useEffect(() => {
        const browser = detect();
        if (browser && browser.name === "safari") {
            setIsSafari(true);
        }
    }, []);

    if (isSafari) {
        return (
            <div className="flex flex-col h-screen bg-[#7c7c7c] overflow-hidden">
                <style>{`
                    .fixed.right-4.top-4 { display: none !important; }
                    html, body { background-color: #7c7c7c !important; margin: 0; padding: 0; }
                `}</style>

                <header className="w-full h-8 flex items-center justify-center shrink-0 z-50 bg-[#727272]">
                    <Link
                        href="https://www.degruyterbrill.com/document/doi/10.1525/9780520340985-008/html"
                        target="_blank"
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2c2c2c] text-[#727272] hover:bg-black hover:text-white transition-all group"
                    >
                        <span className="text-[11px] font-semibold leading-none">Source</span>
                        <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </header>

                <main className="flex-grow w-full bg-[#7c7c7c]">
                    <iframe
                        src="/documents/learning-to-be-good.pdf#zoom=100&navpanes=0"
                        className="w-full h-full border-none"
                        title="Learning to Be Good"
                    />
                </main>
            </div>
        );
    }

    // STANDARD/CHROME LAYOUT: Ultra-minimal 8px bar (Fixed)
    return (
        <div className="flex flex-col h-screen bg-[#3c3c3c] overflow-hidden">
            <style>{`
                .fixed.right-4.top-4 { display: none !important; }
                html, body { background-color: #3c3c3c !important; margin: 0; padding: 0; }
            `}</style>

            <header
                style={{ height: '8px' }}
                className="flex w-full items-center justify-center shrink-0 z-50 bg-[#3c3c3c]"
            >
                <Link
                    href="https://www.degruyterbrill.com/document/doi/10.1525/9780520340985-008/html"
                    target="_blank"
                    className="flex items-center gap-1 text-white hover:text-white transition-all group translate-y-2"
                >
                    <span className="text-[11px] font-medium leading-none">Source</span>
                    <ArrowUpRight className="w-3 h-3 transition-opacity" />
                </Link>
            </header>

            <main className="flex-grow w-full bg-[#3c3c3c]">
                <iframe
                    src="/documents/learning-to-be-good.pdf#zoom=100&navpanes=0"
                    className="w-full h-full border-none"
                    title="Learning to Be Good"
                />
            </main>
        </div>
    );
}
