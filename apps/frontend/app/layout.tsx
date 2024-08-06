import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import { PitchProvider } from "@/contexts/pitchContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MLB Classifier",
  description: "Developed by Vivek Jagadeesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
   
    <html lang="en">
      <body className={inter.className}>
        <PitchProvider>
        { <NavBar/>}
        <main>{children}</main>
        </PitchProvider>

        </body>
    </html>
   
  );
}


