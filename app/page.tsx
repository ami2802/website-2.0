"use client";
import { Button } from "@/components/ui/button";
import NavbarDropdown from "@/components/ui/navbar-dropdown";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdOutlineSpaceDashboard } from "react-icons/md";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  const links = [
    { text: "work", link: "/work" },
    { text: "projects", link: "/projects" },
    { text: "resume", link: "/resume.pdf" },
    { text: "blog", link: "https://ami2802.substack.com/" },
  ];

  const urls = {
    "github": "https://github.com/ami2802",
    "linkedin": "https://www.linkedin.com/in/amirulazizol/",
    "email": "mailto:amirulazizol.dev@gmail.com",
    // "instagram": "https://www.instagram.com/amirul.4z/",
  }
72
  const texts = {
    "name": "Amirul Azizol",
    "title": "Machine Learning Engineer",
    "description": "is an early-career machine learning engineer based in Singapore.\nI work with NLP & LLM pipelines and scalable backend systems.\nI'm also interested in computational linguistics and AI safety. Feel free to reach out!",
  }

  const socialButtonStyle =
    "text-slate-500 dark:text-slate-300 text-2xl hover:bg-slate-200 dark:hover:bg-slate-800 p-2 h-full w-full aspect-square transition rounded-lg hover:scale-105";

  const mobileSocialIconStyle = "text-white";

  const socials = [
    // {
    //   glyph: <FaInstagram className={socialButtonStyle} />,
    //   link: urls.instagram,
    // },
    {
      glyph: <FaLinkedinIn className={socialButtonStyle} />,
      link: urls.linkedin,
    },
    {
      glyph: <FaGithub className={socialButtonStyle} />,
      link: urls.github,
    },
    {
      glyph: <MdEmail className={socialButtonStyle} />,
      link: urls.email,
    },
  ];

  const mobileSocials = [
    {
      glyph: (
        <MdEmail fontSize="1.75em" className={cn(mobileSocialIconStyle)} />
      ),
      link: urls.email,
    },
    {
      glyph: (
        <FaGithub fontSize="1.75em" className={cn(mobileSocialIconStyle)} />
      ),
      link: urls.github,
    },
    {
      glyph: (
        <FaLinkedinIn fontSize="1.5em" className={cn(mobileSocialIconStyle)} />
      ),
      link: urls.linkedin,
    },
    // {
    //   glyph: (
    //     <FaInstagram fontSize="1.75em" className={cn(mobileSocialIconStyle)} />
    //   ),
    //   link: urls.instagram,
    // },
  ];

  const [imageEffect, setImageEffect] = useState<boolean>(false);

  return (
    <main className="flex h-[100vh] flex-col justify-center items-center p-4 sm:p-24 bg-slate-100 dark:bg-midnight">
    <div className="md:hidden absolute rounded-3xl shadow-2xl shadow-gray-400 dark:shadow-black w-full max-w-[26em] bg-white/80 dark:bg-slate-900/80 z-0" />
    {/* Mobile */}
    <div className="md:hidden flex flex-col rounded-3xl shadow-2xl shadow-gray-400 dark:shadow-black overflow-hidden w-full max-w-[26em] z-10 bg-gradient-to-b from-gray-300 to-gray-700 dark:from-slate-700 dark:to-slate-900">
      {/* Banner content */}
      <div className="relative w-full aspect-square z-0 flex flex-col justify-between">
        
        {/* Top bar */}
        <div className="z-10 p-6 absolute left-0 top-0 right-0">
          <div className="flex flex-row gap-4 justify-between items-start">
            <NavbarDropdown asChild forceDarkShadow>
              <Button
                size="icon"
                variant="ghost"
                className="bg-moretransparent rounded-full hover:bg-semiopaque transition ease-in-out hover:scale-110 hover:-rotate-12 focus:outline-none ring-0"
              >
                <MdOutlineSpaceDashboard
                  fontSize="1.75em"
                  className="text-white"
                />
              </Button>
            </NavbarDropdown>
            <div className="flex flex-col gap-3 items-center">
              {mobileSocials.map((social, idx) => (
                <Button
                  key={idx}
                  size="icon"
                  variant="ghost"
                  className="bg-moretransparent rounded-full hover:bg-semiopaque transition ease-in-out hover:scale-110 hover:-rotate-12 focus-visible:ring-0"
                  asChild
                >
                  <Link href={social.link}>{social.glyph}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="z-10 p-6 absolute left-0 bottom-0 w-full">
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-4xl text-white tracking-tight">{texts.name}</h1>
            <h2 className="font-medium text-xl text-slate-200 tracking-tight">{texts.title}</h2>
          </div>
        </div>

      </div>
    </div>
      {/* Web */}
      <div className="hidden md:flex flex-col md:flex-row gap-6 lg:gap-10 max-w-6xl items-center justify-center rounded-xl relative z-10 bg-customGray">
        {/* Content */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col justify-center lg:gap-5 w-full flex-1">
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-3xl lg:text-5xl text-slate-700 dark:text-slate-100 tracking-tight">
                {texts.name}
              </h2>
              <div className="max-w-xl">
                <p className="font-medium text-l lg:text-l text-slate-500 dark:text-slate-400 tracking-tight whitespace-pre-line">
                  {texts.description}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-2 -ml-3">
            <div className="flex flex-row gap-200 items-center">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.link}
                  className="text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-2 rounded-lg transition font-medium hover:scale-105"
                  target={link.text === "resume" ? "_blank" : undefined}
                  rel={link.text === "resume" ? "noopener noreferrer" : undefined}
                >
                  {link.text}
                </Link>
              ))}
            </div>
            <div className="flex flex-row gap-2 items-center h-full w-full justify-end">
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
          </div>
        </div>
      </div>
      <Analytics />
    </main>
  );
}