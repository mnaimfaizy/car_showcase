import { Footer, Navbar, JsonLd } from "@/components";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://car-showcase-sepia-sigma.vercel.app"),
  title: {
    default: "Car Showcase - Discover Premium Cars for Rent",
    template: "%s | Car Showcase",
  },
  description:
    "Browse through our extensive collection of 69+ premium vehicles from 20+ top manufacturers. Search, filter, and find your perfect rental car with advanced filtering by make, model, year (2019-2023), and fuel type.",
  keywords: [
    "car rental",
    "car showcase",
    "premium cars",
    "luxury car rental",
    "vehicle rental",
    "car search",
    "car filter",
    "Toyota",
    "Tesla",
    "BMW",
    "Mercedes-Benz",
    "Honda",
    "Ford",
    "electric cars",
    "Next.js car app",
    "car catalogue",
    "rent a car",
    "car booking",
  ],
  authors: [{ name: "mnaimfaizy" }],
  creator: "mnaimfaizy",
  publisher: "Car Showcase",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://car-showcase-sepia-sigma.vercel.app",
    title: "Car Showcase - Discover Premium Cars for Rent",
    description:
      "Browse through our extensive collection of 69+ premium vehicles from 20+ top manufacturers. Find your perfect rental car today.",
    siteName: "Car Showcase",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Showcase - Discover Premium Cars for Rent",
    description:
      "Browse 69+ premium vehicles from 20+ manufacturers. Advanced search and filtering for your perfect rental car.",
    creator: "@mnaimfaizy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  category: "automotive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
