import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "./components/disable-draft-mode";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

import { garnierReg, garnierIta, monumentBold } from "./utils/customFonts";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Tom Clayton Works",
  description: "Design & Creative Direction",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monumentBold.variable} ${garnierReg.variable} ${garnierIta.variable}  antialiased text-monument-base`}
      >
        <Nav />
        {children}
        <Footer />
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
