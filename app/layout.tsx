import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ремонт крупной бытовой техники | Москва и область",
  description:
    "Срочный ремонт холодильников, стиральных машин, посудомоек, плит и кондиционеров. Оригинальные запчасти, гарантия до 12 месяцев.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${rubik.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
