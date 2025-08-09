import Image from 'next/image';
import React from 'react'

export default function LoadingLogo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Logo Container */}
      <div className="relative mb-8">
        <Image 
          src="/images/logo-loading.png" 
          alt="Logo" 
          width={180} 
          height={180}
          className="animate-pulse"
        />
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-[#c9b38cab] rounded-full blur-xl opacity-20 animate-pulse"></div>
      </div>

     

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-pulse">
          جاري التحميل...
        </h2>
        <p className="text-gray-600 text-sm">
          يرجى الانتظار قليلاً
        </p>
      </div>

      {/* Animated Dots */}
      <div className="flex space-x-1 mt-4">
        <div className="w-2 h-2 bgPrimary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bgPrimary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bgPrimary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}
