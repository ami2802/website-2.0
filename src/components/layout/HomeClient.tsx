"use client";

import * as React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiArrowUpRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import bgImage from "@/assets/background.jpg";
import personalPhoto from "@/assets/me.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { workData, projectsData } from "@/lib/content_data";
import { Accordion } from "@/components/ui/accordion";
import WorkRow from "@/components/sections/work-row";
import ProjectRow from "@/components/sections/project-row";
import BlogRow, { MergedPost } from "@/components/sections/blog-row";

interface HomeClientProps {
    blogPosts: MergedPost[];
}

export default function HomeClient({ blogPosts }: HomeClientProps) {
    const [isAboutExpanded, setIsAboutExpanded] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        if (blogPosts) {
            blogPosts.forEach((post) => {
                if (post.url.startsWith("/blog/")) {
                    router.prefetch(post.url);
                }
            });
        }
    }, [blogPosts, router]);

    const socialButtonStyle =
        "text-title text-xl hover:bg-interactive-hover p-2 h-full w-full aspect-square transition rounded-lg hover:scale-105";

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
            glyph: <MdEmail className={socialButtonStyle} />,
            link: "mailto:amirulazizol.dev@gmail.com",
        },
    ];

    return (
        <main className="min-h-screen bg-background">
            {/* Background Image */}
            <div className="fixed inset-0 z-0 pointer-events-none grayscale contrast-125 opacity-[0.03] dark:opacity-[0.05]">
                <Image
                    src={bgImage}
                    alt="Background pattern"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24">
                {/* Hero Section */}
                <section className="flex flex-col-reverse md:flex-row items-start md:items-stretch justify-between gap-8 md:gap-12 mb-4">
                    {/* Hero Content */}
                    <div className="flex flex-col gap-2 items-start flex-1 px-4">
                        <h1 className="font-[family-name:var(--font-noto)] font-medium text-4xl md:text-6xl text-heading tracking-tight leading-none text-left">
                            Amirul Azizol
                        </h1>
                        <h2 className="font-light text-lg md:text-xl text-muted-custom tracking-tight text-left animate-swipe-in delay-500 opacity-0">
                            Machine Learning Engineer
                        </h2>

                        {/* Social Links */}
                        <div className="flex flex-row gap-3 my-auto items-center">
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

                        {/* About Summary */}
                        <p className="text-base md:text-lg text-body leading-relaxed mt-auto text-left md:pr-6 mb-0">
                            I'm a {new Date().getFullYear() - 2003 - (new Date() < new Date(new Date().getFullYear(), 1, 28) ? 1 : 0)}-year-old engineer building AI for 500M+ users at{" "}
                            <Link
                                href="https://www.transperfect.com/industries/technology"
                                target="_blank"
                                className="font-semibold text-[#00629B] dark:text-[#60A5FA] hover:underline transition-colors"
                            >
                                TransPerfect
                            </Link>. I recently graduated from{" "}
                            <Link
                                href="https://www.monash.edu/it"
                                target="_blank"
                                className="font-semibold text-[#005282] dark:text-[#7DD3FC] hover:underline transition-colors"
                            >
                                Monash University
                            </Link>{" "}
                            (2025) with a degree in Computer Science.
                        </p>
                    </div>

                    {/* Profile Photo */}
                    <div className="w-40 md:w-60 shrink-0 group mb-1 ml-4 md:ml-0">
                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200 dark:border-slate-800 transition-transform duration-500 hover:scale-[1.02]">
                            <Image
                                src={personalPhoto}
                                alt="Amirul Azizol"
                                fill
                                className="object-cover scale-[2] object-[60%_60%]"
                                priority
                            />
                        </div>
                    </div>
                </section>

                {/* Expandable About Content */}
                <div
                    className={`grid transition-all duration-500 ease-in-out ${isAboutExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                        }`}
                >
                    <div className={`overflow-hidden min-h-0 ${isAboutExpanded ? "-m-1 p-1" : "m-0 p-0"}`}>
                        <div className="space-y-4 px-4">
                            <p className="text-base md:text-lg text-body leading-relaxed">
                                Before university, I grew up in England, Saudi Arabia, and Malaysia.
                                Being a{" "}
                                <Link
                                    href="https://en.wikipedia.org/wiki/Third_culture_kid"
                                    target="_blank"
                                    className="font-semibold text-teal-700 dark:text-teal-400 hover:underline transition-colors"
                                >
                                    third-culture kid
                                </Link>{" "}
                                has given me a global perspective, even though it means never quite having a home.
                                My philosophy is strongly rooted in{" "}
                                <Link
                                    href="https://classics.mit.edu/Aristotle/nicomachaen.2.ii.html"
                                    target="_blank"
                                    className="font-semibold text-amber-700 dark:text-amber-400 hover:underline transition-colors cursor-pointer outline-none"
                                >
                                    learning by doing
                                </Link>
                                , so I want to do as much as I can with my life.
                            </p>
                            <p className="text-base md:text-lg text-body leading-relaxed">
                                At Monash, I earned the HAA scholarship (top 1%) and was one of seven recipients of the 2024 IBL scholarship.
                                But I learned just as much outside the classroom. Aside from hackathons and competitive programming,
                                I casted esports matches, wrote{" "}
                                <Link
                                    href="https://monpacmum.wordpress.com/2024/09/15/world-war-ii-the-catalyst-for-malaysian-independence/"
                                    target="_blank"
                                    className="font-semibold text-rose-700 dark:text-rose-400 hover:underline transition-colors"
                                >
                                    political articles
                                </Link>, and co-founded a{" "}
                                <Link
                                    href="https://www.instagram.com/monashtennisclub/"
                                    target="_blank"
                                    className="font-semibold text-lime-700 dark:text-lime-400 hover:underline transition-colors"
                                >
                                    tennis club
                                </Link>{" "}
                                which grew to hundreds of members.
                            </p>
                            <p className="text-base md:text-lg text-body leading-relaxed">
                                Nowadays, I've been getting into photography, Formula 1, drumming, and{" "}
                                <Link
                                    href="https://tactics.tools/player/sg/cosmo/rool"
                                    target="_blank"
                                    className="hover:underline transition-colors"
                                >
                                    TFT
                                </Link>. I've retained my passion for research
                                and follow the latest work in computational linguistics and AI safety.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Single Toggle Button */}
                <div className="px-4 mt-2 mb-20">
                    <button
                        onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-body hover:bg-interactive-hover rounded-lg transition-all hover:scale-105 cursor-pointer"
                    >
                        {isAboutExpanded ? (
                            <>Show less <FiChevronUp /></>
                        ) : (
                            <>Read more <FiChevronDown /></>
                        )}
                    </button>
                </div>

                {/* Experience Section */}
                <section id="experience" className="mb-20">
                    <div className="flex flex-row justify-between items-end mb-8 px-4">
                        <h2 className="font-[family-name:var(--font-noto)] text-3xl font-medium text-title">
                            Experience
                        </h2>
                        <Link
                            href="/resume.pdf"
                            target="_blank"
                            className="px-3 py-1 flex items-center text-sm text-body hover:bg-interactive-hover rounded-lg transition hover:scale-105 gap-1"
                        >
                            Resume <FiArrowUpRight className="opacity-70" />
                        </Link>
                    </div>
                    <Accordion type="multiple" className="flex flex-col">
                        {workData.map((work, idx) => (
                            <WorkRow key={idx} workInfo={work} idx={idx} />
                        ))}
                    </Accordion>
                </section>

                {/* Projects Section */}
                <section id="projects" className="mb-20">
                    <h2 className="font-[family-name:var(--font-noto)] text-3xl font-medium text-title mb-8 px-4">
                        Projects
                    </h2>
                    <Accordion type="multiple" className="flex flex-col">
                        {projectsData.map((project, idx) => (
                            <ProjectRow key={idx} projectInfo={project} idx={idx} />
                        ))}
                    </Accordion>
                </section>

                {/* Blog Section */}
                {blogPosts.length > 0 && (
                    <section id="blog" className="mb-20">
                        <h2 className="font-[family-name:var(--font-noto)] text-3xl font-medium text-title mb-8 px-4">
                            Blog
                        </h2>
                        <div className="flex flex-col">
                            {blogPosts.map((post, idx) => (
                                <BlogRow key={idx} post={post} idx={idx} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
