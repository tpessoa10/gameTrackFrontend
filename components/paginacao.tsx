
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface PaginacaoProps {
    paginaAtual: number;
    totalPaginas: number;
}

export function Paginacao({
    paginaAtual,
    totalPaginas,
}: PaginacaoProps) {
    if (totalPaginas <= 1) return null;

    const quantidadeVisivel = 5;

    const inicio = Math.max(
        0,
        Math.min(
            paginaAtual - Math.floor(quantidadeVisivel / 2),
            totalPaginas - quantidadeVisivel
        )
    );

    const fim = Math.min(
        inicio + quantidadeVisivel,
        totalPaginas
    );

    const paginas = Array.from(
        { length: fim - inicio },
        (_, index) => inicio + index
    );

    function classePagina(ativa: boolean) {
        return `px-4 py-2 rounded-lg transition-colors ${
            ativa
                ? "bg-blue-600 text-white"
                : "bg-[#1D1D4D] hover:bg-[#303070]"
        }`;
    }

    return (
        <nav
            aria-label="Paginação"
            className="flex items-center justify-center gap-2 my-8 flex-wrap"
        >
            {paginaAtual > 0 ? (
                <Link
                    href={`/?page=${paginaAtual - 1}`}
                    aria-label="Página anterior"
                    className="p-2 rounded-lg bg-[#1D1D4D] hover:bg-[#303070]"
                >
                    <MdChevronLeft size={24} />
                </Link>
            ) : (
                <span className="p-2 opacity-40">
                    <MdChevronLeft size={24} />
                </span>
            )}

            {/* Primeira página */}
            {inicio > 0 && (
                <>
                    <Link href="/?page=0" className={classePagina(false)}>
                        1
                    </Link>

                    {inicio > 1 && (
                        <span className="px-2">...</span>
                    )}
                </>
            )}

            {/* Intervalo de cinco páginas */}
            {paginas.map((pagina) => (
                <Link
                    key={pagina}
                    href={`/?page=${pagina}`}
                    aria-current={paginaAtual === pagina ? "page" : undefined}
                    className={classePagina(paginaAtual === pagina)}
                >
                    {pagina + 1}
                </Link>
            ))}

            {/* Última página */}
            {fim < totalPaginas && (
                <>
                    {fim < totalPaginas - 1 && (
                        <span className="px-2">...</span>
                    )}

                    <Link
                        href={`/?page=${totalPaginas - 1}`}
                        className={classePagina(false)}
                    >
                        {totalPaginas}
                    </Link>
                </>
            )}

            {paginaAtual < totalPaginas - 1 ? (
                <Link
                    href={`/?page=${paginaAtual + 1}`}
                    aria-label="Próxima página"
                    className="p-2 rounded-lg bg-[#1D1D4D] hover:bg-[#303070]"
                >
                    <MdChevronRight size={24} />
                </Link>
            ) : (
                <span className="p-2 opacity-40">
                    <MdChevronRight size={24} />
                </span>
            )}
        </nav>
    );
}
