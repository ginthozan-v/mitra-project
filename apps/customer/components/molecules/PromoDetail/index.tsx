/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 27 May 2022 12:36 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Button from '@mtcloud/ui/atoms/Button';
import Image from 'next/image';
import React from 'react';

const PromoDetail = () => {
  return (
    <div className='p-5'>
      <div className='relative w-full h-20 lg:h-32 object-cover'>
        <Image src={`/offer1.png`} layout='fill' alt='' />
      </div>
      <div className='flex flex-col lg:flex-row w-full items-center lg:items-start justify-between mt-3'>
        <div className='lg:w-[70%]'>
          <h1>
            <p className={`text-xl lg:text-2xl text-[#535353]`}>Velit dictum ut risus mattis </p>
          </h1>
          <p className='text-xs lg:text-sm leading-snug text-[#474747] mt-2'>
            Sapien molestie integer ipsum turpis ut arcu in. Orci faucibus nullam sed pellentesque.
            Eu, vitae nulla venenatis consectetur.
          </p>
        </div>
        <span
          className={`text-xl lg:text-3xl font-extrabold text-center text-transparent bg-clip-text 
                                bg-gradient-to-r from-[#EC008C] to-[#FFA400]`}
        >
          10% off
        </span>
      </div>
      <div className='flex flex-col lg:flex-row  w-full items-center lg:items-start justify-between mt-5'>
        <div>
          <p className='text-base'>
            promo code: <span className='text-lg text-[#6BAAD2] font-extrabold'>MT2022ECS</span>
          </p>
          <p className='text-base'>
            valid until: <span className='text-lg text-[#535353]'>22.05.2022</span>
          </p>
        </div>
        <Button
          colorScheme='skyBlue'
          textStyleScheme='semiboldMedium'
          textColorScheme='white'
          sizeScheme='sm'
          borderScheme='rounded'
          onClick={() => {
            ('');
          }}
          type='button'
          className='my-2'
        >
          Buy
        </Button>
      </div>
      <div className='text-xs mt-3'>
        <p>*Disclaimer</p>
        <p>
          Sapien molestie integer ipsum turpis ut arcu in. Orci faucibus nullam sed pellentesque.
          Eu, vitae nulla venenatis consectetur. Mi blandit diam nulla netus tellus. Nibh egestas
          consectetur nec leo integer ullamcorper.4
        </p>
      </div>
    </div>
  );
};

export default PromoDetail;
