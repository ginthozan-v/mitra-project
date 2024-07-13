/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 3 May 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useState } from 'react';
import moment from 'moment';
import { IMAGE_PATH } from '@/constants';

type newsData = {
  id: number;
  title: string;
  description: string;
  priority: number;
  redirectionLinkName: string;
  redirectionLink: string;
  image: string;
  active: boolean;
  updatedOn: Date;
};

const NewsListItem = ({ index, data }: { index: number; data: newsData }) => {
  const [expanded, setExpanded] = useState(false);

  const mgsDate = new Date(data.updatedOn);
  moment.relativeTimeThreshold('h', 24);
  moment.relativeTimeThreshold('d', 7);
  moment.relativeTimeThreshold('w', 4);
  moment.relativeTimeThreshold('m', 12);
  const t = moment(mgsDate).fromNow();

  const clickHandle = (path: string) => {
    if (!path.startsWith('http:') && !path.startsWith('https:')) {
      path = '//' + path;
    }
    document.location.href = path;
  };

  return (
    <div className=' bg-white shadow rounded-md'>
      <div className='flex flex-wrap mt-4'>
        <div className={`w-full md:w-1/2 p-6 ${index % 2 ? 'md:order-1' : ''}`}>
          <img src={`${IMAGE_PATH}/${data.image}`} alt='' className='rounded-md' />
        </div>
        <div className='w-full md:w-1/2  flex flex-col p-6 '>
          <h2 className='shrink-0 text-xl font-semibold'>{data.title}</h2>

          {expanded ? (
            <p className='shrink-0 text-justify mt-4'>
              {data.description}{' '}
              <a
                onClick={() => clickHandle(data.redirectionLink)}
                className='text-mtBlue font-semibold cursor-pointer'
              >
                {data.redirectionLinkName}
              </a>
            </p>
          ) : (
            <div>
              <p className='shrink-0 line-clamp-1 md:line-clamp-2 text-justify mt-4'>
                {data.description}
              </p>
              <a
                onClick={() => clickHandle(data.redirectionLink)}
                className='text-mtBlue font-semibold cursor-pointer'
              >
                {data.redirectionLinkName}
              </a>
            </div>
          )}

          <div className='flex justify-between pt-4'>
            <span className='text-xs md:text-sm font-normal text-[#757575]'>{t}</span>
          </div>
        </div>
      </div>
      <div className='flex justify-end pb-4 px-6'>
        {' '}
        <button className='text-mtBlue font-semibold' onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </div>
  );
};

export default NewsListItem;
