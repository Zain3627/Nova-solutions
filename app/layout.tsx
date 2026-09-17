import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova Solution — AI Football Tactical Analysis",
  description:
    "Nova Solution transforms raw broadcast video and player databases into real-time tactical intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('nova-theme');t=t==='light'?'light':'dark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
