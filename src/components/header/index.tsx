"use client"

import Link from 'next/link';
import Image from 'next/image';
import { FiUser, FiLogOut, FiLoader, FiLock } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react'

import logoImg from '../../assets/logo.svg';

export function Header() {
    const { status, data } = useSession();

    async function handleLogin() {
        await signIn();
    }

    async function handleLogout() {
        await signOut();
    }

    return (
        <header className="wfull felx items-center px-2 py-4 bg-white h-20 shadow-sm">
            <div className='w-full flex items-center justify-between max-w-7xl mx-auto'>
                <Link href="/">
                    <Image src={logoImg} width={140} height={45} alt="Logo e2e suporte" data-testid="logo-link" />
                </Link>
                {status === "loading" && (
                    <button className='animate-spin'data-testid="icon-loading">
                        <FiLoader size={26} color='#4b5563' />
                    </button>
                )}

                {status === "unauthenticated" && (
                    <button onClick={handleLogin} data-testid="icon-lock">
                        <FiLock size={26} color='#4b5563' />
                    </button>
                )}
                {status === "authenticated" && (
                    <div className='flex items-baseline gap-4'>
                        <Link href="/dashboard">
                            <FiUser size={26} color='#4b5563' />
                        </Link>

                        <button onClick={handleLogout} data-testid="icon-logout">
                            <FiLogOut size={26} color='#ff3a13' />
                        </button>
                    </div>
                )}

            </div>
        </header>

    )
}