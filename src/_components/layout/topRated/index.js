import Image from 'next/image'
import React from 'react'

export default function index() {
  return (
    <div>
      <div>
        <Image
          src="/images/topRated.png"  
          alt="topRated"
          width={500}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}
