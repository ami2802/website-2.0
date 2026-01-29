"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiSubstack } from "react-icons/si";
import { projectsData, workData } from "@/lib/content_data";
import bgImage from "@/assets/background.jpg";
import ProjectRow from "@/components/sections/project-row";
import WorkRow from "@/components/sections/work-row";
import BlogRow, { MergedPost } from "@/components/sections/blog-row";
import { Accordion } from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import iso3166 from "iso-3166-1";

interface HomeClientProps {
    blogPosts: MergedPost[];
    location: string;
}

export default function HomeClient({ blogPosts, location }: HomeClientProps) {
    const [activeTab, setActiveTab] = React.useState("about");
    const router = useRouter();

    const countryData = iso3166.whereCountry(location);
    const displayLocation = countryData ? countryData.country : "Singapore";
    const flagCode = countryData ? countryData.alpha2.toLowerCase() : "sg";

    React.useEffect(() => {
        if (activeTab === "blog") {
            blogPosts.forEach((post) => {
                if (post.url.startsWith("/blog/")) {
                    router.prefetch(post.url);
                }
            });
        }
    }, [activeTab, blogPosts, router]);

    React.useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "");
            if (["about", "work", "projects", "blog"].includes(hash)) {
                setActiveTab(hash);
            }
        };

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const socialButtonStyle =
        "text-slate-600 dark:text-slate-200 text-2xl bg-slate-100/50 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-800 p-2 h-full w-full aspect-square transition rounded-lg hover:scale-105 border border-slate-200 dark:border-slate-800";

    const socials = [
        {
            glyph: <FaLinkedinIn className={socialButtonStyle} />,
            link: "https://www.linkedin.com/in/amirulazizol/",
        },
        {
            glyph: <FaGithub className={socialButtonStyle} />,
            link: "https://github.com/ami2802",
        },
        {
            glyph: <SiSubstack className={cn(socialButtonStyle, "p-[10px]")} />,
            link: "https://brightcosmo.substack.com",
        },
        {
            glyph: <MdEmail className={socialButtonStyle} />,
            link: "mailto:amirulazizol.dev@gmail.com",
        },
    ];

    return (
        <main className="min-h-screen bg-background md:h-screen md:overflow-hidden relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none grayscale contrast-125 opacity-[0.03] dark:opacity-[0.05]">
                <Image
                    src={bgImage}
                    alt="Background pattern"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* MOBILE NAVBAR */}
            <div className="md:hidden">
                <Navbar onTabChange={setActiveTab} />
            </div>

            <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-6 pb-6 pt-24 md:p-12 gap-6 lg:gap-12 items-start md:h-full relative z-10">
                {/* LEFT SIDEBAR */}
                <aside className="w-full md:w-1/3 flex flex-col gap-8 h-fit md:h-full md:overflow-y-auto no-scrollbar pt-4 md:mt-8 pr-4">
                    {/* PROFILE */}
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-3xl md:text-[2.5rem] text-slate-900 dark:text-slate-100 tracking-tight leading-tight animate-fade-in-up">
                            Amirul Azizol
                        </h1>
                        <h2 className="font-medium text-lg md:text-xl text-slate-600 dark:text-slate-300 tracking-tight animate-fade-in-up delay-200 opacity-0">
                            Machine Learning Engineer
                        </h2>

                        {/* LOCATION */}
                        <div className="flex items-center gap-2 mt-4 px-3 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 w-fit">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Currently in:{" "}
                                <span className="text-slate-900 dark:text-slate-100 font-semibold inline-flex items-center gap-1.5">
                                    {displayLocation}
                                    <img
                                        src={`https://flagcdn.com/${flagCode}.svg`}
                                        alt={`${displayLocation} Flag`}
                                        className="w-5 h-auto inline-block mb-0.5 border border-black rounded-[2px]"
                                    />
                                </span>
                            </span>
                        </div>

                        {/* SOCIALS */}
                        <div className="flex flex-row gap-3 mt-4">
                            {socials.map((social, idx) => (
                                <Link
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    key={idx}
                                    href={social.link}
                                >
                                    {social.glyph}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* TOOLKIT */}
                    <div className="hidden md:flex flex-col gap-4 mt-8">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                            My Toolkit
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { src: "python/python-original.svg", name: "Python" },
                                { src: "pytorch/pytorch-original.svg", name: "PyTorch" },
                                { src: "https://cdn.simpleicons.org/langchain", name: "LangChain", isUrl: true, darkInvert: true },
                                { src: "cplusplus/cplusplus-original.svg", name: "C++" },
                                { src: "java/java-original.svg", name: "Java" },
                                { src: "swift/swift-original.svg", name: "Swift" },
                                { src: "typescript/typescript-original.svg", name: "TypeScript" },
                                { src: "react/react-original.svg", name: "React" },
                                { src: "nextjs/nextjs-original.svg", name: "Next.js" },
                                { src: "angularjs/angularjs-original.svg", name: "Angular" },
                                { src: "nodejs/nodejs-original.svg", name: "Node.js" },
                                { src: "fastapi/fastapi-original.svg", name: "FastAPI" },
                                { src: "spring/spring-original.svg", name: "Spring Boot" },
                                { src: "amazonwebservices/amazonwebservices-original-wordmark.svg", name: "AWS", darkInvert: true },
                                { src: "googlecloud/googlecloud-original.svg", name: "GCP" },
                                { src: "kubernetes/kubernetes-plain.svg", name: "Kubernetes" },
                                { src: "docker/docker-original.svg", name: "Docker" },
                                { src: "jenkins/jenkins-original.svg", name: "Jenkins" },
                                { src: "postgresql/postgresql-original.svg", name: "PostgreSQL" },
                            ].map((tech, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all cursor-default group"
                                >
                                    <span className="relative w-4 h-4 transition-transform group-hover:scale-110">
                                        <img
                                            src={tech.isUrl ? tech.src : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.src}`}
                                            alt={tech.name}
                                            className={`w-full h-full object-contain ${tech.darkInvert ? "dark:brightness-0 dark:invert" : ""}`}
                                        />
                                    </span>
                                    <span>{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <div className="w-full md:w-2/3 max-w-2xl flex flex-col gap-0 pt-4 md:pt-0 md:mt-10 md:h-full pr-0 pb-0">
                    <div className="hidden md:flex flex-row gap-6 pb-4 mb-4 flex-shrink-0">
                        <button
                            onClick={() => setActiveTab("about")}
                            className={cn(
                                "cursor-pointer text-lg transition-colors hover:text-slate-900 dark:hover:text-slate-100",
                                activeTab === "about"
                                    ? "font-bold text-slate-900 dark:text-slate-100"
                                    : "text-slate-500 dark:text-slate-400 font-medium",
                            )}
                        >
                            about
                        </button>
                        <button
                            onClick={() => setActiveTab("work")}
                            className={cn(
                                "cursor-pointer text-lg transition-colors hover:text-slate-900 dark:hover:text-slate-100",
                                activeTab === "work"
                                    ? "font-bold text-slate-900 dark:text-slate-100"
                                    : "text-slate-500 dark:text-slate-400 font-medium",
                            )}
                        >
                            work
                        </button>
                        <button
                            onClick={() => setActiveTab("projects")}
                            className={cn(
                                "cursor-pointer text-lg transition-colors hover:text-slate-900 dark:hover:text-slate-100",
                                activeTab === "projects"
                                    ? "font-bold text-slate-900 dark:text-slate-100"
                                    : "text-slate-500 dark:text-slate-400 font-medium",
                            )}
                        >
                            projects
                        </button>
                        <button
                            onClick={() => setActiveTab("blog")}
                            className={cn(
                                "cursor-pointer text-lg transition-colors hover:text-slate-900 dark:hover:text-slate-100",
                                activeTab === "blog"
                                    ? "font-bold text-slate-900 dark:text-slate-100"
                                    : "text-slate-500 dark:text-slate-400 font-medium",
                            )}
                        >
                            blog
                        </button>
                        <Link
                            href="/resume.pdf"
                            target="_blank"
                            className="group flex items-center gap-1 text-lg font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                        >
                            resume{" "}
                            <ArrowUpRight className="w-4 h-4 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-8 flex-grow md:overflow-y-auto no-scrollbar pb-24 pr-4">
                        {/* WORK */}
                        <section
                            id="work"
                            className={cn(
                                "scroll-mt-32",
                                activeTab !== "work" ? "md:hidden" : "",
                            )}
                        >
                            <div className="flex flex-col gap-6">
                                <div className="text-2xl font-bold text-slate-700 dark:text-slate-200 md:hidden">
                                    work
                                </div>
                                <Accordion key={activeTab} type="multiple" className="flex flex-col gap-4">
                                    {workData.map((work, idx) => (
                                        <WorkRow key={idx} workInfo={work} idx={idx} />
                                    ))}
                                </Accordion>
                            </div>
                        </section>

                        {/* PROJECTS */}
                        <section
                            id="projects"
                            className={cn(
                                "scroll-mt-32",
                                activeTab !== "projects" ? "md:hidden" : "",
                            )}
                        >
                            <div className="flex flex-col gap-6">
                                <div className="text-2xl font-bold text-slate-700 dark:text-slate-200 md:hidden">
                                    projects
                                </div>
                                <Accordion key={activeTab} type="multiple" className="flex flex-col gap-4">
                                    {projectsData.map((project, idx) => (
                                        <ProjectRow key={idx} projectInfo={project} idx={idx} />
                                    ))}
                                </Accordion>
                            </div>
                        </section>

                        {/* BLOG */}
                        <section
                            id="blog"
                            className={cn(
                                "scroll-mt-32",
                                activeTab !== "blog" ? "md:hidden" : "",
                            )}
                        >
                            <div className="flex flex-col gap-6">
                                <div className="text-2xl font-bold text-slate-700 dark:text-slate-200 md:hidden">
                                    blog
                                </div>
                                <div className="flex flex-col gap-4">
                                    {blogPosts.map((post, idx) => (
                                        <BlogRow key={idx} post={post} idx={idx} />
                                    ))}
                                    {blogPosts.length === 0 && (
                                        <p className="text-slate-500 dark:text-slate-400 italic">
                                            No posts found.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* ABOUT */}
                        <section
                            id="about"
                            className={cn(
                                "scroll-mt-32",
                                activeTab !== "about" ? "md:hidden" : "",
                            )}
                        >
                            <div className="flex flex-col gap-8 max-w-2xl">
                                <div className="text-2xl font-bold text-slate-700 dark:text-slate-200 md:hidden">
                                    about
                                </div>
                                <div className="space-y-6">
                                    <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                        I am a {new Date().getFullYear() - 2003 - (new Date() < new Date(new Date().getFullYear(), 1, 28) ? 1 : 0)}-year old ML engineer at{" "}
                                        <Link
                                            href="https://www.transperfect.com"
                                            target="_blank"
                                            className="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                        >
                                            TransPerfect
                                        </Link>
                                        , currently working on on-device NLU for a voice
                                        assistant serving 500M+ users globally. I'm also following the
                                        latest research in computational linguistics and AI safety.
                                    </p>
                                    <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                        I graduated from{" "}
                                        <Link
                                            href="https://www.monash.edu"
                                            target="_blank"
                                            className="font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-600/30 px-2 py-0.5 rounded-full hover:bg-slate-300 dark:hover:bg-slate-900/50 transition-colors"
                                        >
                                            Monash University
                                        </Link>{" "}
                                        in 2025 with a high distinction grade. I maintained the HAA
                                        scholarship for all 3 years (awarded to the top 1%), and
                                        was one of seven recipients of the IBL scholarship in 2024.
                                    </p>
                                    <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                        I like to think of myself as someone who wears many
                                        hats. During my university years, I won multiple hackathons
                                        and competitive programming competitions while also being an
                                        esports commentator, a political writer, and a teaching
                                        assistant. Nowadays, I've been getting into architectural photography, Formula 1,
                                        drumming, and TFT (peaked diamond).
                                    </p>
                                    <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Before university, I grew up in the UK, Saudi Arabia, and Malaysia.
                                        My experience as a third culture kid has been invaluable, but it comes from
                                        being a wanderer without a home. My philosophy is strongly rooted in{" "}
                                        <Link
                                            href="/learning-to-be-good"
                                            target="_blank"
                                            className="font-semibold text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors cursor-pointer outline-none"
                                        >
                                            learning by doing
                                        </Link>
                                        , so I want to do as much as I can with my life.
                                    </p>
                                </div>

                                {/* MOBILE LOADOUT */}
                                <div className="flex flex-col gap-4 md:hidden">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                                        My Toolkit
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { src: "python/python-original.svg", name: "Python" },
                                            { src: "pytorch/pytorch-original.svg", name: "PyTorch" },
                                            { src: "https://cdn.simpleicons.org/langchain", name: "LangChain", isUrl: true, darkInvert: true },
                                            { src: "cplusplus/cplusplus-original.svg", name: "C++" },
                                            { src: "java/java-original.svg", name: "Java" },
                                            { src: "swift/swift-original.svg", name: "Swift" },
                                            { src: "typescript/typescript-original.svg", name: "TypeScript" },
                                            { src: "react/react-original.svg", name: "React" },
                                            { src: "nextjs/nextjs-original.svg", name: "Next.js" },
                                            { src: "angularjs/angularjs-original.svg", name: "Angular" },
                                            { src: "nodejs/nodejs-original.svg", name: "Node.js" },
                                            { src: "fastapi/fastapi-original.svg", name: "FastAPI" },
                                            { src: "spring/spring-original.svg", name: "Spring Boot" },
                                            { src: "amazonwebservices/amazonwebservices-original-wordmark.svg", name: "AWS", darkInvert: true },
                                            { src: "googlecloud/googlecloud-original.svg", name: "GCP" },
                                            { src: "kubernetes/kubernetes-plain.svg", name: "Kubernetes" },
                                            { src: "docker/docker-original.svg", name: "Docker" },
                                            { src: "jenkins/jenkins-original.svg", name: "Jenkins" },
                                            { src: "postgresql/postgresql-original.svg", name: "PostgreSQL" },
                                        ].map((tech, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all cursor-default group"
                                            >
                                                <span className="relative w-4 h-4 transition-transform group-hover:scale-110">
                                                    <img
                                                        src={tech.isUrl ? tech.src : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.src}`}
                                                        alt={tech.name}
                                                        className={`w-full h-full object-contain ${tech.darkInvert ? "dark:brightness-0 dark:invert" : ""}`}
                                                    />
                                                </span>
                                                <span>{tech.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div >
        </main >
    );
}
