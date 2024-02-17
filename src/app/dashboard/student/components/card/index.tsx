"use client"
import { StudentProps } from '@/utils/student.type'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export function CardStudent({ student }: { student: StudentProps }) {
    const router = useRouter();

  async function handleDeleteStudent() {

    try {
      const response = await api.delete("/api/student", {
        params: {
          id: student.id
        }
      })

      console.log(response.data);
      router.refresh();

    } catch (err) {
      console.log(err);
    }

  }

    return (
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300" data-testid="card-aluno">
            <h2>
                <a className="font-bold" data-testid="nome-aluno">Nome:</a> {student.name}
            </h2>
            <p><a className="font-bold" data-testid="email-aluno">Email:</a>{student.email}</p>
            <p><a className="font-bold" data-testid="telefone-aluno">Telefone:</a>{student.phone}</p>
            <button
                className="bg-red-500 px-4 rounded text-white mt-2 self-start" data-testid="btn-deletar"
                onClick={handleDeleteStudent}
            >
                Deletar
            </button>
        </article>
    )
}