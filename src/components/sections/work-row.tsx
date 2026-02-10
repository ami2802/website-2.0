"use client";

import Image from "next/image";
import { WorkInfo } from "@/lib/types";
import { formatWorkPeriod, monthsBetween } from "@/lib/utils";
import { AccordionContent } from "../ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { useEffect, useState } from "react";

export default function WorkRow({
  idx,
  workInfo,
}: {
  idx: number;
  workInfo: WorkInfo;
}) {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (workInfo.start_date) {
      setDuration(
        monthsBetween(
          new Date(workInfo.start_date),
          workInfo.end_date ? new Date(workInfo.end_date) : undefined,
        ),
      );
    }
  }, [workInfo.start_date, workInfo.end_date]);

  return (
    <AccordionItem
      value={"work-" + idx.toString()}
      className="group transition-all hover:bg-interactive-hover hover:backdrop-blur-sm flex flex-col rounded-lg"
    >
      <AccordionTrigger className="p-4 flex flex-row gap-4 items-center w-full text-start cursor-pointer hover:no-underline">
        {/* Image container */}
        <div className="relative h-12 w-12 shrink-0 aspect-square">
          <Image
            src={workInfo.companyLogoUrl}
            alt="Company logo"
            className="rounded transition object-cover"
            fill
            priority
          />
        </div>
        {/* Company info */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-4 justify-between items-baseline w-full">
            <div className="text-title font-semibold text-sm sm:text-base">
              {workInfo.role}
            </div>
            {workInfo.start_date && (
              <div className="hidden sm:flex flex-col gap-1 text-muted-custom text-sm text-right shrink-0">
                {formatWorkPeriod(workInfo.start_date, workInfo.end_date)}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-4 justify-between items-baseline w-full">
            <div className="text-muted-custom text-sm">
              {workInfo.companyName}
            </div>
            {workInfo.start_date && (
              <div className="hidden sm:flex flex-col gap-1 text-muted-custom text-sm text-right shrink-0">
                {duration}
              </div>
            )}
          </div>
          {workInfo.start_date && (
            <div className="sm:hidden text-muted-custom text-xs">
              {formatWorkPeriod(workInfo.start_date, workInfo.end_date)}
            </div>
          )}
        </div>
      </AccordionTrigger>
      {(workInfo.description || workInfo.listDescription || workInfo.tags) && (
        <AccordionContent className="text-body px-4 pb-4">

          <div>{workInfo.description}</div>
          {workInfo.listDescription && (
            <ul className="list-disc pl-8">
              {workInfo.listDescription.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          )}
          {workInfo.tags && (
            <div className="flex flex-row gap-2 flex-wrap mt-2">
              {workInfo.tags.map((tag, idx) => (
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
