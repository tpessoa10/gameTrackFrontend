import Image from "next/image";
import { Jogo } from "@/types/jogo";


interface JogoCardProps {
  jogo: Jogo;
  size?: "sm" | "md" | "lg";
}

const tamanhos = {
  sm: {
    card: "w-36",
    imagem: "h-48",
    texto: "text-sm",
  },
  md: {
    card: "w-48",
    imagem: "h-64",
    texto: "text-base",
  },
  lg: {
    card: "w-64",
    imagem: "h-80",
    texto: "text-lg",
  },
};

export function JogoCard({ jogo, size = "lg" }: JogoCardProps) {
  return (
    <article
      className={`${tamanhos[size].card} overflow-hidden rounded-lg border bg-[#0B161E] shadow-sm`}
    >
      <Image
        src={jogo.capa}
        alt={`Capa de ${jogo.nome}`}
        width={300}
        height={400}
        className={`${tamanhos[size].imagem} w-full object-cover`}
      />

      <div className="p-4">
        <h2 className={`font-semibold ${tamanhos[size].texto}`}>
          {jogo.nome}
        </h2>
      </div>
    </article>
  );
}
