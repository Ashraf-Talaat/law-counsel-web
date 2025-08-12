import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function ProfileNav() {
  return (
      <nav className='bg-[#1c202e] h-30 w-full'>
        <h2 className='text-white text-2xl absolute top-7 right-9'>الصفحة الشخصية</h2>
         <Link href={`/lawyer/home/articles`}>
        <ChevronLeftIcon className="w-8 h-8 text-white absolute top-7 left-9 cursor-pointer" />
      </Link>
      </nav>
  )
}


