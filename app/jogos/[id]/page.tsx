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
        <main>
            <div className="border-2 w-2/12">
                <div className="relative w-full aspect-[2/3]">
                    <Image
                        src={jogo.capa}
                        alt={`Capa de ${jogo.nome}`}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="flex flex-row border-2 justify-center">
                    <div className="">
                        <MdGamepad size={32}/>
                        <p>Jogado</p>
                    </div>
                    <div className="">
                        <MdNotStarted size={32}/>
                        <p>Jogando</p>
                    </div>
                    <div className="">
                        <MdDelete size={32}/>
                        <p>Abandonado</p>
                    </div>
                </div>
            </div>

        </main>
    );
}