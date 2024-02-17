import Image from "next/image";
import heroImg from '@/assets/hero.svg'

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)] bg-white">
      <h2 className="font-medium text-2xl mb-2">Canal de suporte</h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-950 md:text-4xl">Atendimentos, alunos</h1>
      <Image
        src={heroImg}
        alt="Imagem hero do dev controle"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  )
}
