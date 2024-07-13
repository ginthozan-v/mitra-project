/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 26 May 2022 05:26 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Img from '@/components/molecules/Img';
import { IMAGE_PATH } from '@/constants';
import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import Image from 'next/image';
import Link from 'next/link';

const LoyaltyScheme = ({
  loyaltyData,
}: {
  loyaltyData: {
    id: string;
    title: string;
    subTitle: string;
    label: string;
    deepLinkName: string;
    deepLink: string;
    shortDescription: string;
    image: string;
  }[];
}) => {
  return (
    <div className='w-full p-5 lg:px-4 lg:py-10 bg-mtLandingBG'>
      <div className='max-w-7xl mx-auto bg-white rounded-xl p-5 lg:p-10 text-center '>
        <h1 className='text-center font-bold text-3xl text-[#1A1A1A]'>{loyaltyData[0]?.title}</h1>
        <p className='text-sm lg:text-lg text-[#535353] lg:leading-loose'>{loyaltyData[0]?.label}</p>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
          <div className='relative w-full h-52'>
            <Img src={`${IMAGE_PATH}/${loyaltyData[0]?.image}`} alt='' layout='fill' objectFit='cover' />
          </div>
          <div className='text-left'>
            <h2 className='text-xl lg:text-2xl text-[#1A1A1A] font-semibold'>{loyaltyData[0]?.subTitle}</h2>
            <p className='mt-2 text-sm lg:text-base text-[#535353]'>
              {loyaltyData[0]?.shortDescription}
              {/* <Link href={`#`}>
                <a className='flex items-center text-[#003E5C] font-bold'>
                  Read more <ChevronRightIcon className='w-5 h-5' />
                </a>
              </Link> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyScheme;
