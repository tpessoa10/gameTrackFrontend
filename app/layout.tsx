import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "./contexts/AuthContext";

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
          <AuthProvider>
            <Header />
            <main className="">
              {children}
            </main>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}