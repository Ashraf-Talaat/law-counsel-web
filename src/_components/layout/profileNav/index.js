import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function ProfileNav() {
  return (
      <nav className='bg-[#1c202e] h-48 w-full'>
        <h2 className='text-white text-2xl absolute top-7 right-9'>الصفحة الشخصية</h2>
        <Link href={`/client/allSpecializations`}>
        <ChevronLeftIcon className="w-14 h-14 text-white absolute top-7 left-9 cursor-pointer" />
      </Link>
      </nav>
  )
}


