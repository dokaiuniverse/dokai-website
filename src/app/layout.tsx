import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@styles/global.css";
import { themeClass } from "@styles/theme.css";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOKAI",
  description: "Image Beyond AI. Create with Humanity",
  icons: {
    icon: "/dokai.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${themeClass}`}>
        <NextTopLoader
          showSpinner={false}
          height={4}
          crawl={true}
          crawlSpeed={200}
          easing="ease"
          speed={200}
          color="#ed8435"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
