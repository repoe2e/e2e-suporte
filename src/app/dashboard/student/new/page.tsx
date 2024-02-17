import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewStudentForm } from '../components/form'

export default async function NewStudent() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }
    return (
        <Container>
            <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/student" className="bg-gray-900 px-4 py-1 text-white rounded" data-testid="voltar">
                        Voltar
                    </Link>
                    <h1 className="text-3x-l font-bold">Novo Aluno</h1>
                </div>
                <NewStudentForm userId={session.user.id} />
            </main>
        </Container>
    )
}