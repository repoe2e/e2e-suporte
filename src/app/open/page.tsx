"use client"
import { useState } from 'react'
import { Input } from '@/components/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FiSearch, FiX } from 'react-icons/fi'
import { FormTicket } from './components/FormTicket'
import { api } from '@/lib/api'

const schema = z.object({
    email: z.string().email("Digite o email de aluno(a) para localizar.").min(1, "O campo email é obrigatório.")
})

type FormData = z.infer<typeof schema>

 export interface StudentDataInfo {
    id: string;
    name: string;
}

export default function OpenTicket() {
    const [student, setStudent] = useState<StudentDataInfo | null>(null)

    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function handleClearStudent() {
        setStudent(null)
        setValue("email", "")
    }


    async function handleSearchStudent(data: FormData) {
        const response = await api.get("/api/student", {
            params: {
                email: data.email
            }
        })

        if (response.data === null) {
            setError("email", { type: "student", message: "Ops, aluno(a) não foi encontrado(a)!" })
            return;
        }

        setStudent({
            id: response.data.id,
            name: response.data.name
        })

    }
    return (
        <div className="w-full max-w-2xl mx-auto px-2 ">
            <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

            <main className="flex flex-col mt-4 mb-2">

                {student? (
                    <div className="bg-slate-200 py-6 px-4 rounded border-2 flex items-center justify-between">
                        <p className="text-lg" data-testid="text-selectStudent"><strong>Aluno(a) selecionado(a):</strong> {student.name}</p>
                        <button className="h-11 px-2 flex items-center justify-center rounded" data-testid="btn-student" onClick={handleClearStudent}>
                            <FiX size={30} color="#ff2929" />
                        </button>
                    </div>
                ) : (
                    <form
                        className="bg-slate-200 py-6 px-2 rounded border-2"
                        onSubmit={handleSubmit(handleSearchStudent)}
                    >
                        <div className="flex flex-col gap-3">
                            <Input
                                name="email"
                                placeholder="Digite o email do(a) aluno(a)..."
                                type="text"
                                error={errors.email?.message}
                                register={register}
                            />

                            <button type="submit" className="bg-sky-400  flex flex-row gap-3 px-2 h-11 items-center justify-center rounded text-white font-bold" data-testid="btn-findStudent">
                                Procurar Aluno(a)
                                <FiSearch size={24} color="#FFF" />
                            </button>
                        </div>
                    </form>
                )}

                {student !== null && <FormTicket  student={student}/>}
            </main>
        </div>
    )
}