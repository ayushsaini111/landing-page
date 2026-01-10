import Button from '@/components/ui/Button'
import React from 'react'
import Data from "@/Data/About.json"
import Image from 'next/image'

const { title, description } = Data

function AboutSection() {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-s32'>

    <div className="bg-secondary-main rounded-r16 w-full h-[220px] grid place-items-center">
  <Image 
    src="/Images/Subtract.png"
    width={147}
    height={130}
    alt="icon"
  />
</div>

            <div>
                <div className='flex flex-col items-center gap-s16'>
                    <div>
                        <span className='page-title-h2 text-accent-main'>{title}</span>
                        <span className='body-default'>{description}</span>
                    </div>
                </div>
                <Button children={"Learn more"} variant={"outliner"} as={"link"} href={"/about"} />
            </div>
        </div>
    )
}

export default AboutSection
