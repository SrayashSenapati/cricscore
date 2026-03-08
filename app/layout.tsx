import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CricScore - Live Cricket Scores",
  description: "Live cricket scores, match updates and scorecards from around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#0d1117" }}>
        {children}
      </body>
    </html>
  );
}