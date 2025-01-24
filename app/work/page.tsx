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
      start_date: formatFromMMMYYYY("Jul 2024"),
      end_date: formatFromMMMYYYY("Dec 2024"),
      listDescription: [
        "Continuing the same roles and responsibilities on a remote, freelance basis for the remainder of my studies."
      ],
      tags: ["Flutter", "Dart", "Angular", "NGRX", "AWS", "Java", "MySQL", "PostgreSQL", "ETL"]
    },
    {
      role: "Software Engineer Intern",
      companyName: "Wavelet Solutions",
      companyLogoUrl: WaveletLogo,
      start_date: formatFromMMMYYYY("Jan 2024"),
      end_date: formatFromMMMYYYY("Jun 2024"),
      listDescription: [
        "Developed new frontend features and fixed bugs in Flutter + Dart (mobile), and Angular + NGRX (web).",
        "Utilized AWS for scaling and deployment of the applications.",
        "Engineered and maintained various CRUD RESTful APIs to facilitate frontend features and bug fixes.",
        "Enhanced the coordination of API calls between in-house microservices within a Java environment.",
        "Worked on a data migration task for a major client to migrate from an on-premise MySQL database to a cloud PostgreSQL database hosted on AWS.",
        "Built and ran multiple ETL pipelines and helped to conduct UAT."
      ],
      tags: ["Flutter", "Dart", "Angular", "NGRX", "AWS", "Java", "MySQL", "PostgreSQL", "ETL"]
    },
    {
      role: "Teaching Assistant",
      companyName: "Monash University",
      companyLogoUrl: MonashLogo,
      start_date: formatFromMMMYYYY("Feb 2023"),
      end_date: formatFromMMMYYYY("Dec 2024"),
      listDescription: [
        "Class assistant for FIT2014: Theory of computation during 2024.",
        "PASS Tutor for FIT1045: Introduction to programming during 2023."
      ],
      tags: ["Teaching", "Theory of Computation", "Programming"]
    },
    {
      role: "Firmware Engineer Intern",
      companyName: "Western Digital",
      companyLogoUrl: WesternDigitalLogo,
      start_date: formatFromMMMYYYY("Nov 2023"),
      end_date: formatFromMMMYYYY("Jan 2024"),
      listDescription: [
        "Designed, developed, tested, integrated, and maintained eHDD firmware through unit testing, continuous integration, and agile methodologies.",
        "Worked with the Host Interface scrum team for firmware development, where I helped to lower the team's rolling average of bugs per sprint by 21%.",
        "Fixed multiple high priority bugs for major Fortune 500 companies."
      ],
      tags: ["Firmware", "Agile", "Scrum", "Bug Fixing"]
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
                click row to see details, click icon to open link
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
