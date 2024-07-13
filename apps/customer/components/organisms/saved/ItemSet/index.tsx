/* eslint-disable no-unused-vars */
/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 1 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { DeleteIcon, EditIcon } from '@mtcloud/ui/atoms/icons';
import QuantityButton from 'components/atoms/QuantityButton';
import useCurrency from 'components/hooks/useCurrency';
import BillingType from '@/components/atoms/BillingType';

const ItemSet = ({
  data,
  total,
  deleteItem,
  addToCart,
  buyAll,
  buyNow,
}: {
  data;
  total: string;
  deleteItem: (val: string) => void;
  addToCart: (val: string) => void;
  buyAll: () => void;
  buyNow: (val: string) => void;
}) => {
  const currency = useCurrency();
  let specification = '';
  data.map(({ detail }) => ({
    detail: detail.map(({ key, value }) => {
      specification += key + ':' + value + ', ';
    }),
  }));

  const changeDuration = (duration) => {
    console.log('change duration', duration);
  };

  const changeBillingMode = (billing) => {
    console.log('change duration', billing);
  };

  return (
    <div className='mx-auto max-w-7xl px-4 flex flex-col md:flex-row w-full'>
      <div className='grow md:w-2/3'>
        {data.map(({ id, title, quantity, billingType, duration, pricing, discount }) => (
          <div className='flex flex-col md:flex-row w-full p-4 rounded-md bg-white shadow mt-4' key={id}>
            <div className='w-full md:w-2/3'>
              <h2 className='text-outerSpace text-xl '>{title}</h2>
              <div className='text-sonicSilver text-xs line-clamp-1 text-justify pl-2'>{specification}</div>
              <div className='grow'>
                <ul className='mt-5 space-y-3'>
                  <li className='text-outerSpace'>
                    <div className='flex items-center text-sm'>
                      <label className='w-[95px] min-w-[95px]'>Billing Type: </label>
                      <div className='flex gap-1'>
                        <BillingType selection={billingType} changeBillingType={changeBillingMode} />
                      </div>
                    </div>
                  </li>
                  <li className='text-outerSpace'>
                    <div className='flex items-center text-sm'>
                      <label className='w-[95px] min-w-[95px]'>Duration: </label>
                      <QuantityButton quantity={duration} change={changeDuration} />
                    </div>
                  </li>
                </ul>
              </div>
              <div className='flex justify-around md:justify-start mt-2'>
                <button className='flex items-center text-mtBlue font-semibold text-base' onClick={() => deleteItem(id)}>
                  <DeleteIcon className='w-6 h-6' />
                </button>
              </div>
            </div>

            <div className='w-full md:w-1/3'>
              <h1 className='md:text-right text-center text-mtBlue font-semibold text-3xl md:text-xl md:py-0 py-2'>
                {currency.symbol} {pricing}
              </h1>
              <h3 className='text-right text-sonicSilver'>{discount}</h3>

              <div className='flex md:justify-end justify-between md:mt-24'>
                <button className='py-1 px-4 rounded-md border-mtBlue text-mtBlue border-2 font-semibold text-base' onClick={() => addToCart(id)}>
                  Add to Cart
                </button>
                <button className='ml-4 py-1.5 px-4 bg-skyBlue text-white rounded-md font-semibold text-base' onClick={() => buyNow(id)}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='md:w-1/3 p-4 '>
        <div className='bg-white rounded-md shadow p-4 text-mtBlue'>
          <h2 className='text-2xl font-semibold text-center '>Total</h2>
          <h3 className='text-3xl text-center mt-2'>
            {currency.symbol} {total}
          </h3>
          <button className='bg-skyBlue py-1 text-white rounded-md font-semibold w-full mt-4' onClick={() => buyAll()}>
            Buy All Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemSet;
