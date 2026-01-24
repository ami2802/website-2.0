import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { highlight } from "sugar-high";
import React, { ComponentPropsWithoutRef } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    const Heading = ({ children, ...props }: HeadingProps) => {
        const slug = slugify(children?.toString() || "");
        const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        const sizes = {
            1: "text-3xl font-bold mt-8 mb-4",
            2: "text-2xl font-semibold mt-6 mb-3",
            3: "text-xl font-semibold mt-4 mb-2",
            4: "text-lg font-medium mt-3 mb-2",
            5: "text-base font-medium mt-2 mb-1",
            6: "text-sm font-medium mt-2 mb-1",
        };
        return (
            <Tag id={slug} className={`${sizes[level]} text-foreground`} {...props}>
                {children}
            </Tag>
        );
    };
    Heading.displayName = `Heading${level}`;
    return Heading;
}

const components: MDXComponents = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    p: (props: ParagraphProps) => (
        <p className="leading-7 mb-4 text-foreground/80" {...props} />
    ),
    ol: (props: ListProps) => (
        <ol
            className="list-decimal list-inside mb-4 space-y-1 text-foreground/80"
            {...props}
        />
    ),
    ul: (props: ListProps) => (
        <ul
            className="list-disc list-inside mb-4 space-y-1 text-foreground/80"
            {...props}
        />
    ),
    li: (props: ListItemProps) => <li className="leading-7" {...props} />,
    em: (props: ComponentPropsWithoutRef<"em">) => (
        <em className="italic" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<"strong">) => (
        <strong className="font-semibold text-foreground" {...props} />
    ),
    a: ({ href, children, ...props }: AnchorProps) => {
        const className =
            "font-medium text-inherit underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 hover:decoration-slate-500 dark:hover:decoration-slate-400 transition-colors cursor-pointer";
        if (href?.startsWith("/")) {
            return (
                <Link href={href} className={className} {...props}>
                    {children}
                </Link>
            );
        }
        if (href?.startsWith("#")) {
            return (
                <a href={href} className={className} {...props}>
                    {children}
                </a>
            );
        }
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                {...props}
            >
                {children}
            </a>
        );
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
        const codeString = children?.toString() || "";
        if (!codeString.includes("\n")) {
            return (
                <code
                    className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                >
                    {children}
                </code>
            );
        }
        const codeHTML = highlight(codeString);
        return (
            <code
                className="block bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4"
                dangerouslySetInnerHTML={{ __html: codeHTML }}
                {...props}
            />
        );
    },
    pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
        <pre className="mb-4" {...props}>
            {children}
        </pre>
    ),
    blockquote: (props: BlockquoteProps) => (
        <blockquote
            className="border-l-4 border-slate-300 dark:border-slate-700 pl-4 italic text-muted-foreground my-4"
            {...props}
        />
    ),
    hr: () => <hr className="border-border my-8" />,
};

export function useMDXComponents(
    otherComponents: MDXComponents,
): MDXComponents {
    return {
        ...otherComponents,
        ...components,
    };
}
