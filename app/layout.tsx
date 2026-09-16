import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Script from "next/script";
import ClientScripts from "@/components/client-scripts";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Aakash A. — AI Systems & Software Engineer",
  description:
    "Portfolio of Aakash A., CSBS student at SASTRA building AI systems, backend infrastructure, and full-stack software.",
  openGraph: {
    type: "website",
    title: "Aakash A. — AI Systems & Software Engineer",
    description:
      "CSBS student building AI systems, backend APIs, ML pipelines, and full-stack apps.",
    url: "https://aakashayyappan.com",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakash A. — AI Systems & Software Engineer",
    description:
      "CSBS student building AI systems, backend APIs, ML pipelines, and full-stack apps.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
     * suppressHydrationWarning on <html> is intentional and correct here.
     * The theme-init.js script (beforeInteractive) sets data-theme on <html>
     * from localStorage before React hydrates. This is the one intentional
     * server/client difference: the server always renders data-theme="dark"
     * but the client may switch it based on the user's saved preference.
     * suppressHydrationWarning on <html> is the documented Next.js pattern
     * for this exact use-case (theme persistence).
     */
    <html
      lang="en"
      data-theme="dark"
      className={cn("font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body suppressHydrationWarning>
        {/*
         * Theme detection — ONLY script that runs before hydration.
         * It reads localStorage and sets data-theme on <html>.
         * This is safe because we declared suppressHydrationWarning above.
         * Using next/script beforeInteractive with src (not dangerouslySetInnerHTML)
         * so Next.js injects it into server HTML <head> and React never renders
         * a <script> element during hydration (no console warning).
         */}
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        {children}
        {/*
         * ClientScripts injects Lenis + script.js via useEffect (after hydration).
         * This prevents: lenis class on <html>, is-visible on .reveal-fade,
         * and email text content from being applied before React hydrates.
         */}
        <ClientScripts />
      </body>
    </html>
  );
}
