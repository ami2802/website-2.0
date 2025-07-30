import Navbar from "@/components/ui/Navbar";
import { WorkInfo } from "@/lib/types";
import WesternDigitalLogo from "@/assets/western-digital.png";
import WaveletLogo from "@/assets/wavelet.jpeg";
import MonashLogo from "@/assets/monash.webp";
import MonashWarwickLogo from "@/assets/monashwarwick.jpg";
import SunwayLogo from "@/assets/sunway.jpg";
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
        "Served as a vendor language engineer, focusing on multilingual voice assistant features, bugfixes, and R&D.",
        "Fine-tuned model inputs to support Malay/Indonesian, improving understanding accuracy by 25%.",
        "Automated data preprocessing and error analysis pipelines using Python, reducing noise in utterances by 35%.",
        "Improved data pipelines on localized datasets for developing agentic and LLM-driven voice assistant features."
      ],
      tags: ["Natural Language Processing", "Machine Learning", "Swift", "Python", "Java", "Shell"]
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
    },
    {
      role: "Technology Consultant Intern",
      companyName: "Monash Warwick Alliance",
      companyLogoUrl: MonashWarwickLogo,
      start_date: formatFromMMMYYYY("Jun 2024"),
      end_date: formatFromMMMYYYY("Jul 2024"),
      listDescription: [
        "Led a global, cross-functional team of students to improve technical infrastructure for a local tutoring company.",
      ],
    },    
    {
      role: "Software Engineer Intern",
      companyName: "Wavelet Solutions",
      companyLogoUrl: WaveletLogo,
      start_date: formatFromMMMYYYY("Jan 2024"),
      end_date: formatFromMMMYYYY("Jun 2024"),
      listDescription: [
        "Developed, tested, and deployed a major general UI setting applied to 10+ applets in production.",
        "Refactored a Flutter mobile app to improve overall performance, cutting image and video load times by half.",
        "Built queue tables and job processors to migrate millions of records from legacy systems to a datalake.",
        "Performed 20+ micro-frontend deployments, utilizing AWS services such as S3 and Lambda.",
        "Updated and maintained various CRUD RESTful APIs using Java with Spring Boot."
      ],
      tags: ["Flutter", "Angular", "NGRX", "AWS", "Java", "PostgreSQL", "ETL"]
    },
    {
      role: "Firmware Engineer Intern",
      companyName: "Western Digital",
      companyLogoUrl: WesternDigitalLogo,
      start_date: formatFromMMMYYYY("Nov 2023"),
      end_date: formatFromMMMYYYY("Jan 2024"),
      listDescription: [
        "Developed and maintained eHDD firmware using unit testing, CI pipelines, and agile methodologies.",
        "Resolved high priority bugs, including technical investigations and failure analysis on firmware problems.",
        "Reduced the average bugs per sprint by 21% for the host interface team."
      ],
      tags: ["C/C++", "Unit Testing", "Multithreaded development"]
    }
  ];

  const scholarships: WorkInfo[] = [
    {
      role: "Monash Industry Based Learning Scholarship",
      companyLogoUrl: MonashLogo,
    },
    {
      role: "Monash High Achiever Award",
      companyLogoUrl: MonashLogo,
    },
    {
      role: "Jeffrey Cheah Entrance Scholarship",
      companyLogoUrl: SunwayLogo,
    },
  ];

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
          <div className="flex flex-col gap-5">
            <div className="text-3xl font-bold text-slate-700 dark:text-slate-200">
              awards
            </div>
            <Accordion type="multiple" className="flex flex-col gap-4">
              {scholarships.map((work, idx) => (
                <WorkRow key={idx} workInfo={work} idx={idx} />
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
}
