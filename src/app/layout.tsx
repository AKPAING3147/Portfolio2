import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt",
});

export const metadata: Metadata = {
  title: "AKP | Web Developer",
  description:
    "A professional developer portfolio showcasing high-performance web applications, technical expertise, and software engineering projects.",
  keywords: ["portfolio", "developer", "software engineer", "full-stack", "web development", "react", "next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} ${vt323.variable} antialiased`} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem("theme");
                  if (savedTheme === "light") {
                    document.body.classList.add("light-mode");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <div className="crt-overlay" />
        {children}
      </body>
    </html>
  );
}
