import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
    title: "Learning to Be Good",
};

export default function ReaderPage() {
    return (
        <div className="flex flex-col h-screen bg-[#3c3c3c] overflow-hidden selection:bg-amber-100 selection:text-amber-900">
            <style>{`
                .fixed.top-4.right-4 { display: none !important; }
            `}</style>

            <header
                style={{ height: '8px' }}
                className="flex w-full items-center justify-center shrink-0 z-50 bg-[#3c3c3c]"
            >
                <Link
                    href="https://www.degruyterbrill.com/document/doi/10.1525/9780520340985-008/html"
                    target="_blank"
                    className="flex items-center gap-1 text-white hover:text-white transition-colors group translate-y-2"
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
