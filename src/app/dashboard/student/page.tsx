import { Container } from '@/components/container'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CardStudent } from './components/card'
import prismaClient from '@/lib/prisma'


export default async function Student() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }
    const students = await prismaClient.student.findMany({
        where: {
            userId: session.user.id
        }
    })

    return (
        <Container>
            <main>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold' data-testid="alunos-e2e"> Alunos E2E</h1>
                    <Link href="/dashboard/student/new" className='bg-sky-400 px-4 py-1 rounded text-white' data-testid="novo-aluno">
                        Novo Aluno
                    </Link>
                </div>

                <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3'>
                    {students.map(student => (
                        <CardStudent
                            key={student.id}
                            student={student} />
                    ))}
                </section>
                {students.length === 0 && (
                    <h1 className='text-gray-600'> Não há alunos para seu usuário.</h1>
                )}

            </main>
        </Container>
    )
}