/* eslint-disable no-unused-vars */
/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 22 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import 'react-datepicker/dist/react-datepicker.css';
import AllProductsSelector from '../AllProductsSelector';

type billingCycles = { id: string; title: string };

const BillingHistoryHead = ({
  discount,
  billTotal,
  items,
  selected,
  updateSelect,
  updateKeyword,
}: {
  discount;
  billTotal;
  selected: billingCycles;
  items: billingCycles[];
  updateSelect: (state: billingCycles) => void;
  updateKeyword: (val: string) => void;
}) => {
  return (
    <div className='py-4 md:flex md:justify-between'>
      <div>
        <div className='font-semibold mb-1'>Billing Cycle</div>
        <div style={{ width: '300px' }}>
          <AllProductsSelector
            items={items.slice(0 - 24)}
            selected={selected}
            updateSelect={updateSelect}
          />
        </div>
        <input
          className='md:mx-0 mx-1.5 max-w-[300px] w-full bg-[#F2F8FB] rounded-md px-3 py-2 border border-mtBlue/50 mt-5'
          placeholder='Filter by'
          id='keyword'
          onChange={() =>
            updateKeyword((document.getElementById('keyword') as HTMLInputElement).value)
          }
        />
        <p className='mt-1 text-gray-400 text-sm'>
          Filter by Date of Bill, Bill Number, Billing Mode, Currency
        </p>
      </div>
      <div className='md:flex-none flex flex-row justify-between pt-2'>
        <div className='flex flex-row md:pr-12'>
          <div className='text-sm'>Total : </div>
          <div className='flex flex-col pl-1 text-sm font-semibold text-right'>
            {billTotal.map(({ currency, value }) => (
              <div key={currency}>
                {currency} {parseFloat(value).toFixed(2)}
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='text-sm'>Discount : </div>
          <div className='flex flex-col pl-1 text-sm font-semibold text-right'>
            {discount.map(({ currency, value }) => (
              <div key={currency}>
                {currency} {parseFloat(value).toFixed(2)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingHistoryHead;
