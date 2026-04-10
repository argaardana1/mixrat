import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ControlHub • Premium Remote Control",
  description: "Kontrol puluhan perangkat jarak jauh secara realtime",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen pb-20">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
