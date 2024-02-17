"use client"
import { useRouter } from 'next/navigation'
import { FiRefreshCcw } from 'react-icons/fi'

export function ButtonRefresh(){
    const router = useRouter();
    return(
        <button
         onClick={() => router.refresh()}
         className='bg-gray-500 px-4 py-1 rounded'id='btn-refresh'
         >
            <FiRefreshCcw size={24} color='#FFF' />
        </button>
    )
}