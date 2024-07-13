/**
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: 16 August 2022, 13:03
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { ChevronLeftIcon, ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import RowsSelector from '../customer/billing/RowsSelector';

const Pagination = ({
  updatePageLimit,
  limit,
  count,
  page,
  isDisable,
  nextPage,
  prevPage,
}: {
  updatePageLimit: (num: number) => void;
  limit: number;
  count: number;
  page: number;
  isDisable: boolean;
  nextPage: (page: number, total: number) => void;
  prevPage: (page: number) => void;
}) => {
  return (
    <div className='p-3 flex justify-between text-sm text-gray-600'>
      <div className='inline-flex items-center'>
        <div className='pr-2'>Rows per page</div>
        <RowsSelector updatePageLimit={updatePageLimit} />
      </div>
      <div className='inline-flex items-center'>
        <div className='mr-3'>
          {page * limit + 1}-{page * limit + limit > count ? count : page * limit + limit} of {count} items
        </div>
        <button onClick={() => prevPage(page)}>
          <ChevronLeftIcon className='w-5 h-5' />
        </button>
        <button onClick={() => nextPage(page, count)} disabled={isDisable}>
          <ChevronRightIcon className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
