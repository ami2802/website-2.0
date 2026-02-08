"use client";

import Image from "next/image";
import { ProjectInfo } from "@/lib/types";
import { AccordionContent } from "../ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { SiSubstack, SiGoogleslides } from "react-icons/si";

export default function ProjectRow({
  idx,
  projectInfo,
}: {
  idx: number;
  projectInfo: ProjectInfo;
}) {
  return (
    <AccordionItem
      value={"project-" + idx.toString()}
      className="bg-card rounded-xl shadow-sm border border-border/50 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md flex flex-col"
    >
      <AccordionTrigger className="p-4 flex flex-row gap-4 items-center w-full text-start cursor-pointer hover:no-underline">
        {/* Image container */}
        {(projectInfo.projectLogoUrl || projectInfo.customLogo) && (
          <div className="relative h-12 shrink-0 aspect-square">
            {projectInfo.customLogo ||
              (projectInfo.projectLogoUrl && (
                <Image
                  src={projectInfo.projectLogoUrl}
                  alt="Company logo"
                  className="rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out bg-rose-200 dark:bg-rose-950 object-cover"
                  fill
                  priority
                />
              ))}
          </div>
        )}
        {/* Company info */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-4 justify-between items-center w-full">
            <div className="text-title font-semibold text-sm sm:text-lg">
              {projectInfo.projectName}
            </div>
            <div className="flex flex-row gap-2">
              {projectInfo.substackLink && (
                <Link
                  href={projectInfo.substackLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center p-1.5 bg-interactive rounded-lg text-muted-custom hover:bg-interactive-hover transition shrink-0"
                  title="Read on Substack"
                >
                  <SiSubstack className="w-3.5 h-3.5 text-[#FF6719]" />
                </Link>
              )}
              {projectInfo.youtubeLink && (
                <Link
                  href={projectInfo.youtubeLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center p-1.5 bg-interactive rounded-lg text-muted-custom hover:bg-interactive-hover transition shrink-0"
                  title="Watch on YouTube"
                >
                  <FaYoutube className="w-4 h-4 text-[#FF0000]" />
                </Link>
              )}
              {projectInfo.slidesLink && (
                <Link
                  href={projectInfo.slidesLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center p-1.5 bg-interactive rounded-lg text-muted-custom hover:bg-interactive-hover transition shrink-0"
                  title="View Slides"
                >
                  <SiGoogleslides className="w-4 h-4 text-[#F4B400]" />
                </Link>
              )}
              {projectInfo.projectLink && (
                <Link
                  href={projectInfo.projectLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center p-1.5 bg-interactive rounded-lg text-muted-custom hover:bg-interactive-hover transition shrink-0"
                  title="View on GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:block text-muted-custom text-sm sm:text-base text-left">
            {projectInfo.projectCaption}
          </div>
        </div>
      </AccordionTrigger>
      {(projectInfo.description ||
        projectInfo.listDescription ||
        projectInfo.tags) && (
          <AccordionContent className="text-body px-4 pb-4">
            <div>{projectInfo.description}</div>
            {projectInfo.listDescription && (
              <ul className="list-disc pl-8">
                {projectInfo.listDescription.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
            {projectInfo.tags && (
              <div className="flex flex-row gap-2 flex-wrap mt-4">
                {projectInfo.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 rounded-lg bg-interactive text-xs transition ease-in-out hover:scale-110 font-semibold text-muted-custom"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        )}
    </AccordionItem>
  );
}
