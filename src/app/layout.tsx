import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chatman Concierge | Private Estate Intelligence",
  description: "Luxury private estate technology and operations platform. Discreet. Intelligent. Estate-ready.",
  keywords: [
    "private estate",
    "estate management",
    "luxury home",
    "concierge",
    "smart estate",
    "security",
    "operations",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
