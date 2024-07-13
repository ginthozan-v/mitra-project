import React from 'react'
import Image from 'next/image';
import Button from '@mtcloud/ui/atoms/Button';

const SpecialOffersCard = ({ image, promo, valid, percentage, flip = false, onBtnClick }) => {
    return (
        <div className=' mb-5'>
            <div className='relative p-5 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14'>
                <div className={`relative h-60 object-cover overflow-hidden rounded-xl ${flip && 'lg:order-last'}`}>
                    <Image src={image} layout='fill' />
                </div>
                <div className={`flex flex-col justify-between ${flip ? 'text-right lg:text-left' : 'text-right'}`}>
                    <p className={`text-left lg:text-right text-3xl text-[#535353] ${flip && 'ml-0 mr-auto'}`}>Velit dictum ut risus mattis </p>
                    <div className='flex justify-between items-end'>

                        <div className={`absolute top-2 left-2 lg:static w-24 h-24 bg-gray-50 lg:bg-transparent rounded-full grid 
                        place-items-center bg-opacity-80 ${flip && 'lg:order-last'}`}>
                            <span className={`text-3xl lg:text-5xl font-extrabold text-center text-transparent bg-clip-text 
                                bg-gradient-to-r from-[#EC008C] to-[#FFA400]`}>
                                {percentage}<br />
                                off
                            </span>
                        </div>
                        <div className={`text=[#474747]  mt-3 ${flip ? 'ml-auto lg:mr-auto lg:ml-0' : 'ml-auto'}`}>
                            <p className='text-lg leading-loose'>promo code: <span className='text-2xl text-[#6BAAD2] font-extrabold'>{promo}</span></p>
                            <p className='text-lg leading-loose'>valid until: <span className='text-xl text-[#535353]'>{valid}</span></p>
                            <Button
                                colorScheme="skyBlue"
                                textStyleScheme="semiboldMedium"
                                textColorScheme="white"
                                sizeScheme="sm"
                                borderScheme="rounded"
                                onClick={() => onBtnClick()}
                                type="button"
                                className='my-2'
                            >
                                Details
                            </Button>
                            <p className='text-sm leading-loose text-[#757575]'>*conditions apply</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative h-5 w-full object-cover'>
                <Image src={'/offerCardBorder.png'} layout='fill' />
            </div>
        </div >
    )
}

export default SpecialOffersCard