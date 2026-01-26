import React from 'react'

function Gradient({ title, description }) {
    return (
        <div
            className="
    w-full mt-[66px] md:mt-[83px] py-[50px] md:py-[100px] 
    bg-secondary-main
    flex items-center justify-center
    "
        >
            <section className="max-w-7xl flex flex-col px-s32 gap-s16 md:gap-s24 mx-auto text-center ">
                <h1 className="text-3xl leading-tight  font-bold md:text-5xl md:leading-relaxed font-primary  text-primary-main">
                    {title}
                </h1>
                <p className='text-sm md:text-lg md:font-medium md:leading-relaxed text-center text-main max-w-3xl mx-auto'>{description}</p>
            </section>
        </div>
    )
}

export default Gradient
