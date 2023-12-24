import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SSRProvider } from "@/components/bootstrap";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS Image Gallery",
  description: "NextJS Image Gallery App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <SSRProvider> */}
        <NavBar />
        <main>
          <div className="container text-center p-4 mx-auto">{children}</div>
        </main>
        {/* </SSRProvider> */}
      </body>
    </html>
  );
}
