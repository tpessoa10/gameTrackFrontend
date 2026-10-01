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

export default async function JogoPage({ params }: PageProps) {

    const { id } = await params;

    const response = await fetch(
        `http://localhost:8080/api/v1/jogos/${id}`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar jogo");
    }

    const jogo: Jogo = await response.json();

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
                    <button className="flex flex-col items-center justify-center">
                        <MdGamepad size={32}/>
                        <p>Jogado</p>
                    </button>
                    <button className="flex flex-col items-center justify-center">
                        <MdNotStarted size={32}/>
                        <p>Jogando</p>
                    </button>
                    <button className="flex flex-col items-center justify-center">
                        <MdDelete size={32}/>
                        <p>Abandonado</p>
                    </button>
                </div>
            </div>
            <div className="ml-4">
                <h2 className="text-5xl">{jogo.nome}</h2>
            </div>

        </main>
    );
}