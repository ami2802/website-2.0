import { ProjectInfo, WorkInfo } from "@/lib/types";
import {
  BookOpen,
  Pill,
  MessageCircle,
  Recycle,
  HeartPulse,
  Trophy,
  ShieldCheck,
} from "lucide-react";

import { formatFromMMMYYYY } from "@/lib/utils";

import WesternDigitalLogo from "@/assets/western-digital.png";
import WaveletLogo from "@/assets/wavelet.jpeg";
import MonashLogo from "@/assets/monash.webp";
import TransPerfectLogo from "@/assets/transperfect.jpeg";

export const projectsData: ProjectInfo[] = [
  {
    projectName: "Ensemble Monitor Experiment",
    customLogo: (
      <ShieldCheck className="text-purple-600 dark:text-purple-400 text-4xl w-full h-full p-2 bg-purple-100 dark:bg-purple-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
    ),
    projectCaption:
      "Replicating Redwood Research's AI Control study with model ensembles.",
    projectLink: "/blog/ensemble-monitor-experiment",
    description:
      "Investigated the efficacy of using an ensemble of smaller 'Trusted' models to monitor a powerful 'Untrusted' model on Python programming tasks. While ensembling improved task usefulness (75%), it yielded limited safety gains compared to single monitors. (PyTorch, HuggingFace)",
    tags: ["AI Safety", "LLMs", "Research", "Python"],
  },
  {
    projectName: "Multimodal LLM with RAG for domain analysis",
    customLogo: (
      <BookOpen className="text-blue-600 dark:text-blue-400 text-4xl w-full h-full p-2 bg-blue-100 dark:bg-blue-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
    ),
    projectCaption:
      "(Monash Final Year Project) A domain-specific LLM for visual Q&A.",
    projectLink: "https://github.com/steaminghotomelette/mPLUG-Owl-RAG",
    description:
      "A custom multimodal LLM for medical imaging and forensic VQA, awarded 2nd Best FYP for research potential. Fine-tuned an 8B vision-language model, improving accuracy by 30% over baseline using RAG and CoT. Architected a vector database with custom chunking and hybrid retrieval.",
    tags: ["PyTorch", "Computer Vision", "Langchain", "Transformers"],
  },
  {
    projectName: "RxNet",
    customLogo: (
      <Pill className="text-green-600 dark:text-green-400 text-4xl w-full h-full p-2 bg-green-100 dark:bg-green-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
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
      <MessageCircle className="text-teal-600 dark:text-teal-400 text-4xl w-full h-full p-2 bg-teal-100 dark:bg-teal-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
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
      <Recycle className="text-amber-600 dark:text-amber-400 text-4xl w-full h-full p-2 bg-amber-100 dark:bg-amber-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
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
      <HeartPulse className="text-red-600 dark:text-red-400 text-4xl w-full h-full p-2 bg-red-100 dark:bg-red-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
    ),
    projectCaption: "Heart rate detection using image processing.",
    projectLink: "https://github.com/faw01/vital-vision",
    description:
      "Vital Vision is a health-focused smartphone app developed for Kitahack 2023 that uses image processing (photoplethysmography) to detect the user's heart rate without the need for special equipment.",
    tags: ["Flutter", "Dart", "Image Processing"],
  },
];

export const workData: WorkInfo[] = [
  {
    role: "Machine Learning Engineer",
    companyName: "TransPerfect",
    companyLogoUrl: TransPerfectLogo,
    start_date: formatFromMMMYYYY("Apr 2025"),
    listDescription: [
      "Drove NLU, ASR, TTS for a big tech voice assistant (500M+ users) to improve Malay language performance.",
      "Fine-tuned transformer-based models and resolved 300+ intent detection bugs. (PyTorch, Ray)",
      "Shipped 50+ localized features by implementing new logic, triaging bugs, and validating integration tests.",
      "Constructed high-quality datasets for low resource languages (Malay, Indonesian) for 14 domains (10K+ lines).",
      "Designed and implemented rule-based filtering heuristics that reduced overall dataset noise by 23%.",
      "Deployed and monitored fine-tuned models in a live environment to diagnose failures. (Kubernetes)",
      "Built an automated end-to-end test suite, reducing manual QA effort by 90%. (Python, Swift)",
      "Rearchitected internal tooling to use multithreading, achieving a 5x speedup. (C++)",
    ],
    tags: ["PyTorch", "Ray", "Kubernetes", "Python", "Swift"],
  },
  {
    role: "Software Engineer Intern",
    companyName: "Wavelet Solutions",
    companyLogoUrl: WaveletLogo,
    start_date: formatFromMMMYYYY("Jan 2024"),
    end_date: formatFromMMMYYYY("Jun 2024"),
    listDescription: [
      "Optimized infrastructure and ensured reliability for an ERP processing 1M+ monthly financial transactions.",
      "Engineered asynchronous ETL job processors to migrate 5M+ records to a centralized data lake. (SQL, AWS)",
      "Designed RESTful APIs using Spring Boot, enforcing strict error handling to meet a 99.9% uptime SLA. (Java)",
      "Developed and deployed a UI module for 10+ applets, adopted by thousands of enterprise users. (Angular)",
      "Refactored a mobile app to improve performance and cut page loading times by 30%. (Flutter)",
    ],
    tags: ["SQL", "AWS", "Java", "Angular", "ETL"],
  },
  {
    role: "Embedded Software Engineer Intern",
    companyName: "Western Digital",
    companyLogoUrl: WesternDigitalLogo,
    start_date: formatFromMMMYYYY("Nov 2023"),
    end_date: formatFromMMMYYYY("Jan 2024"),
    listDescription: [
      "Engineered C++ firmware features and Python failure analysis scripts for enterprise HDDs. Reduced the host interface team's bug backlog by 21%.",
      "Optimized Jenkins CI/CD pipelines by improving retry logic, reducing false positive build failures.",
    ],
    tags: ["C/C++", "Python", "Jenkins", "CI/CD"],
  },
  {
    role: "Teaching Assistant",
    companyName: "Monash University",
    companyLogoUrl: MonashLogo,
    start_date: formatFromMMMYYYY("Jan 2023"),
    end_date: formatFromMMMYYYY("Dec 2024"),
    listDescription: [
      "TA and marker for FIT2014 (Theory of Computation) and FIT1045 (Intro to Programming).",
    ],
  },
];
