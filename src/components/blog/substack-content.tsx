"use client";

import parse, { DOMNode, Element, domToReact } from "html-react-parser";
import { ImagePreview } from "@/components/ui/image-preview";

interface SubstackContentProps {
  content: string;
}

export function SubstackContent({ content }: SubstackContentProps) {
  // Transform Substack HTML into our styled components
  const transform = (node: DOMNode) => {
    if (!(node instanceof Element)) return;

    // 1. Handle Images
    if (node.tagName === "img") {
      const src = node.attribs.src;

      return (
        <img
          src={src}
          className="cursor-zoom-in rounded-lg mx-auto my-2 shadow-sm transition hover:opacity-90 grayscale-[20%] hover:grayscale-0"
          onClick={(e) => {
            // @ts-ignore
            if (window.openImagePreview) {
              e.preventDefault();
              // @ts-ignore
              window.openImagePreview(src);
            }
          }}
          alt={node.attribs.alt || ""}
        />
      );
    }

    // 2. Handle Links (Anchors)
    if (node.tagName === "a") {
      // Check if this link wraps an image
      const hasImage = node.children.some(
        (child) =>
          child instanceof Element &&
          (child.tagName === "img" ||
            (child.tagName === "div" &&
              child.attribs.class?.includes("image"))),
      );

      // If it wraps an image, just return the children (unwrap the link)
      if (hasImage) {
        return (
          <>{domToReact(node.children as DOMNode[], { replace: transform })}</>
        );
      }

      return (
        <a
          href={node.attribs.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-inherit underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 hover:decoration-slate-500 dark:hover:decoration-slate-400 transition-colors cursor-pointer"
        >
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </a>
      );
    }

    // 3. Handle Paragraphs (Spacing)
    if (node.tagName === "p") {
      // Skip empty paragraphs that Substack sometimes adds
      if (node.children.length === 0) return null;
      /* @ts-ignore */
      const textContent = node.children[0]?.data;
      if (
        node.children.length === 1 &&
        typeof textContent === "string" &&
        !textContent.trim()
      )
        return null;

      return (
        <p className="mb-3 leading-8 text-lg/8 text-foreground/80">
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </p>
      );
    }

    // 4. Handle Lists
    if (node.tagName === "ul") {
      return (
        <ul className="list-disc list-outside ml-6 mb-3 space-y-1 text-lg/8 text-foreground/80">
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </ul>
      );
    }
    if (node.tagName === "ol") {
      return (
        <ol className="list-decimal list-outside ml-6 mb-3 space-y-1 text-lg/8 text-foreground/80">
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </ol>
      );
    }

    // 5. Handle Headings
    if (node.tagName === "h1")
      return (
        <h1 className="text-4xl font-medium mt-10 mb-4 text-foreground tracking-tight">
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </h1>
      );
    if (node.tagName === "h2")
      return (
        <h2 className="text-3xl font-medium mt-8 mb-3 text-foreground tracking-tight">
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </h2>
      );
    if (node.tagName === "h3")
      return (
        <h3 className="text-2xl font-medium mt-6 mb-2 text-foreground tracking-tight">
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </h3>
      );
    if (node.tagName === "h4")
      return (
        <h4 className="text-xl font-medium mt-4 mb-2 text-foreground tracking-tight">
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </h4>
      );

    // 6. Handle Blockquotes
    if (node.tagName === "blockquote") {
      return (
        <blockquote className="border-l-4 border-slate-300 dark:border-slate-700 pl-6 italic text-muted-foreground my-8 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-r-lg">
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </blockquote>
      );
    }

    // 7. Remove weird Substack buttons/elements and specific classes
    const tagName = node.tagName.toLowerCase();
    if (
      tagName === "button" ||
      tagName === "svg" ||
      (node.attribs &&
        (node.attribs.class?.includes("image-link-expand") ||
          node.attribs.class?.includes("view-image") ||
          node.attribs.class?.includes("restack-image") ||
          node.attribs.class?.includes("pencraft")))
    ) {
      return null;
    }

    // 8. Handle Figures (often contain images and captions)
    if (tagName === "figure") {
      return (
        <figure className="my-2 flex flex-col items-center">
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </figure>
      );
    }

    if (node.tagName === "figcaption") {
      return (
        <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </figcaption>
      );
    }

    // 9. Handle Code Blocks
    if (node.tagName === "pre") {
      return (
        <pre className="bg-slate-900 dark:bg-slate-950 text-slate-50 p-6 rounded-xl overflow-x-auto my-8 border border-slate-800">
          {domToReact(node.children as DOMNode[], { replace: transform })}
        </pre>
      );
    }

    // 10. Handle Horizontal Rules
    if (node.tagName === "hr") {
      return <hr className="my-8 border-t border-border" />;
    }

    // Default: return node as is (but with children processed)
    return;
  };

  const parsedContent = parse(content, { replace: transform });

  return (
    <>
      <ImagePreview />
      <div className="prose-none max-w-none text-foreground">
        {parsedContent}
      </div>
    </>
  );
}
