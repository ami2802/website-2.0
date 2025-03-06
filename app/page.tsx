"use client";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Button } from "@/components/ui/button";
import NavbarDropdown from "@/components/ui/navbar-dropdown";
import { cn } from "@/lib/utils";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdOutlineSpaceDashboard } from "react-icons/md";
import ProfilePic from "@/assets/hk.jpg";
import { TextAnimate } from "@/components/ui/text-animate"
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  const links = [
    { text: "work", link: "/work" },
    { text: "projects", link: "/projects" },
    { text: "resume", link: "/resume.pdf" },
  ];

  const urls = {
    "github": "https://github.com/brightcosmo",
    "linkedin": "https://www.linkedin.com/in/amirulazizol/",
    "email": "mailto:amirulazizol.dev@gmail.com",
  }
72
  const texts = {
    "name": "Amirul Azizol",
    "title": "Monash CS Graduate",
    "description": "Previously worked at Wavelet, Western Digital, and studied at Monash University. \nBuilder, researcher, innovator.",
  }

  const socialButtonStyle =
    "text-slate-500 dark:text-slate-300 text-2xl hover:bg-slate-200 dark:hover:bg-slate-800 p-2 h-full w-full aspect-square transition rounded-lg hover:scale-105";

  const mobileSocialIconStyle = "text-white";

  const socials = [
    {
      glyph: <FaGithub className={socialButtonStyle} />,
      link: urls.github,
    },
    {
      glyph: <FaLinkedinIn className={socialButtonStyle} />,
      link: urls.linkedin,
    },
    {
      glyph: <MdEmail className={socialButtonStyle} />,
      link: urls.email,
    },
  ];

  const mobileSocials = [
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
    {
      glyph: (
        <MdEmail fontSize="1.75em" className={cn(mobileSocialIconStyle)} />
      ),
      link: urls.email,
    },
  ];

  const [imageEffect, setImageEffect] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-4 sm:p-24 bg-slate-100 dark:bg-midnight">
    {/* Mobile */}
      <div className="md:hidden flex flex-col rounded-3xl shadow-2xl shadow-gray-400 dark:shadow-black overflow-hidden w-full max-w-[24em]">
        {/* Image container */}
        <div className="relative w-full aspect-square z-0 bg-slate-100 dark:bg-midnight">
          {/* Profile pic */}
          <div className="h-full w-full">
            <Image
              src={ProfilePic}
              alt="Profile picture"
            />
          </div>
          {/* Bottom banner */}
          <div className="z-10 p-6 pt-12 absolute left-0 bottom-0 bg-gradient-to-t from-semiopaque to-transparent w-full">
            <div className="flex flex-col">
              <div className="font-semibold text-3xl text-slate-100 tracking-tight">
                {texts.name}
              </div>
              <div className="font-medium text-lg text-slate-300 tracking-tight">
                {texts.title}
              </div>
            </div>
          </div>

          {/* Top bar */}
          <div className="z-10 p-6 absolute left-0 top-0 right-0">
            <div className="flex flex-row gap-4 justify-between items-start">
              <NavbarDropdown asChild forceDarkShadow>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="bg-moretransparent rounded-full hover:bg-semiopaque transition ease-in-out hover:scale-110 hover:-rotate-12 focus:outline-none ring-0 outline-none border-none focus:ring-0 focus:ring-offset-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <MdOutlineSpaceDashboard
                    fontSize="1.75em"
                    className="text-white focus:outline-none ring-0 outline-none border-none focus:ring-0 focus:ring-offset-0 ring-offset-0"
                  />
                </Button>
              </NavbarDropdown>
              <div className="flex flex-col gap-3 items-center">
                {mobileSocials.map((social, idx) => (
                  <Button
                    key={idx}
                    size={"icon"}
                    variant={"ghost"}
                    className="bg-moretransparent rounded-full hover:bg-semiopaque transition ease-in-out hover:scale-110 hover:-rotate-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                    asChild
                  >
                    <Link href={social.link}>{social.glyph}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Web */}
      <div className="hidden md:flex flex-col md:flex-row gap-6 lg:gap-10 max-w-4xl items-center lg:items-stretch rounded-xl relative z-10 bg-customGray">
        
        {/* Profile pic */}
        <div className="relative aspect-square md:h-[16em] lg:h-[16em] flex-shrink-0">
          <Image
            src={ProfilePic}
            alt="Profile picture"
            className={cn(
              "h-full rounded-xl shadow-xl transition ease-in-out hover:scale-110 duration-500 hover:cursor-pointer",
              imageEffect && "animate-wiggle"
            )}
            onClick={() => setImageEffect(true)}
            onAnimationEnd={() => setImageEffect(false)}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2 lg:gap-5 w-full flex-1">
            <div className="flex flex-col gap-1">
                <TextAnimate text={texts.name} type="whipIn" className="font-bold text-5xl lg:text-7xl text-slate-700 dark:text-slate-100 tracking-tight"/>
                <TextAnimate text={texts.title} type="whipIn" delay={0.5} className="font-semibold text-xl lg:text-3xl text-slate-500 dark:text-slate-400 tracking-tight"/>
                <TextAnimate text={texts.description} type="whipIn" delay={0.6} className="text-slate-600 dark:text-slate-400"/>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-2 -ml-3">
            <div className="flex flex-row gap-2 items-center">
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
      <RetroGrid className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-90%"/>
    </main>
  );
}