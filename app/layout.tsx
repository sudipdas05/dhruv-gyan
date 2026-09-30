
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastHost from "@/components/ui/ToastHost";

export const metadata: Metadata = {
  metadataBase: new URL("https://dhruvgyan.in"),
  title: {
    default: "DHRUV GYAN — India's Polar Science Knowledge & Outreach Portal",
    template: "%s · DHRUV GYAN",
  },
  description:
    "DHRUV GYAN is India's polar science digital hub: expedition reports, publications, datasets, media and smart learning from the National Centre for Polar and Ocean Research ecosystem (demonstration build).",
  keywords: ["polar science", "NCPOR", "Antarctica", "Arctic", "Indian Antarctic Expedition", "MoES"],
  openGraph: {
    title: "DHRUV GYAN — India's Polar Science Knowledge & Outreach Portal",
    description: "Expeditions, research, datasets, media and AI-assisted learning from India's polar research ecosystem.",
    type: "website",
    siteName: "DHRUV GYAN",
  },
  twitter: {
    card: "summary_large_image",
    title: "DHRUV GYAN",
    description: "India's Polar Science Knowledge & Outreach Portal.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#030812",
  width: "device-width",
  initialScale: 1,
};

const themeScript = `try{var t=localStorage.getItem('dg_theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-polar-950 focus:rounded-md"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <ToastHost />
      </body>
    </html>
  );
}
