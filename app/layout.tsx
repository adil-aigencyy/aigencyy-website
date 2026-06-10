import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIGENCYY — The Future Operates Efficiently.",
  description: "Intelligence. Applied. Premium AI agency for forward-thinking enterprises.",
};

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
      </body>
    </html>
  );
}
