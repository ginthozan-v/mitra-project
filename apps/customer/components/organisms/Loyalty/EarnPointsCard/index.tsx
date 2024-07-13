import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EarnPointCard = () => {
    return (
        <div className='shadow-sm rounded-lg flex flex-col-reverse lg:flex-row justify-between items-center bg-white p-7 my-4'>
            <div>
                <h1 className='text-3xl xl:text-4xl text-[#474747]'>Earn points to reach the next </h1>
                <p className='text-base text-[#757575] lg:w-[90%] xl:w-[60%] mt-4'>Consectetur convallis placerat eu, aliquet. Bibendum sed ac tempor, enim,
                    pellentesque non faucibus ultricies. Amet ut facilisis habitant eget mauris congue risus
                    nunc, elementum. Malesuada nibh vitae, sapien tellus sagittis et dui.
                </p>
                <Link href={`#`}>
                    <a className='flex items-center gap-2 text-xl lg:text-2xl text-[#003E5C] font-semibold mt-3'>
                        Learn more <ChevronRightIcon className='w-6 h-6' />
                    </a>
                </Link>
                <p className='text-sm  text-[#757575] mt-2'>*conditions apply</p>

            </div>
            <div className='relative h-64 w-full lg:w-[1400px] xl:w-[1000px]'>
                <Image src={'/loyalty.png'} layout='fill' />
            </div>
        </div>
    )
}

export default EarnPointCard