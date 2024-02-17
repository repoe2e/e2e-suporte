"use client"
import { useContext, useRef, MouseEvent } from 'react'
import { ModalContext } from '@/providers/modal'

export function ModalTicket() {
    const { handleModalVisible, ticket } = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleModalVisible();
        }
    }
    return (
        <div className="absolute bg-gray-900/80 w-full min-h-screen" data-testid="fechar-modal" onClick={handleModalClick}>
            <div className="absolute inset-0 flex items-center justify-center">

                <div ref={modalRef} className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded" data-testid="modal">

                    <div className="flex items-center justify-between mb-4">
                        <h1 className="font-bold text-lg md:text-2xl" data-testid="detalhes-chamado">Detalhes do Chamado:</h1>
                        <button className="bg-red-500 p-1 px-2 text-white rounded" data-testid="btn-fechar" onClick={handleModalVisible}>
                            Fechar
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold" data-testid="name">Nome:</h2>
                        <p>{ticket?.ticket.name}</p>
                    </div>

                    <div className="flex flex-wrap flex-col gap-1 mb-2">
                        <h2 className="font-bold" data-testid="description">Descrição:</h2>
                        <p>{ticket?.ticket.description}</p>
                    </div>

                    <div className="w-full border-b-[1.5px] my-4"> </div>
                    <h1 className="font-bold text-lg mb-4" data-testid="student-details">Detalhes do Aluno</h1>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold" data-testid="student-name">Nome:</h2>
                        <p>{ticket?.student?.name}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold" data-testid="student-phone">Telefone:</h2>
                        <p>{ticket?.student?.phone}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold" data-testid="student-email">E-mail:</h2>
                        <p>{ticket?.student?.email}</p>
                    </div>
                    {ticket?.student?.address && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold" data-testid="student-address">Endereço:</h2>
                            <p>{ticket.student.address}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}