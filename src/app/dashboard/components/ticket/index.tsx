"use client"

import { useContext } from 'react'
import { StudentProprs } from '@/utils/student.type';
import { TicketProps } from '@/utils/ticket.type'
import { FiCheckSquare, FiFile } from 'react-icons/fi'
import { api } from "@/lib/api"
import { useRouter } from 'next/navigation'
import { ModalContext } from '@/providers/modal'

interface TicketItemProps {
    ticket: TicketProps;
    student: StudentProprs | null;
}

export function TicketItem({ student, ticket }: TicketItemProps) {
    const router = useRouter();
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext)

    async function handleChangeStatus() {
        try {
            const response = await api.patch("/api/ticket", {
                id: ticket.id,
            })
            router.refresh();
        } catch (err) {
            console.log("Erro")
        }
    }

    function handleOpenModal() {
        handleModalVisible();
        setDetailTicket({
            student: student,
            ticket: ticket
        })
    }
    return (
        <>
            <tr className='border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300'>
                <td className='text-left pl-1' data-testid="name">
                    {student?.name}
                </td>
                <td className='text-left hidden sm:table-cell' data-testid="data-cadastro">
                    {ticket.created_at?.toLocaleDateString("pt-br")}
                </td>
                <td className='text-left'>
                    <span className="bg-green-500 px-2 py-1 rounded" data-testid="status-chamado">{ticket.status}</span>
                </td>
                <td className='text-left'>
                    <button className='mr-3' data-testid="check" onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color='#6A6D6F' data-testid="icon-check" />
                    </button>
                    <button className='text-left' data-testid="file" onClick={handleOpenModal}>
                        <FiFile size={24} color='#38bdf8' data-testid="icon-file" />
                    </button>
                </td>
            </tr>
        </>
    )
}