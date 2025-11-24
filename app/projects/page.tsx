import Navbar from "@/components/ui/Navbar";
import { ProjectInfo } from "@/lib/types";
import ProjectRow from "@/components/ui/project-row";
import { Accordion } from "@radix-ui/react-accordion";
import {
  BookOpen,
  Pill,
  MessageCircle,
  Recycle,
  HeartPulse,
  Trophy
} from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const projects: ProjectInfo[] = [
    {
      projectName: "Multimodal, Domain Specific LLM with RAG",
      customLogo: (
        <Link
          href="https://github.com/steaminghotomelette/mPLUG-Owl-RAG"
          target="_blank"
          rel="noreferrer noopener"
        >
          <BookOpen className="text-blue-600 dark:text-blue-400 text-4xl w-full h-full p-2 bg-blue-100 dark:bg-blue-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        </Link>
      ),
      projectCaption: "A robust multimodal LLM for domain-specific visual-question answering.",
      projectLink: "https://github.com/steaminghotomelette/mPLUG-Owl-RAG",
      description:
        "A custom multimodal LLM for medical imaging and forensic VQA, awarded 2nd Best FYP for research potential. Fine-tuned an 8B vision-language model, improving accuracy by 30% over baseline using RAG and CoT. Architected a vector database with custom chunking and hybrid retrieval.",
      tags: ["PyTorch", "Computer Vision",  "Langchain", "Transformers"],
    },
    {
      projectName: "RxNet",
      customLogo: (
        <Link
          href="https://github.com/ami2802/RxNet"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Pill className="text-green-600 dark:text-green-400 text-4xl w-full h-full p-2 bg-green-100 dark:bg-green-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        </Link>
      ),
      projectCaption: "Blockchain-powered prescription management tool.",
      projectLink: "https://github.com/ami2802/RxNet",
      description:
        "RxNet is a blockchain-based prescription management app, finalist at APU DevMatch 2024 and cash prize winner at Monash Hackfest. Smart contracts streamline the process of issuing, tracking, and validating prescriptions, improving transparency and reducing fraud.",
      tags: ["Solana", "Blockchain", "Web3", "Smart Contracts"],
    },
    {
      projectName: "DocGPT",
      customLogo: (
        <Link
          href="https://github.com/ami2802/DocGPT-2"
          target="_blank"
          rel="noreferrer noopener"
        >
          <MessageCircle className="text-teal-600 dark:text-teal-400 text-4xl w-full h-full p-2 bg-teal-100 dark:bg-teal-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        </Link>
      ),
      projectCaption: "Multimodal LLM healthcare chatbot.",
      projectLink: "https://github.com/ami2802/DocGPT-2",
      description:
        "DocGPT is an AI-powered healthcare chatbot developed with Python and Streamlit. It offers functionalities like speech-to-text, image analysis, and interfaces with Google Maps to locate nearby clinics.",
      tags: ["Python", "LLMs", "Speech-to-text"],
    },
    {
      projectName: "Ren",
      customLogo: (
        <Link
          href="https://github.com/Ren-Kitahack-2024/Ren"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Recycle className="text-amber-600 dark:text-amber-400 text-4xl w-full h-full p-2 bg-amber-100 dark:bg-amber-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        </Link>
      ),
      projectCaption: "Volunteer cleaning app for public places.",
      projectLink: "https://github.com/Ren-Kitahack-2024/Ren",
      description:
        "Ren is a volunteer cleaning app created for Kitahack 2024, inspired by growing environmental issues in society. The app encourages users to take part in local cleanup efforts and tracks their progress to mitigate pollution and reduce climate-related risks.",
      tags: ["Flutter", "Dart", "Sustainability"],
    },
    {
      projectName: "Vital Vision",
      customLogo: (
        <Link
          href="https://github.com/faw01/vital-vision"
          target="_blank"
          rel="noreferrer noopener"
        >
          <HeartPulse className="text-red-600 dark:text-red-400 text-4xl w-full h-full p-2 bg-red-100 dark:bg-red-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        </Link>
      ),
      projectCaption: "Heart rate detection using image processing.",
      projectLink: "https://github.com/faw01/vital-vision",
      description:
        "Vital Vision is a health-focused smartphone app developed for Kitahack 2023 that uses image processing (photoplethysmography) to detect the user's heart rate without the need for special equipment.",
      tags: ["Flutter", "Dart", "Image Processing"],
    },
    {
      projectName: "Monash Coding League",
      customLogo: (
        <Link
          href="https://github.com/faw01/MCL"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Trophy className="text-yellow-600 dark:text-yellow-400 text-4xl w-full h-full p-2 bg-yellow-100 dark:bg-yellow-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        </Link>
      ),
      projectCaption: "University-wide competitive programming competition.",
      projectLink: "https://github.com/faw01/MCL",
      description:
        "I placed 3rd in Monash Coding League, a competitive programming contest with 100+ teams involving LeetCode-style problems.",
      tags: ["Data Structures and Algorithms", "Python"],
    },
  ];

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-8 md:p-24 bg-slate-100 dark:bg-midnight">
      <div className="flex flex-col gap-4 md:gap-12 max-w-3xl w-full">
        <Navbar page="projects" />
        <div className="flex flex-col gap-6 md:gap-10 w-full">
          {/* Projects section */}
          <div className="flex flex-col gap-5">
            <div className="text-3xl font-bold text-slate-700 dark:text-slate-200">
              projects
              <div className="text-base	font-medium text-slate-500 dark:text-slate-400">
                old uni/hackathon projects
              </div>
            </div>
            <Accordion type="multiple" className="flex flex-col gap-4">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className={idx === 0 ? "mb-5 bg-white dark:bg-slate-900 p-4 rounded-xl" : ""}
                >
                  {idx === 0 && (
                    <div className="text-base font-medium text-slate-500 dark:text-slate-400 mb-2">
                      final year project
                    </div>
                  )}
                  <ProjectRow projectInfo={project} idx={idx} />
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
}
