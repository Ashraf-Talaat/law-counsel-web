import Image from 'next/image'
import React from 'react'

export default function loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
          <Image src="/images/logo-dark.png" alt="Logo" width={200} height={200} />
          <div className="mt-6 w-12 h-12 border-4 border-gray-200 border-t-[#262b3e] rounded-full animate-spin" />
        </div>
  )
}
