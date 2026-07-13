import "./globals.css";

export const metadata = {
  title: "Libbu | Where women connect, build and grow",
  description:
    "Libbu is a private community connecting ambitious women with collaborators, mentors, accountability partners and genuine business opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
