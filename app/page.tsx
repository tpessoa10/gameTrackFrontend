
import { JogoCard } from "@/components/jogoCard";
import { Paginacao } from "@/components/paginacao";
import { Jogo } from "@/types/jogo";
import Link from "next/link";

interface JogosResponse {
    content: Jogo[];
    totalElements: number;
    totalPages: number;
    page: number;
}

interface HomeProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

async function buscarJogos(pagina: number): Promise<JogosResponse> {
    const response = await fetch(
        `http://localhost:8080/api/v1/jogos?page=${pagina}`,
        { cache: "no-store" }
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar jogos");
    }

    return response.json();
}

export default async function Home({ searchParams }: HomeProps) {
    const { page } = await searchParams;

    const paginaSolicitada = Number(page ?? 0);
    const paginaAtual =
        Number.isInteger(paginaSolicitada) && paginaSolicitada >= 0
            ? paginaSolicitada
            : 0;

    const jogos = await buscarJogos(paginaAtual);

    return (
        <main className="flex flex-col items-center">
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4 mb-4 justify-items-center w-11/12">
                {jogos.content.map((jogo) => (
                    <Link
                        key={jogo.id}
                        href={`/jogos/${jogo.id}`}
                    >
                        <JogoCard jogo={jogo} />
                    </Link>
                ))}
            </section>

            <Paginacao
                paginaAtual={jogos.page}
                totalPaginas={jogos.totalPages}
            />
        </main>
    );
}
