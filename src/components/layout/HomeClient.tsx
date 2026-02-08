"use client";

import * as React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import bgImage from "@/assets/background.jpg";
import personalPhoto from "@/assets/me.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { workData, projectsData } from "@/lib/content_data";
import {
    Accordion,
} from "@/components/ui/accordion";
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
        "text-title text-xl bg-interactive hover:bg-interactive-hover p-1.5 h-full w-full aspect-square transition rounded-lg hover:scale-105 border border-interactive hover:border-interactive-hover";

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
                {/* HERO SECTION - Text left, Photo right */}
                <section className="flex flex-col-reverse md:flex-row items-start justify-between gap-8 md:gap-12 mb-20">
                    {/* Name & Title & Location & Socials - Left */}
                    <div className="flex flex-col gap-2 items-start flex-1">
                        <h1 className="font-[family-name:var(--font-noto)] font-medium text-4xl md:text-6xl text-heading tracking-tight leading-none text-left">
                            Amirul Azizol
                        </h1>
                        <h2 className="font-medium text-lg md:text-xl text-muted-custom tracking-tight text-left">
                            Machine Learning Engineer
                        </h2>

                        {/* SOCIALS + RESUME */}
                        <div className="flex flex-row gap-3 mt-4 items-center">
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
                            <Link
                                href="/resume.pdf"
                                target="_blank"
                                className="px-3 py-1.5 text-xs font-medium text-title bg-interactive hover:bg-interactive-hover rounded-lg transition hover:scale-105 border border-interactive hover:border-interactive-hover"
                            >
                                Resume
                            </Link>
                        </div>

                        {/* About Me - First Paragraph */}
                        <p className="text-base md:text-lg text-body leading-relaxed mt-16 text-left md:pr-6">
                            I'm a {new Date().getFullYear() - 2003 - (new Date() < new Date(new Date().getFullYear(), 1, 28) ? 1 : 0)}-year old engineer based in Singapore who graduated from{" "}
                            <Link
                                href="https://www.monash.edu/it"
                                target="_blank"
                                className="font-semibold text-[#005282] dark:text-[#7DD3FC] hover:underline transition-colors"
                            >
                                Monash University
                            </Link>{" "}
                            in 2025. Currently, I'm at{" "}
                            <Link
                                href="https://www.transperfect.com/industries/technology"
                                target="_blank"
                                className="font-semibold text-[#00629B] dark:text-[#60A5FA] hover:underline transition-colors"
                            >
                                TransPerfect
                            </Link>{" "}
                            building a voice assistant for over 500 million users worldwide.
                        </p>

                        {/* Read More Button - only show when not expanded */}
                        {!isAboutExpanded && (
                            <button
                                onClick={() => setIsAboutExpanded(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-title bg-interactive hover:bg-interactive-hover rounded-lg transition-colors border border-interactive hover:border-interactive-hover cursor-pointer mt-4"
                            >
                                Read more
                            </button>
                        )}
                    </div>

                    {/* Personal Photo - Right */}
                    <div className="w-44 md:w-64 shrink-0 group">
                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200 dark:border-slate-800 transition-transform duration-500 hover:scale-[1.02]">
                            <Image
                                src={personalPhoto}
                                alt="Amirul Azizol"
                                fill
                                className="object-cover scale-110 object-bottom"
                                priority
                            />
                        </div>
                    </div>
                </section>

                {/* EXPANDED ABOUT CONTENT - appears below hero when expanded */}
                {isAboutExpanded && (
                    <section className="mb-20 -mt-12">
                        <div className="space-y-4">
                            <p className="text-base md:text-lg text-body leading-relaxed">
                                During my time at Monash, I maintained the HAA
                                scholarship for all 3 years (awarded to the top 1%), and
                                was one of seven recipients of the IBL scholarship in 2024. But I learned just as much (if not more)
                                outside the classroom. Aside from internships, hackathons, and CP competitions,
                                I did collegiate level esports commentary, political writing, and founded a tennis club which grew to hundreds of members.
                            </p>
                            <p className="text-base md:text-lg text-body leading-relaxed">
                                Nowadays, I've been getting into photography, Formula 1, drumming, and TFT (peaked diamond). I've retained my passion for research
                                and have been following the latest literature in computational linguistics and AI safety.
                            </p>
                            <p className="text-base md:text-lg text-body leading-relaxed">
                                Before university, I grew up in England, Saudi Arabia, and Malaysia.
                                My experience as a third culture kid has been invaluable, but it comes from
                                being a wanderer without a home. My philosophy is strongly rooted in{" "}
                                <Link
                                    href="/learning-to-be-good"
                                    target="_blank"
                                    className="font-semibold text-amber-700 dark:text-amber-300 hover:underline transition-colors cursor-pointer outline-none"
                                >
                                    learning by doing
                                </Link>
                                , so I want to do as much as I can with my life.
                            </p>
                            <button
                                onClick={() => setIsAboutExpanded(false)}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-title bg-interactive hover:bg-interactive-hover rounded-lg transition-colors border border-interactive hover:border-interactive-hover cursor-pointer"
                            >
                                Show less
                            </button>
                        </div>
                    </section>
                )}

                {/* EXPERIENCE SECTION */}
                <section id="experience" className="mb-20">
                    <h2 className="font-[family-name:var(--font-noto)] text-3xl font-medium text-title mb-8">
                        Experience
                    </h2>
                    <Accordion type="multiple" className="flex flex-col gap-4">
                        {workData.map((work, idx) => (
                            <WorkRow key={idx} workInfo={work} idx={idx} />
                        ))}
                    </Accordion>
                </section>

                {/* PROJECTS SECTION */}
                <section id="projects" className="mb-20">
                    <h2 className="font-[family-name:var(--font-noto)] text-3xl font-medium text-title mb-8">
                        Projects
                    </h2>
                    <Accordion type="multiple" className="flex flex-col gap-4">
                        {projectsData.map((project, idx) => (
                            <ProjectRow key={idx} projectInfo={project} idx={idx} />
                        ))}
                    </Accordion>
                </section>

                {/* BLOG SECTION */}
                <section id="blog" className="mb-20">
                    <h2 className="font-[family-name:var(--font-noto)] text-3xl font-medium text-title mb-8">
                        Blog
                    </h2>
                    <div className="flex flex-col gap-4">
                        {blogPosts.map((post, idx) => (
                            <BlogRow key={idx} post={post} idx={idx} />
                        ))}
                        {blogPosts.length === 0 && (
                            <p className="text-muted-custom italic">
                                No posts found.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
