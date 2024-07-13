/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 17 October 2022, 13:45
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import IndustryDropdown from 'components/molecules/industries/IndustryDropdown';
import IndustryItem from 'components/molecules/industries/IndustryItem';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { IMAGE_PATH } from '@/constants';
import Img from '@/components/molecules/Img';

type industryMenuItems = {
  solutionId: string;
  industry: string;
  solutionKey: string;
};

const Solution = ({ industries, industry }) => {
  const [selected] = useState(industry);

  const { push, locale } = useRouter();
  const redirect = (key) => {
    push(`${locale !== 'en' ? '/' + locale : ''}/industries/${key}`);
  };

  useEffect(() => {
    redirect(selected.solutionKey);
  }, [locale]);

  const updateSelect = (newState: industryMenuItems) => {
    redirect(newState.solutionKey);
  };

  const clickHandle = (path: string) => {
    if (!path.startsWith('http:') && !path.startsWith('https:')) {
      path = '//' + path;
    }
    document.location.href = path;
  };

  return (
    <div>
      {industries.length !== 0 ? (
        <div>
          <div
            className='relative bg-center bg-cover h-full'
            style={{
              height: '400px',
              backgroundImage: selected?.solutionBanner ? `url(${IMAGE_PATH}/${selected?.solutionBanner})` : 'url(/no-image.png)',
            }}
          >
            <div className='flex flex-col items-center absolute inset-x-0 bottom-0 pb-6'>
              <IndustryDropdown items={industries} selected={selected} locale={locale} updateSelect={updateSelect} />
            </div>
          </div>

          <div className='content-wrapper'>
            <div className='flex flex-wrap'>
              <div className='w-full md:w-1/2 grid place-items-center py-6 md:p-6 text-3xl md:text-5xl font-light md:font-light text-gray-500'>
                {selected?.solutionTitle[locale]}
              </div>
              <div className='w-full md:w-1/2 md:p-6 text-lg md:text-xl font-light text-gray-600'>{selected?.solutionDescription[locale]}</div>
            </div>

            <h2 className='text-2xl font-medium md:text-normal mt-12'>{selected?.solutionIndustry[locale]}</h2>

            <div className='flex flex-wrap mt-4 -mx-6'>
              {selected?.solutionSubList?.slice(0 - 4).map((items) => (
                <IndustryItem key={items.id} subItems={items} locale={locale} />
              ))}
            </div>

            <div className='flex flex-wrap mt-6 md:mt-12'>
              <div className='w-full md:w-1/2 py-6 pr-0 md:pr-6'>
                <Img src={`${IMAGE_PATH}/${selected?.solutionImage}`} alt={'Solution Image'} height={'288px'} width={'512px'} />
              </div>
              <div className='w-full md:w-1/2 md:p-6'>
                <div className='text-lg font-light'>{ReactHtmlParser(selected?.solutionImageDescription[locale])}</div>
              </div>
            </div>

            <h2 className='text-xl md:text-3xl font-medium md:text-normal mt-12 md:mt-6'>{selected?.solutionAdditionalSubTitle[locale]}</h2>
            <a
              onClick={() => clickHandle(selected?.solutionAdditionalInfoLink)}
              className='mt-5 text-base text-mtBlue font-semibold flex px-4 md:px-1 cursor-pointer'
            >
              <span>{selected?.solutionAdditionalLinkName[locale]}</span>
              <ChevronRightIcon className='w-6 h-6' />
            </a>
          </div>
        </div>
      ) : (
        <div className='text-center text-3xl font-medium py-20'>No data found</div>
      )}
    </div>
  );
};

export default Solution;
