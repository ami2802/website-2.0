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
      className="bg-card rounded-xl shadow-sm border border-border/50 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md flex flex-col"
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
            <div className="text-slate-700 dark:text-slate-100 font-semibold text-sm sm:text-lg">
              {workInfo.role}
            </div>
            {workInfo.start_date && (
              <div className="hidden sm:flex flex-col gap-1 text-slate-500 dark:text-slate-400">
                {formatWorkPeriod(workInfo.start_date, workInfo.end_date)}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-4 justify-between items-baseline w-full">
            <div className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              {workInfo.companyName}
            </div>
            {workInfo.start_date && (
              <div className="hidden sm:flex flex-col gap-1 text-slate-500 dark:text-slate-400">
                {duration}
              </div>
            )}
          </div>
        </div>
      </AccordionTrigger>
      {(workInfo.description || workInfo.listDescription || workInfo.tags) && (
        <AccordionContent className="text-slate-700 dark:text-slate-300 px-4 pb-4">
          {workInfo.start_date && (
            <div className="sm:hidden flex flex-row justify-between mb-4 text-xs font-medium text-slate-500 dark:text-slate-400 border-b border-border/20 pb-2 italic">
              <div>{formatWorkPeriod(workInfo.start_date, workInfo.end_date)}</div>
              <div>{duration}</div>
            </div>
          )}
          <div>{workInfo.description}</div>
          {workInfo.listDescription && (
            <ul className="list-disc pl-8">
              {workInfo.listDescription.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          )}
          {workInfo.tags && (
            <div className="flex flex-row gap-2 flex-wrap mt-4">
              {workInfo.tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs transition ease-in-out hover:scale-110 font-semibold text-slate-500 dark:text-slate-400"
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
