import Button from '@/components/ui/Button'
import React from 'react'
import Data from "@/Data/data.json"

const { title, description } = Data.homePage.aboutSection

function AboutSection() {
    return (
        <div className='flex flex-col items-center gap-s16'>
            <div>
                <span className='page-title-h2'>{title}</span>
                <span className='body-default'>{description}</span>
            </div>
            <Button children={"Learn more"} variant={"outliner"} as={"link"} href={"/about"} />
        </div>
    )
}

export default AboutSection
