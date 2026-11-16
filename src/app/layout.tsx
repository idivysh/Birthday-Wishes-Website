import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Dancing_Script, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const script = Dancing_Script({ subsets: ["latin"], variable: "--font-script" });
const telugu = Noto_Sans_Telugu({ subsets: ["telugu"], variable: "--font-telugu" });

const title = "Happy 21st Birthday Rasagna ❤️";
const description = "A little world of memories, love and surprises, made especially for Rasagna.";

export const metadata: Metadata = {
  title, description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "data:image/svg+xml,<svg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27><text y=%27.9em%27 font-size=%2790%27>🎂</text></svg>" },
};
export const viewport: Viewport = { themeColor: "#F7C9DD", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${script.variable} ${telugu.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
