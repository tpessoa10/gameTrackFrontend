"use client";

import { use, useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import { MdGamepad, MdNotStarted, MdDelete } from "react-icons/md";

type StatusJogo = "JOGANDO" | "JOGADO" | "ABANDONADO";

interface UsuarioJogo {
    id: number;
    jogoId: number;
    statusJogo: StatusJogo;
}

interface Jogo {
    id: number;
    nome: string;
    descricao: string;
    capa: string;
}

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function JogoPage({ params }: PageProps) {
    const { isAuthenticated, token } = useAuth();
    const { id } = use(params);

    const [jogo, setJogo] = useState<Jogo | null>(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [usuarioJogo, setUsuarioJogo] = useState<UsuarioJogo | null>(null);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        async function buscarJogo() {
            try {
                setLoading(true);
                setErro(null);

                const response = await fetch(
                    `http://localhost:8080/api/v1/jogos/${id}`
                );

                if (!response.ok) {
                    throw new Error("Erro ao buscar jogo");
                }

                const data: Jogo = await response.json();

                setJogo(data);
            } catch (error) {
                console.error(error);
                setErro("Não foi possível carregar o jogo.");
            } finally {
                setLoading(false);
            }
        }

        buscarJogo();
    }, [id]);

    useEffect(() => {
        if (!token) return;

        async function buscarStatusJogo() {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/v1/minha-lista",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Erro ao consultar minha lista");
                }

                const lista: UsuarioJogo[] = await response.json();

                const jogoEncontrado = lista.find(
                    (item) => item.jogoId === Number(id)
                );

                setUsuarioJogo(jogoEncontrado ?? null);
            } catch (error) {
                console.error(error);
            }
        }

        buscarStatusJogo();
    }, [token, id]);

    if (loading) {
        return <p>Carregando jogo...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    if (!jogo) {
        return <p>Jogo não encontrado.</p>;
    }

    
async function adicionarMinhaLista(statusJogo: StatusJogo) {
    if (!token || !jogo || salvando) return;

    if (usuarioJogo?.statusJogo === statusJogo) {
        return;
    }

    setSalvando(true);

    try {
        const jaEstaNaLista = usuarioJogo !== null;

        const url = jaEstaNaLista
            ? `http://localhost:8080/api/v1/minha-lista/${usuarioJogo.id}`
            : "http://localhost:8080/api/v1/minha-lista";

        const response = await fetch(url, {
            method: jaEstaNaLista ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(
                jaEstaNaLista
                    ? { statusJogo }
                    : { jogoId: jogo.id, statusJogo }
            ),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Sua sessão expirou. Faça login novamente.");
            }

            throw new Error("Não foi possível salvar o status do jogo.");
        }

        if (jaEstaNaLista) {
            setUsuarioJogo({
                ...usuarioJogo,
                statusJogo,
            });
        } else {
            // Seu POST retorna 201 sem corpo.
            // Consultamos a lista para recuperar o ID da associação.
            const listaResponse = await fetch(
                "http://localhost:8080/api/v1/minha-lista",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!listaResponse.ok) {
                throw new Error(
                    "Jogo salvo, mas não foi possível atualizar a tela."
                );
            }

            const lista: UsuarioJogo[] = await listaResponse.json();

            const jogoAdicionado = lista.find(
                (item) => item.jogoId === jogo.id
            );

            setUsuarioJogo(jogoAdicionado ?? null);
        }

        alert("Status do jogo salvo com sucesso!");
    } catch (error) {
        console.error(error);

        alert(
            error instanceof Error
                ? error.message
                : "Erro ao salvar status."
        );
    } finally {
        setSalvando(false);
    }
}


    return (
        <main className="flex flex-row mt-4">
            <div className=" w-2/12 ml-12">
                <div className="relative w-full aspect-[2/3]">
                    <Image
                        src={jogo.capa}
                        alt={`Capa de ${jogo.nome}`}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                <div className="flex flex-row justify-between pt-2 pb-2 pl-2 pr-2 bg-[#1D1D4D]">
                    {isAuthenticated ? (
                        <>
                            <button
                                type="button"
                                onClick={() => adicionarMinhaLista("JOGADO")}
                                disabled={salvando}
                                className={`flex flex-col items-center justify-center cursor-pointer disabled:opacity-50 ${usuarioJogo?.statusJogo === "JOGADO"
                                        ? "text-green-400"
                                        : ""
                                    }`}
                            >
                                <MdGamepad size={32} />
                                <p>Jogado</p>
                            </button>

                            <button
                                type="button"
                                onClick={() => adicionarMinhaLista("JOGANDO")}
                                disabled={salvando}
                                className={`flex flex-col items-center justify-center cursor-pointer disabled:opacity-50 ${usuarioJogo?.statusJogo === "JOGANDO"
                                        ? "text-green-400"
                                        : ""
                                    }`}
                            >
                                <MdNotStarted size={32} />
                                <p>Jogando</p>
                            </button>

                            <button
                                type="button"
                                onClick={() => adicionarMinhaLista("ABANDONADO")}
                                disabled={salvando}
                                className={`flex flex-col items-center justify-center cursor-pointer disabled:opacity-50 ${usuarioJogo?.statusJogo === "ABANDONADO"
                                        ? "text-red-400"
                                        : ""
                                    }`}
                            >
                                <MdDelete size={32} />
                                <p>Abandonado</p>
                            </button>
                        </>
                    ) : (
                        <div>Faça Login para acompanhar seus jogos</div>
                    )}
                </div>
            </div>

            <div className="ml-8 w-10/12 mr-12">
                <h2 className="text-5xl mb-2">{jogo.nome}</h2>
                <p className="">{jogo.descricao}</p>
            </div>
        </main>
    );
}