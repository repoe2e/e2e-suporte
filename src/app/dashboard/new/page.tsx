import { Container } from "@/components/container";
import Link from "next/link";
import { getServerSession } from "next-auth"
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prismaClient from '@/lib/prisma'

export default async function NewTicket() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/")
    }
    const students = await prismaClient.student.findMany({
        where: {
            userId: session.user.id
        }
    })

    async function handleRegisterTicket(formData: FormData) {
        "use server"

        const name = formData.get("name")
        const description = formData.get("description")
        const studentId = formData.get("student")

        if (!name || !description || !studentId) {
            return;
        }

        await prismaClient.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                studentId: studentId as string,
                status: "ABERTO",
                userId: session?.user.id
            }
        })

        redirect("/dashboard")
    }

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="text-white px-4 py-1 rounded bg-gray-900" data-testid="btn-voltar">
                        Voltar
                    </Link>
                    <h1 className="text-3x-l font-bold" data-testid="text-Chamado">Novo Chamado</h1>
                </div>
                <form className="flex flex-col mt-6" action={handleRegisterTicket}>
                    <label className="mb-1 font-medium text-lg">Título do chamado</label>
                    <input
                        className="w-full border-2 rounded-md px-2 mb-2 h-11"
                        type="text"
                        placeholder="Digite o título do chamado..."
                        id="title-chamado"
                        name="name"
                        required
                    />

                    <label className="mb-1 font-medium text-lg">Descreva o problema</label>
                    <textarea
                        className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
                        placeholder="Descreva o problema que está ocorrendo..."
                        id="description-chamado"
                        name="description"
                        required
                    ></textarea>

                    {students.length !== 0 && (
                        <>
                            <label className="mb-1 font-medium text-lg">Selecione o Aluno</label>
                            <select
                                className="w-full border-2 rounded-md px-2 mb-2 h-11resize-none bg-white"
                                id="select-student"
                                name="student"
                            >
                                {students.map(student => (
                                    <option key={student.id}
                                        value={student.id}
                                    >
                                        {student.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    {students.length === 0 && (
                        <Link href="/dashboard/student/new" id="cadastrar-aluno">
                            Ainda não há alunos cadastrados, <span className="text-sky-400 font-medium">Cadastrar aluno(a)</span>
                        </Link>
                    )}
                    <button
                        type="submit"
                        className="bg-sky-400 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        id="btn-cadastrar"
                        name="cadastrar"
                        disabled={students.length === 0}
                    >
                        Cadastrar
                    </button>

                </form>
            </main>
        </Container>

    )
}