import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova Solution — Football Data Workspace",
  description: "Explore player statistics or access your club workspace.",
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
            __html: `(function(){try{var m=document.cookie.match(/(?:^|; )nova-theme=(dark|light)/);var t=m?m[1]:'dark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
