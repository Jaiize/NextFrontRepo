import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Game Detail",
  description: "View full details about selected game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>{children}</div>
  );
}
