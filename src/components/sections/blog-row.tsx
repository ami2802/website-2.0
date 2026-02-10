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
        <div className="block p-4 flex flex-col gap-2 rounded-lg">
            <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row gap-4 justify-between items-start w-full">
                    <h3 className="text-title font-bold text-sm sm:text-base leading-snug tracking-tight text-left line-clamp-2">
                        <Link href={post.url} className="hover:text-blue-400 transition-colors">
                            {post.title}
                        </Link>
                    </h3>

                </div>
                <div className="text-muted-custom text-sm font-medium">
                    {formatDate(post.date)}
                </div>
            </div>

            {post.description && (
                <p className="text-muted-custom text-sm leading-relaxed line-clamp-2 text-left">
                    {post.description}
                </p>
            )}
        </div>
    );
}
