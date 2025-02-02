import Navbar from "@/components/ui/Navbar";
import { WorkInfo } from "@/lib/types";
import WesternDigitalLogo from "@/assets/western-digital.png";
import WaveletLogo from "@/assets/wavelet.jpeg";
import MonashLogo from "@/assets/monash.webp";
import SunwayLogo from "@/assets/sunway.jpg";
import StAndrewsLogo from "@/assets/st-andrews.png";
import WorkRow from "@/components/ui/work-row";
import { formatFromMMMYYYY } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";

export default function WorkPage() {
  const workInfo: WorkInfo[] = [
    {
      role: "Software Engineer",
      companyName: "Wavelet Solutions",
      companyLogoUrl: WaveletLogo,
      start_date: formatFromMMMYYYY("Jan 2024"),
      end_date: formatFromMMMYYYY("Dec 2024"),
      listDescription: [
        "Interned from January to July, and worked on a remote freelance basis from July to December.",
        "Built frontend features and resolved bugs in Flutter (mobile) and Angular + NGRX (web).",
        "Utilized AWS services such as EC2, S3, RDS, and Lambda to efficiently scale and deploy applications.",
        "Engineered and maintained various CRUD RESTful APIs for frontend features and bug fixes",
        "Executed a major data migration project from MySQL to PostgreSQL; built and ran multiple ETL pipelines."
      ],
      tags: ["Flutter", "Angular", "NGRX", "AWS", "Java", "PostgreSQL", "ETL"]
    },
    {
      role: "Teaching Assistant",
      companyName: "Monash University",
      companyLogoUrl: MonashLogo,
      start_date: formatFromMMMYYYY("Feb 2023"),
      end_date: formatFromMMMYYYY("Dec 2024"),
      listDescription: [
        "Teaching Assistant for FIT2014: Theory of computation during 2024.",
        "Tutor for FIT1045: Introduction to programming during 2023."
      ],
      tags: ["Theory of Computation", "Programming"]
    },
    {
      role: "Firmware Engineer Intern",
      companyName: "Western Digital",
      companyLogoUrl: WesternDigitalLogo,
      start_date: formatFromMMMYYYY("Nov 2023"),
      end_date: formatFromMMMYYYY("Jan 2024"),
      listDescription: [
        "Developed, and maintained eHDD firmware through unit testing, continuous integration, and agile methodologies.",
        "Worked with the Host Interface scrum team, where I helped to lower the average bugs per sprint by 21%.",
        "Resolved multiple high-priority bugs for major Fortune 500 companies.",
        "Participated in significant technical investigations from problem statement to conclusions."
      ],
      tags: ["Unit Testing", "Multithreaded development", "C/C++"]
    }
  ];

  const scholarships: WorkInfo[] = [
    {
      role: "Monash High Achiever Award",
      companyLogoUrl: MonashLogo,
    },
    {
      role: "Jeffrey Cheah Entrance Scholarship",
      companyLogoUrl: SunwayLogo,
    },
    {
      role: "St Andrews Mathematics Challenge Award",
      companyLogoUrl: StAndrewsLogo,
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
                click row to see details
              </div>
            </div>
            <Accordion type="multiple" className="flex flex-col gap-4">
              {workInfo.map((work, idx) => (
                <WorkRow key={idx} workInfo={work} idx={idx} />
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
