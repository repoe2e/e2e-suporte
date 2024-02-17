import { Container } from '@/components/container'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TicketItem } from '@/app/dashboard/components/ticket'
import prismaClient from '@/lib/prisma'
import { ButtonRefresh } from './components/button'

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }

    const tickets = await prismaClient.ticket.findMany({
        where: {
            //  userId: session.user.id, (alterado devido a abertura de chamado externo)
            status: "ABERTO",
            student: {
                userId: session.user.id
            }
        },
        include: {
            student: true,
        },
        orderBy: {
            created_at: "desc" //mais recentes primeiro
        }
    })

    return (
        <Container>
            <main className='mt-9 mb-2'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold'>Chamados</h1>
                    <div className='flex items-center gap-3'>
                        <ButtonRefresh />
                        <Link href="/dashboard/new" className='bg-sky-400 px-4 py-1 rounded text-white' data-testid="novo-chamado" >
                            Novo Chamado
                        </Link>
                    </div>
                </div>
                <table className='min-w-full my-2'>
                    <thead>
                        <tr>
                            <th className='font-medium text-left pl-1' data-testid="th-aluno">ALUNO</th>
                            <th className='font-medium text-left hidden sm:block' data-testid="th-cadastro">DATA CADASTRO</th>
                            <th className='font-medium text-left' data-testid="th-status">STATUS</th>
                            <th className='font-medium text-left' data-testid="th-#">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <TicketItem
                                key={ticket.id}
                                student={ticket.student}
                                ticket={ticket}
                            />
                        ))}
                    </tbody>
                </table>
                {tickets.length === 0 && (
                    <h1 className='px-2 text-gray-600' data-testid="text-ticket">Nenhum ticket aberto foi encontrado!</h1>
                )}
            </main>
        </Container>

    )
}