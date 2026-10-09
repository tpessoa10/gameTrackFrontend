"use client";

import { use, useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import { MdGamepad, MdNotStarted, MdDelete } from "react-icons/md";

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

    if (loading) {
        return <p>Carregando jogo...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    if (!jogo) {
        return <p>Jogo não encontrado.</p>;
    }

    type StatusJogo = "JOGANDO" | "JOGADO" | "ABANDONADO";

async function adicionarMinhaLista(statusJogo: StatusJogo) {
    if (!token || !jogo) return;

    try {
        const response = await fetch(
            "http://localhost:8080/api/v1/minha-lista",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    jogoId: jogo.id,
                    statusJogo: statusJogo,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao adicionar jogo à lista");
        }

        alert("Jogo adicionado à sua lista!");
    } catch (error) {
        console.error(error);
        alert("Não foi possível adicionar o jogo.");
    }
}

    return (
        <main className="flex flex-row">
            <div className="border-2 w-2/12">
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
                            <button onClick={() => adicionarMinhaLista("JOGADO")} className="flex flex-col items-center justify-center">
                                <MdGamepad size={32} />
                                <p>Jogado</p>
                            </button>

                            <button onClick={() => adicionarMinhaLista("JOGANDO")} className="flex flex-col items-center justify-center">
                                <MdNotStarted size={32} />
                                <p>Jogando</p>
                            </button>

                            <button onClick={() => adicionarMinhaLista("ABANDONADO")} className="flex flex-col items-center justify-center">
                                <MdDelete size={32} />
                                <p>Abandonado</p>
                            </button>
                        </>
                    ) : (
                        <div>Faça Login para acompanhar seus jogos</div>
                    )}
                </div>
            </div>

            <div className="ml-4">
                <h2 className="text-5xl">{jogo.nome}</h2>
            </div>
        </main>
    );
}