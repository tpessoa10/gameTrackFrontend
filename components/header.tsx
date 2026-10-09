"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";

export function Header() {
  const { isAuthenticated, logout } = useAuth()
  return (
    <header className="bg-[#0B161E] border-b ">
      <div className="mx-auto flex h-16 max-w-11/12 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          GameBacklog
        </Link>

        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <div className="flex gap-4">
              <Link href="/minha-lista">Minha Lista</Link>

              <button onClick={logout}>
                Sair
              </button>
            </div>
          ) : (
            <Link href="/login">Entrar</Link>
          )}
        </nav>
      </div>
    </header>
  );
}