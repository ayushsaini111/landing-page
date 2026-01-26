import Button from '@/components/ui/Button'
import React from 'react'
import Data from "@/Data/About.json"
import Image from 'next/image'

const { title, description } = Data

function AboutSection() {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-s32 '>

            <div className="bg-secondary-dark rounded-r16 w-full h-[220px] grid place-items-center">
                <Image
                    src="/Images/Subtract.png"
                    width={147}
                    height={130}
                    alt="icon"
                />
            </div>


            <div className='space-y-s24 px-s16'>
                <div>
                    <span className='heading-h3 text-primary-main'>{title}</span>
                    <span className='body-default'>{description}</span>
                </div>
                <div className="flex justify-center md:justify-start">
                    <Button
                        children={"Learn more"}
                        variant={"outliner"}
                        as={"link"}
                        href={"/about"}
                    />
                </div>

            </div>


        </div>

    )
}

export default AboutSection
