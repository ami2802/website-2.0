import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Amirul's Resume",
    description: "Amirul's Resume",
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function DocumentPage() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <iframe
        src="/documents/resume.pdf"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Amirul's Resume"
      />
    </div>
  );
}
