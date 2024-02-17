"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/input'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

const schema = z.object({
    name: z.string().min(1, "O campo é obrigatório."),
    email: z.string().email("Digite um email válido.").min(1, "O email é obrigatório."),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "O número de telefone deve estar no formato DD 999999999"
    }),
    address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewStudentForm({ userId }: { userId: string }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter();
    
    async function handleRegisterStudent(data: FormData) {
        await api.post("/api/student", {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            userId: userId
        })

        router.refresh();
        router.replace("/dashboard/student")
    }

    return (
        <form className='flex flex-col mt-6' onSubmit={handleSubmit(handleRegisterStudent)}>
            <label className='mb-1 text-lg font-medium'>Nome completo</label>
            <Input
                type='text'
                name='name'
                placeholder='Digite o nome completo.'
                error={errors.name?.message}
                register={register}
            />
            <section className='flex gap-2 my-2 flex-col sm:flex-row'>
                <div className='flex-1'>
                    <label className='mb-1 text-lg font-medium'>Telefone</label>
                    <Input
                        type='number'
                        name='phone'
                        placeholder='Digite o telefone com DDD.'
                        error={errors.phone?.message}
                        register={register}
                    />
                </div>
                <div className='flex-1'>
                    <label className='mb-1 text-lg font-medium'>Email</label>
                    <Input
                        type='text'
                        name='email'
                        placeholder='Digite o e-mail.'
                        error={errors.email?.message}
                        register={register}
                    />
                </div>
            </section>
            <label className='mb-1 text-lg font-medium'>*Endereço completo</label>
            <Input
                type='text'
                name='address'
                placeholder='Digite o endereço do aluno.'
                error={errors.address?.message}
                register={register}
            />
            <button
                type='submit'
                className='bg-sky-400 my-4 px-2  h-11 rounded text-white font-bold' data-testid="btn-cadastrar" >
                Cadastrar
            </button>
        </form>
    )
}