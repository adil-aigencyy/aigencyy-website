import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://aigencyy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "AIGENCYY | AI Consulting & Custom AI Software",
  description:
    "AIGENCYY helps businesses eliminate inefficiency through AI consulting, custom AI software and intelligent systems.",

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "AIGENCYY | AI Consulting & Custom AI Software",
    description:
      "AIGENCYY helps businesses eliminate inefficiency through AI consulting, custom AI software and intelligent systems.",
    url: SITE_URL,
    siteName: "AIGENCYY",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/aigencyy-logo.png",
        alt: "AIGENCYY — AI Consulting & Custom AI Software",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "AIGENCYY | AI Consulting & Custom AI Software",
    description:
      "AIGENCYY helps businesses eliminate inefficiency through AI consulting, custom AI software and intelligent systems.",
    images: ["/aigencyy-logo.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "AIGENCYY",
    url: SITE_URL,
    logo: `${SITE_URL}/aigencyy-logo.png`,
    email: "adil@aigencyy.com",
    description:
      "Helping businesses eliminate inefficiency through practical AI implementation.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Consulting",
            description:
              "Strategic AI consulting to identify and implement AI opportunities for your business.",
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom AI Software",
            description:
              "Bespoke AI software solutions built to solve specific business challenges.",
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Automation",
            description:
              "Intelligent automation systems that eliminate manual inefficiency at scale.",
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Employee Training",
            description:
              "AI-powered employee training solutions, including ESRA.",
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "AIGENCYY",
    description:
      "AIGENCYY helps businesses eliminate inefficiency through AI consulting, custom AI software and intelligent systems.",
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#esra`,
    name: "ESRA",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "AI-powered employee training platform by AIGENCYY.",
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body
        className="min-h-full"
        style={{
          fontFamily:
            "var(--font-inter), -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        }}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
