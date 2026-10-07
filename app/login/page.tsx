export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-[#0B161E] p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Acesse sua conta
        </h1>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
           
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="rounded-md border bg-[#ACACAC] border-gray-300 px-3 py-2 outline-none placeholder:text-[#00000070] focus:border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            
            <input
              id="senha"
              name="senha"
              type="password"
              placeholder="Senha"
              className="rounded-md bg-[#ACACAC] border border-gray-300 px-3 py-2 outline-none placeholder:text-[#00000070] focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 cursor-pointer rounded-md bg-[#1D1D4D] px-4 py-2 font-medium text-white hover:bg-gray-800"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}