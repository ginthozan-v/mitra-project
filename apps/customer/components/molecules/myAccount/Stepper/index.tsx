/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 18 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { PropsStepper } from '@mtcloud/globals/types';

const stepperData = [
  {
    title: 'Update Profile',
    id: 0,
  },
  {
    title: 'Update Verification',
    id: 1,
  },
];

const Stepper = ({ step, updateStep }: PropsStepper) => {
  return (
    <div className='mx-auto max-w-7xl flex py-10 w-full md:w-96'>
      {stepperData.map(({ title, id }) => (
        <div key={id} className='w-1/2'>
          <div className='relative w-full'>
            <div className='w-full flex justify-center'>
              <button
                className={`w-11 h-11 rounded-full z-10 border border-solid text-sm grid place-items-center font-normal ${
                  step === id || step > id
                    ? 'border-[#00aeef] bg-[#00aeef] text-white'
                    : 'bg-slate-50 border-[#BFBFBF] text-[#BFBFBF]'
                }`}
                onClick={() => updateStep(0)}
                disabled={id === 0 ? false : true}
              >
                {id + 1}
              </button>
            </div>
            <div className='absolute inset-x-0 top-5'>
              <div className='flex'>
                <div
                  className={`w-1/2 ${
                    id && (step === id || step > id ? 'bg-[#00aeef]' : 'bg-[#BFBFBF]')
                  } h-0.5`}
                />
                <div
                  className={`w-1/2 ${
                    id !== stepperData.length - 1 &&
                    (step === id + 1 || step > id ? 'bg-[#00aeef]' : 'bg-[#BFBFBF]')
                  } h-0.5`}
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
