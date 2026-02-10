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
      className="group transition-all hover:bg-interactive-hover hover:backdrop-blur-sm flex flex-col rounded-lg"
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
                  className="rounded-lg transition ease-in-out bg-rose-950 object-cover"
                  fill
                  priority
                />
              ))}
          </div>
        )}
        {/* Company info */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-4 justify-between items-center w-full">
            <div className="text-title font-semibold text-sm sm:text-base">
              {projectInfo.projectName}
            </div>
            <div className="hidden sm:flex flex-row gap-2">
              {projectInfo.substackLink && (
                <Link
                  href={projectInfo.substackLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center p-1.5 rounded-lg text-[#FF6719] md:text-[#FF6719]/60 md:hover:text-[#FF6719] transition-colors shrink-0"
                  title="Read on Substack"
                >
                  <SiSubstack className="w-5 h-5" />
                </Link>
              )}
              {projectInfo.youtubeLink && (
                <Link
                  href={projectInfo.youtubeLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center p-1.5 rounded-lg text-[#FF0000] md:text-[#FF0000]/60 md:hover:text-[#FF0000] transition-colors shrink-0"
                  title="Watch on YouTube"
                >
                  <FaYoutube className="w-5 h-5" />
                </Link>
              )}
              {projectInfo.slidesLink && (
                <Link
                  href={projectInfo.slidesLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center p-1.5 rounded-lg text-[#F4B400] md:text-[#F4B400]/60 md:hover:text-[#F4B400] transition-colors shrink-0"
                  title="View Slides"
                >
                  <SiGoogleslides className="w-5 h-5" />
                </Link>
              )}
              {projectInfo.projectLink && (
                <Link
                  href={projectInfo.projectLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center p-1.5 rounded-lg text-foreground md:text-muted-custom md:hover:text-foreground transition-colors shrink-0"
                  title="View on GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:block text-muted-custom text-sm text-left">
            {projectInfo.projectCaption}
          </div>
        </div>
      </AccordionTrigger>
      {(projectInfo.description ||
        projectInfo.listDescription ||
        projectInfo.tags) && (
          <AccordionContent className="text-body px-4 pb-4">
            <div className="sm:hidden flex flex-row gap-2 mb-4">
              {projectInfo.substackLink && (
                <Link
                  href={projectInfo.substackLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center p-1.5 rounded-lg text-[#FF6719] transition-colors shrink-0"
                  title="Read on Substack"
                >
                  <SiSubstack className="w-5 h-5" />
                </Link>
              )}
              {projectInfo.youtubeLink && (
                <Link
                  href={projectInfo.youtubeLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center p-1.5 rounded-lg text-[#FF0000] transition-colors shrink-0"
                  title="Watch on YouTube"
                >
                  <FaYoutube className="w-5 h-5" />
                </Link>
              )}
              {projectInfo.slidesLink && (
                <Link
                  href={projectInfo.slidesLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center p-1.5 rounded-lg text-[#F4B400] transition-colors shrink-0"
                  title="View Slides"
                >
                  <SiGoogleslides className="w-5 h-5" />
                </Link>
              )}
              {projectInfo.projectLink && (
                <Link
                  href={projectInfo.projectLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center p-1.5 rounded-lg text-foreground transition-colors shrink-0"
                  title="View on GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </Link>
              )}
            </div>
            <div>{projectInfo.description}</div>
            {projectInfo.listDescription && (
              <ul className="list-disc pl-8">
                {projectInfo.listDescription.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
            {projectInfo.tags && (
              <div className="flex flex-row gap-2 flex-wrap mt-2">
                {projectInfo.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 rounded-lg bg-interactive text-xs font-semibold text-muted-custom"
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
