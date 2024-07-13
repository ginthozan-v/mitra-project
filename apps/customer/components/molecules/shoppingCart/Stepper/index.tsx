/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 18 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { ROUTE_CART } from '@/constants/routes';
import { PropsStepper } from '@mtcloud/globals/types';
import Link from 'next/link';

const stepperData = [
  {
    title: 'Shopping Cart',
    id: 0,
  },
  {
    title: 'Billing Mode',
    id: 1,
  },
  {
    title: 'Confirm Purchase',
    id: 2,
  },
];

const Stepper = ({ step, updateStep }: PropsStepper) => {
  const styles = (id) => {
    return step >= id ? 'border-[#00aeef] bg-[#00aeef] text-white' : 'bg-slate-50 border-[#BFBFBF] text-[#BFBFBF]';
  };
  const cursor = (id) => {
    return step === id || id === 2 ? 'cursor-default' : '';
  };
  const link = (id) => {
    if (step === id || id === 2) return '#';
    return id === 0 ? ROUTE_CART : `${ROUTE_CART}/?step=${id}`;
  };

  return (
    <div className='flex w-full py-10 md:px-96'>
      {stepperData.map(({ title, id }) => (
        <div key={id} className='w-1/3'>
          <div className='relative w-full'>
            <div className='w-full flex justify-center'>
              <Link href={link(id)}>
                <a
                  className={`w-11 h-11 rounded-full z-10 border border-solid text-sm grid place-items-center font-normal ${styles(id)} ${cursor(
                    id,
                  )}`}
                >
                  {id + 1}
                </a>
              </Link>
              {/* {step === id || step > id ? (
                <Link href={`?step=${id}`}>
                  <a
                    className={`w-11 h-11 rounded-full z-10 border border-solid text-sm grid place-items-center font-normal ${
                      step === id || step > id ? 'border-[#00aeef] bg-[#00aeef] text-white' : 'bg-slate-50 border-[#BFBFBF] text-[#BFBFBF]'
                    }`}
                  >
                    {id + 1}
                  </a>
                </Link>
              ) : (
                <div
                  className={`w-11 h-11 rounded-full z-10 border border-solid text-sm grid place-items-center font-normal ${
                    step === id || step > id ? 'border-[#00aeef] bg-[#00aeef] text-white' : 'bg-slate-50 border-[#BFBFBF] text-[#BFBFBF]'
                  }`}
                >
                  {id + 1}
                </div>
              )} */}
            </div>
            <div className='absolute inset-x-0 top-5'>
              <div className='flex'>
                <div className={`w-1/2 ${!id ? '' : step === id || step > id ? 'bg-[#00aeef]' : 'bg-[#BFBFBF]'} h-0.5`} />
                <div
                  className={`w-1/2 ${id === stepperData.length - 1 ? '' : step === id + 1 || step > id ? 'bg-[#00aeef]' : 'bg-[#BFBFBF]'} h-0.5`}
                />
              </div>
            </div>
          </div>

          <p className='p-3 text-center text-sm font-normal text-[#474747]'>{title}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
