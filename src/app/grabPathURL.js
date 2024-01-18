'use client'

import { usePathname } from 'next/navigation'

const pathname = usePathname();

export const metadata = {
    title: pathname
}