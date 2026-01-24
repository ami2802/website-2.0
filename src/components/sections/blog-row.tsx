"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export type MergedPost = {
    id: string;
    title: string;
    date: string;
    description: string;
    source: "local" | "substack";
    url: string;
};

export default function BlogRow({
    idx,
    post,
}: {
    idx: number;
    post: MergedPost;
}) {
    function formatDate(dateString: string): string {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    return (
        <Link
            href={post.url}
            className="group block p-6 bg-card rounded-xl shadow-sm border border-border/50 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md flex flex-col gap-3"
        >
            <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row gap-4 justify-between items-start w-full">
                    <h3 className="text-slate-700 dark:text-slate-100 font-bold text-base sm:text-lg md:text-xl leading-snug tracking-tight text-left line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                    </h3>

                </div>
                <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    {formatDate(post.date)}
                </div>
            </div>

            {post.description && (
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-2 text-left">
                    {post.description}
                </p>
            )}
        </Link>
    );
}
