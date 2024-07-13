/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 27 May 2022 09:30 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Img from '@/components/molecules/Img';
import { IMAGE_PATH } from '@/constants';
import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import BannerSlider from 'components/atoms/BannerSlider';
import { ROUTE_PROMO } from 'constants/routes';
import Link from 'next/link';

const imageData = [
  {
    id: 'x',
    priority: 1,
    title: 'sp banner 1',
  },
];

const SpecialOffers = ({
  promotionData,
}: {
  promotionData: {
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
  const imageData = promotionData.map((i) => ({
    id: i.id,
    priority: 1,
    title: i.title,
    banner: i.image,
  }));
  return (
    <div className='max-w-7xl w-full mx-auto px-4 mt-16 text-mtBlue'>
      <div className='grid grid-cols-1 lg:grid-cols-6'>
        <div className='lg:col-start-2 col-span-4'>
          <h2 className='text-center font-bold text-3xl text-[#1A1A1A]'>{promotionData[0]?.title}</h2>
          <div className='max-w-5xl w-full mx-auto mt-3'>
            <p className='text-center text-base lg:text-lg text-[#535353]'>{promotionData[0]?.label}</p>
          </div>
        </div>
        <div className='col-end-4 lg:col-end-7 flex flex-col justify-start items-center right-0 ml-auto'>
          {/* <div className="text-[#003E5C] flex items-center gap-5">
            <ArrowLeftIcon className="w-12 h-12" />
            <ArrowRightIcon className="w-12 h-12" />
          </div> */}
          {/* <Link href={ROUTE_PROMO}>
            <a className='flex items-center gap-1 text-sm text-[#003E5C] font-bold'>
              See all <ChevronRightIcon className='w-5 h-5' />
            </a>
          </Link> */}
        </div>
      </div>
      <div className='my-5'>
        {/* <BannerSlider
          images={imageData}
          className='relative w-full h-[100px] md:h-[200px] lg:h-[300px]'
        /> */}
        <img src={`${IMAGE_PATH}/${promotionData[0]?.image}`} alt='' className='relative w-full h-[100px] md:h-[200px] lg:h-[300px] object-cover' />
      </div>
    </div>
  );
};

export default SpecialOffers;
