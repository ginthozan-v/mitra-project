/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons';

/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 21 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

const Table = ({ onActionClick, headers, data }) => {
  const dateCheck = (val: string) => {
    const validUntil = new Date(val);
    const currentDate = new Date();
    const monthAheadCurrent = new Date(new Date().setMonth(new Date().getMonth() + 1));

    if (validUntil < currentDate || (validUntil > currentDate && validUntil < monthAheadCurrent)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <table className='w-full'>
      <thead>
        <tr className='bg-[#F2F8FB] text-sm'>
          {headers.map((i, index) => (
            <th key={i} className={`h-10 px-3 whitespace-nowrap text-left`}>
              {i}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((i, index) => (
          <tr key={index} className='border-b border-b-[#F2F8FB] text-sm'>
            {Object.values(i).map((val, index) => (
              <td
                key={index}
                className={`h-10 px-3 ${
                  index === 3 && 'truncate max-w-[300px] hover:text-clip hover:max-w-full'
                } border-t border-t-blue-100 text-left ${index === 0 && 'hidden'}  `}
              >
                <button
                  className={`inline-flex items-center ${i.validUntil && index === 7 && dateCheck(val.toString()) ? 'font-semibold' : ''}`}
                  onClick={() => {
                    onActionClick(i.id, i.billingMode);
                  }}
                >
                  {val}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const FixedCol = ({ onActionClick, review }) => {
  return (
    <table className='w-40'>
      <thead>
        <tr className='bg-[#F2F8FB] text-sm'>
          <th className='h-10 px-3 whitespace-nowrap text-left'>Actions</th>
        </tr>
      </thead>

      <tbody>
        {review.map((val, index) => (
          <tr key={index} className='border-b border-b-[#F2F8FB] text-sm'>
            <td className='h-10 px-3 whitespace-nowrap border-t border-t-blue-100 text-left'>
              <button
                className='inline-flex items-center'
                onClick={() => {
                  onActionClick(val.productId, val.status);
                }}
              >
                {val.status === 'UNEXPIRED' || val.status === 'UNEXPIRED_RATED' ? (
                  <span className='font-semibold'>Extend</span>
                ) : (
                  <div>
                    {val.status === 'EXPIRED_RATED' ? (
                      <span className='font-semibold'>View Rating</span>
                    ) : (
                      <span className='font-semibold'>Rate Product</span>
                    )}
                  </div>
                )}

                <ChevronRightIcon className='w-4 h-4' />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SampleTable = ({
  isAction,
  onActionClick,
  headers,
  data,
  review,
  mgs,
}: {
  isAction: boolean;
  onActionClick?: (id: string, mode: string) => void;
  headers?: string[];
  data?: string[];
  review?: {
    productId: string;
    status: string;
    rating: number;
    ratingDescription: string;
  }[];
  mgs?: string;
}) => {
  return (
    <div className='bg-white rounded-md shadow text-mtBlue'>
      {data && data.length === 0 ? (
        <div className='text-center text-3xl font-medium py-20'>{mgs}</div>
      ) : (
        <div className='flex overflow-hidden'>
          <div className='grow overflow-x-auto overflow-y-hidden'>
            <Table onActionClick={onActionClick} headers={headers} data={data} />
          </div>
          {isAction && (
            <div className='w-40 shrink-0 overflow-hidden bg-gray-50'>
              <FixedCol onActionClick={onActionClick} review={review} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SampleTable;
