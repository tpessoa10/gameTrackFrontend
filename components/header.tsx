import Link from "next/link";

export function Header() {
  return (
    <header className="bg-[#0B161E] border-b ">
      <div className="mx-auto flex h-16 max-w-11/12 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          GameBacklog
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/">
            Início
          </Link>

          <Link href="/jogos">
            Jogos
          </Link>

          <Link href="/backlog">
            Meu Backlog
          </Link>

          <Link href="/perfil">
            Perfil
          </Link>
        </nav>
      </div>
    </header>
  );
}