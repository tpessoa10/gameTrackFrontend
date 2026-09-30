import { JogoCard } from "@/components/jogoCard";
import { Jogo } from "@/types/jogo";

interface JogosResponse {
  content: Jogo[];
  totalElements: number;
  totalPages: number;
}


async function buscarJogos(): Promise<JogosResponse> {
  const response = await fetch(
    "http://localhost:8080/api/v1/jogos"
  );


  if (!response.ok) {
    throw new Error("Erro ao buscar jogos");
  }

  return response.json();
}

export default async function Home() {
  const jogos = await buscarJogos();

  console.log('jogos ', jogos)

  return (
    <>
      <section className="grid grid-cols-12 gap-6 mt-4 md:grid-cols-5">
        {jogos.content.map((jogo) => (
          <JogoCard key={jogo.id} jogo={jogo} />
        ))}
      </section>
    </>
  );
}