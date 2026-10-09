"use client"
import React from 'react'
import Link from 'next/link'
import { Arvo } from 'next/font/google'
import '@/app/(rmw-v2)/styles/tailwind.css'

const arvo = Arvo({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function NotFound() {
  return (
    <section className={`min-h-screen flex items-center justify-center bg-white py-10 px-4 ${arvo.className}`}>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl text-center">
            {/* 404 Background Section */}
            <div
              className="h-[400px] bg-center bg-no-repeat bg-contain -mb-[50px]"
              style={{
                backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)'
              }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-center">404</h1>
            </div>
            
            {/* Content Box */}
            <div className="-mt-[50px]">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Look like you're lost
              </h3>
              
              <p className="text-base sm:text-lg mb-6 text-gray-600">
                the page you are looking for not avaible!
              </p>
              
              <Link 
                title="Go to Home"
                href="/" target="_blank" 
                className="inline-block text-white px-5 py-2.5 bg-[#39ac31] rounded hover:bg-[#2d8a26] transition-colors duration-200 mt-5 no-underline"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
