import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Libbu | Where women connect, build and grow",
  description:
    "Libbu is a private community connecting ambitious women with collaborators, mentors, accountability partners and genuine business opportunities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
