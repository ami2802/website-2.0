import Navbar from "@/components/ui/Navbar";
import { WorkInfo } from "@/lib/types";
import WesternDigitalLogo from "@/assets/western-digital.png";
import WaveletLogo from "@/assets/wavelet.jpeg";
import MonashLogo from "@/assets/monash.webp";
import TransPerfectLogo from "@/assets/transperfect.jpeg";
import WorkRow from "@/components/ui/work-row";
import { formatFromMMMYYYY } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";

export default function WorkPage() {
  const workInfo: WorkInfo[] = [
    {
      role: "Machine Learning Engineer",
      companyName: "TransPerfect",
      companyLogoUrl: TransPerfectLogo,
      start_date: formatFromMMMYYYY("Apr 2025"),
      listDescription: [
        "Engineered ML pipelines for Malay voice assistant capabilities, covering ASR, NLU, TTS, and agentic LLMs.",
        "Fine-tuned transformer-based semantic parsing and execution routing models; resolved 200+ regression bugs while maintaining 95% recall and precision across key intent categories.",
        "Designed and executed ML experiments on preprocessed datasets, achieving a 23% reduction in data noise via automated filtering heuristics.",
        "Collaborated with data curators to construct high-quality datasets spanning 14 domains (10K+ entries).",
        "Automated end-to-end UI interaction for voice assistant, reducing manual QA effort by 90%.",
        "Delivered 50+ localized health features by implementing new logic, triaging bugs, and validating integration tests."
      ],
      tags: ["PyTorch", "Ray", "Kubernetes", "Python", "Swift"]
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
        "Designed RESTful APIs using Java Spring Boot, enforcing strict error handling to meet a 99.9% uptime SLA.",
        "Owned the end-to-end deployment of a configurable UI module across 10+ system components, impacting thousands of enterprise users."
      ],
      tags: ["SQL", "AWS", "Java", "Angular", "ETL"]
    },
    {
      role: "Firmware Engineer Intern",
      companyName: "Western Digital",
      companyLogoUrl: WesternDigitalLogo,
      start_date: formatFromMMMYYYY("Nov 2023"),
      end_date: formatFromMMMYYYY("Jan 2024"),
      listDescription: [
        "Developed C++ firmware features for enterprise HDDs and Python automation scripts for failure analysis.",
        "Implemented retry logic for hardware tests in Jenkins pipelines, reducing false positive build failure rates.",
        "Reduced outstanding bugs by 21% for the host interface team."
      ],
      tags: ["C/C++", "Python", "Jenkins", "CI/CD"]
    },
    {
      role: "Teaching Assistant",
      companyName: "Monash University",
      companyLogoUrl: MonashLogo,
      start_date: formatFromMMMYYYY("Jan 2023"),
      end_date: formatFromMMMYYYY("Dec 2024"),
      listDescription: [
        "TA and marker for FIT2014 (Theory of Computation) and FIT1045 (Intro to Programming)."
      ],
    }
  ];


  // const scholarships: WorkInfo[] = [
  //   {
  //     role: "Monash Industry Based Learning Scholarship",
  //     companyLogoUrl: MonashLogo,
  //   },
  //   {
  //     role: "Monash High Achiever Award",
  //     companyLogoUrl: MonashLogo,
  //   },
  //   {
  //     role: "Jeffrey Cheah Entrance Scholarship",
  //     companyLogoUrl: SunwayLogo,
  //   },
  // ];

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-8 md:p-24 bg-slate-100 dark:bg-midnight">
      <div className="flex flex-col gap-4 md:gap-12 max-w-3xl w-full">
        <Navbar page="work" />
        <div className="flex flex-col gap-6 md:gap-10 w-full">
          {/* Work section */}
          <div className="flex flex-col gap-5">
            <div className="text-3xl font-bold text-slate-700 dark:text-slate-200">
              work
              <div className="text-base	font-medium text-slate-500 dark:text-slate-400">
              </div>
            </div>
            <Accordion type="multiple" className="flex flex-col gap-4">
              {workInfo.map((work, idx) => (
                <div
                  key={idx}
                  className={idx === 0 ? "mb-5 bg-white dark:bg-slate-900 p-4 rounded-xl" : ""}
                >
                  {idx === 0 && (
                    <div className="text-base font-medium text-slate-500 dark:text-slate-400 mb-2">
                      current role
                    </div>
                  )}
                  <WorkRow workInfo={work} idx={idx} />
                </div>
              ))}
            </Accordion>
          </div>

          {/* scholarships section */}
          {/* <div className="flex flex-col gap-5">
            <div className="text-3xl font-bold text-slate-700 dark:text-slate-200">
              awards
            </div>
            <Accordion type="multiple" className="flex flex-col gap-4">
              {scholarships.map((work, idx) => (
                <WorkRow key={idx} workInfo={work} idx={idx} />
              ))}
            </Accordion>
          </div> */}
        </div>
      </div>
    </main>
  );
}
