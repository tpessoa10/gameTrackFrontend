import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "GameBacklog",
  description: "Organize e acompanhe seus jogos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="">
          <Header/>

          <main className="">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}