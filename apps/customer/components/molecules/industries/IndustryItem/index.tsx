import { IMAGE_PATH } from "@/constants";

/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Friday, 13 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
type itemType = {
  id: number;
  solutionSubIcon: string;
  solutionSubTitle: any;
  solutionSubDescription: any;
};

const IndustryItem = ({ subItems, locale }: { subItems: itemType; locale: string }) => {
  return (
    <div className='w-full md:w-1/2 py-3 px-6'>
      <div className='bg-white h-full shadow rounded-md p-3 flex'>
        <div className='shrink-0'>
          <img src={`${IMAGE_PATH}/${subItems?.solutionSubIcon}`} className='w-8 h-8 md:w-12 md:h-12' />
        </div>
        <div className='px-3'>
          <h3 className='font-semibold text-xl mb-2'>{subItems.solutionSubTitle[locale]}</h3>
          <p className='line-clamp-9'>{subItems?.solutionSubDescription[locale]}</p>
        </div>
      </div>
    </div>
  );
};

export default IndustryItem;
