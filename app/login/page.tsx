"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setErro("")
    setLoading(true)

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("E-mail ou senha inválidos.");
        }

        throw new Error("Não foi possível realizar o login.");
      }

      const data: { token: string } = await response.json();

      sessionStorage.setItem("token", data.token);

      router.push("/");
      router.refresh();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado."
      );
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-[#0B161E] p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Acesse sua conta
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="rounded-md border bg-[#ACACAC] border-gray-300 px-3 py-2 outline-none placeholder:text-[#00000070] focus:border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">

            <input
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
              id="senha"
              name="senha"
              type="password"
              placeholder="Senha"
              className="rounded-md bg-[#ACACAC] border border-gray-300 px-3 py-2 outline-none placeholder:text-[#00000070] focus:border-gray-500"
            />
          </div>

          {erro && (
            <p role="alert" className="text-sm text-red-500">
              {erro}
            </p>
          )}

          <button
            disabled={loading}
            type="submit"
            className="mt-2 cursor-pointer rounded-md bg-[#1D1D4D] px-4 py-2 font-medium text-white hover:bg-gray-800"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}