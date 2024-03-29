"use client"

import { createContext, ReactNode, useState } from 'react'
import { TicketProps } from '@/utils/ticket.type'
import { StudentProps } from '@/utils/student.type'
import { ModalTicket } from '@/components/modal'

interface ModalContextData {
    visible: boolean;
    handleModalVisible: () => void;
    ticket: TicketInfo | undefined;
    setDetailTicket: (detail: TicketInfo) => void;
}

interface TicketInfo {
    ticket: TicketProps;
    student: StudentProps | null;
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [ticket, setTicket] = useState<TicketInfo>();

    //função para abrir ou fechar o modal
    function handleModalVisible() {
        setVisible(!visible)
    }

    function setDetailTicket(detail: TicketInfo) {
        setTicket(detail)
    }

    return (
        <ModalContext.Provider value={{ visible, handleModalVisible, ticket, setDetailTicket }}>
            {visible && <ModalTicket />}
            {children}
        </ModalContext.Provider>
    )
}