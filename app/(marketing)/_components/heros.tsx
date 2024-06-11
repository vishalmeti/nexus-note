import Image from 'next/image'
import React from 'react'

const Heros = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl' >
        <div className="flex items-center">
            <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
            <Image src="/documents.png" fill className='objet-contain' alt='Documents' />
            </div>
            <div className="relative h-[400px] w-[400px] hidden md:block">
                <Image className='object-conatin' alt='reading' src="/reading.png" fill />
            </div>
        </div>
    </div>
  )
}

export default Heros