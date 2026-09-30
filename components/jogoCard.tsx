import Image from "next/image";
import { Jogo } from "@/types/jogo";

interface JogoCardProps {
  jogo: Jogo;
}

export function JogoCard({ jogo }: JogoCardProps) {
  return (
    <article className="w-64 overflow-hidden rounded-lg border bg-[#0B161E] shadow-sm">
      <Image
        src={jogo.capa}
        alt={`Capa de ${jogo.nome}`}
        width={300}
        height={400}
        className="h-80 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="font-semibold">{jogo.nome}</h2>
      </div>
    </article>
  );
}