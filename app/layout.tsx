import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Doctor Voice | AI Medical Assistant - Tự động hóa hồ sơ bệnh án",
  description: "Doctor Voice là trợ lý AI giúp bác sĩ tự động ghi chép hồ sơ bệnh án, tạo SOAP notes, mã ICD-10 và tra cứu kiến thức y khoa trong thời gian thực.",
  keywords: ["AI medical assistant", "SOAP notes", "ICD-10", "speech to text", "medical transcription", "doctor voice", "healthcare AI"],
  authors: [{ name: "Doctor Voice Team" }],
  openGraph: {
    title: "Doctor Voice | AI Medical Assistant",
    description: "Tự động hóa hồ sơ bệnh án với công nghệ AI tiên tiến",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
