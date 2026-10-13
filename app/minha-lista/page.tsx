"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { JogoCard } from "@/components/jogoCard";


interface UsuarioJogo {
    id: number;
    jogoId: number;
    nome: string;
    capa: string;
    statusJogo: "JOGANDO" | "JOGADO" | "ABANDONADO";
}

export default function MinhaListaPage() {
    const { token, isAuthenticated } = useAuth();

    const [jogos, setJogos] = useState<UsuarioJogo[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;

        async function buscarMinhaLista() {
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
                    throw new Error("Erro ao buscar minha lista");
                }

                const data: UsuarioJogo[] = await response.json();

                setJogos(data);
            } catch (error) {
                console.error(error);
                setErro("Não foi possível carregar sua lista.");
            } finally {
                setLoading(false);
            }
        }

        buscarMinhaLista();
    }, [token]);

    if (!isAuthenticated) {
        return (
            <main className="p-8">
                <p>Você precisa estar logado para acessar sua lista.</p>
                <Link href="/login" className="text-blue-500">
                    Fazer login
                </Link>
            </main>
        );
    }

    if (loading) {
        return <p className="p-8">Carregando sua lista...</p>;
    }

    if (erro) {
        return <p className="p-8 text-red-500">{erro}</p>;
    }

    return (
        <main className="p-8">
            <h1 className="mb-6 text-3xl font-bold">
                Minha Lista
            </h1>

            {jogos.length === 0 ? (
                <p>Você ainda não adicionou nenhum jogo.</p>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {jogos.map((jogo) => (
                        <Link
                            href={`/jogos/${jogo.jogoId}`}
                            key={jogo.id}
                        >
                            <JogoCard
                                jogo={{
                                    id: jogo.jogoId,
                                    nome: jogo.nome,
                                    capa: jogo.capa,
                                }}
                                size="sm"
                            />
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
