import { ProjectInfo, WorkInfo } from "@/lib/types";
import {
    BookOpen,
    Pill,
    MessageCircle,
    Recycle,
    HeartPulse,
    ShieldCheck,
} from "lucide-react";

import { formatFromMMMYYYY } from "@/lib/utils";

import WesternDigitalLogo from "@/assets/western-digital.png";
import WaveletLogo from "@/assets/wavelet.jpeg";
import MonashLogo from "@/assets/monash.webp";
import TransPerfectLogo from "@/assets/transperfect.jpeg";

export const projectsData: ProjectInfo[] = [
    {
        projectName: "Ensemble Monitoring for Scalable Oversight",
        customLogo: (
            <ShieldCheck className="text-red-600 dark:text-red-400 text-4xl w-full h-full p-2 bg-red-100 dark:bg-red-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        ),
        projectCaption:
            "Replicating and extending an ICML '24 paper on AI Controls",
        projectLink: "https://github.com/ami2802/ensemble-monitor-experiments",
        substackLink: "/blog/ensemble-monitor-experiments",
        description:
            "Investigated the efficacy of using an ensemble of smaller 'Trusted' models to monitor a powerful 'Untrusted' model on Python programming tasks.",
        tags: ["AI Safety", "ControlArena", "Research"],
    },
    {
        projectName: "Monash University Final Year Project",
        customLogo: (
            <BookOpen className="text-orange-600 dark:text-orange-400 text-4xl w-full h-full p-2 bg-orange-100 dark:bg-orange-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        ),
        projectCaption:
            "A multimodal, domain-specific LLM for visual question-answering",
        projectLink: "https://github.com/steaminghotomelette/mPLUG-Owl-RAG",
        slidesLink: "https://docs.google.com/presentation/d/18c8sIe5GDjXr2s8vCOjtXbL6Hjm8I63aMM3gYvaBRpc/edit?usp=sharing",
        description:
            "We were the top FYP of our summer '24 cohort. The project involves a custom multimodal LLM built for VQA tasks in medical imaging and forensic videos. We fine-tuned an 8B vision-language model, combining it with RAG and COT to improve accuracy by 30% over baseline. I was in charge of architecting the RAG system, implemented using a vector database with a custom chunking algorithm and a hybrid retrieval mechanism.",
        tags: ["PyTorch", "Computer Vision", "Langchain", "Transformers"],
    },
    {
        projectName: "RxNet",
        customLogo: (
            <Pill className="text-yellow-600 dark:text-yellow-400 text-4xl w-full h-full p-2 bg-yellow-100 dark:bg-yellow-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        ),
        projectCaption: "Blockchain-powered prescription management tool",
        projectLink: "https://github.com/ami2802/RxNet",
        youtubeLink: "https://youtu.be/6WQnTyUsazc",
        description:
            "RxNet is a blockchain-based prescription management app that earned me a finalist spot at APU DevMatch 2024 and cash prize at Monash Hackfest. Smart contracts streamline the process of issuing, tracking, and validating prescriptions, improving transparency and reducing fraud.",
        tags: ["Solana", "Blockchain", "Web3", "Smart Contracts"],
    },
    {
        projectName: "DocGPT",
        customLogo: (
            <MessageCircle className="text-green-600 dark:text-green-400 text-4xl w-full h-full p-2 bg-green-100 dark:bg-green-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        ),
        projectCaption: "LLM healthcare chatbot",
        projectLink: "https://github.com/ami2802/DocGPT-2",
        description:
            "DocGPT is an AI-powered healthcare chatbot developed with Python and Streamlit. I integrated speech-to-text, image analysis, and interfaced with Google Maps to locate nearby clinic.",
        tags: ["Python", "LLMs", "Speech-to-text"],
    },
    {
        projectName: "Ren",
        customLogo: (
            <Recycle className="text-blue-600 dark:text-blue-400 text-4xl w-full h-full p-2 bg-blue-100 dark:bg-blue-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        ),
        projectCaption: "Volunteer cleaning app for public places",
        projectLink: "https://github.com/Ren-Kitahack-2024/Ren",
        description:
            "Ren is a volunteer cleaning app created for Kitahack 2024 (Google Solution Challenge), where we were in the top 10. This was inspired by growing environmental issues in society. The app encourages users to take part in local cleanup efforts and tracks their progress to mitigate pollution and reduce climate-related risks.",
        tags: ["Flutter"],
    },
    {
        projectName: "Vital Vision",
        customLogo: (
            <HeartPulse className="text-purple-600 dark:text-purple-400 text-4xl w-full h-full p-2 bg-purple-100 dark:bg-purple-950 rounded-lg shadow-lg shadow-slate-200 dark:shadow-black transition hover:scale-110 ease-in-out" />
        ),
        projectCaption: "Heart rate detection app using PPG image processing",
        projectLink: "https://github.com/faw01/vital-vision",
        description:
            "Vital Vision is a health-focused smartphone app developed for Kitahack 2023 (Google Solution Challenge) that uses photoplethysmography to detect the user's heart rate without requiring special equipment.",
        tags: ["Flutter"],
    },
];

export const workData: WorkInfo[] = [
    {
        role: "Machine Learning Engineer",
        companyName: "TransPerfect",
        companyLogoUrl: TransPerfectLogo,
        start_date: formatFromMMMYYYY("Apr 2025"),
        listDescription: [
            "Improved on-device NLU, ASR, TTS in Malay for a big tech voice assistant (500M+ users).",
            "Fine-tuned transformer-based models and resolved 300+ intent detection bugs.",
            "Shipped 50+ localized features by implementing new logic, triaging bugs, and validating integration tests.",
            "Constructed high-quality datasets for low resource languages (Malay, Indonesian) for several domains.",
            "Designed and implemented rule-based filtering heuristics that reduced overall dataset noise by 23%.",
            "Deployed and monitored fine-tuned models in a live environment to diagnose failures.",
            "Built tooling to automate end-to-end testing, reducing manual QA effort by 80%.",
            "Refactored an internal data labelling tool to use multithreading, leading to a 5x speedup.",
        ],
        tags: ["PyTorch", "Ray", "Kubernetes", "Python", "Swift", "C++"],
    },
    {
        role: "Software Engineer Intern",
        companyName: "Wavelet Solutions",
        companyLogoUrl: WaveletLogo,
        start_date: formatFromMMMYYYY("Jan 2024"),
        end_date: formatFromMMMYYYY("Jun 2024"),
        listDescription: [
            "Optimized infrastructure and ensured reliability for an ERP processing 1M+ monthly financial transactions.",
            "Engineered asynchronous ETL job processors to migrate 5M+ records to a centralized data lake.",
            "Designed RESTful APIs using Spring Boot, enforcing strict error handling to meet a 99.9% uptime SLA.",
            "Developed and deployed a UI module for 10+ applets, adopted by thousands of enterprise users.",
            "Refactored a mobile app to improve performance and cut page loading times by 30%.",
        ],
        tags: ["SQL", "AWS", "Java", "Angular", "ETL", "Flutter"],
    },
    {
        role: "Embedded Software Engineer Intern",
        companyName: "Western Digital",
        companyLogoUrl: WesternDigitalLogo,
        start_date: formatFromMMMYYYY("Nov 2023"),
        end_date: formatFromMMMYYYY("Jan 2024"),
        listDescription: [
            "Engineered firmware features and failure analysis scripts for enterprise HDDs.",
            "Reduced the host interface team's bug backlog by 21%.",
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
