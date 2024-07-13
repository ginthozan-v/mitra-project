/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 3 May 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { ChevronDownIcon, ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

const FAQListItem = ({ faq }) => {
  const { locale } = useRouter();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='bg-white rounded-md overflow-hidden shadow mt-4'>
      <button
        className='w-full flex items-center justify-start px-3 py-2'
        onClick={() => setExpanded(!expanded)}
      >
        <div className='text-left flex grow space-x-2'>
          <span className='font-medium opacity-80'>Question: </span>
          <span className='text-sm leading-6 whitespace-normal'>{faq.question[locale]}</span>
        </div>
        <div className='shrink-0'>
          {expanded ? (
            <ChevronDownIcon className='w-6 h-6' />
          ) : (
            <ChevronRightIcon className='w-6 h-6' />
          )}
        </div>
      </button>
      {expanded && (
        <div className='bg-blue-50 p-3'>
          <div className='font-medium mb-2 opacity-80'>Answer: </div>
          <div className='text-sm'>
            {ReactHtmlParser(faq.answer[locale])}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQListItem;
