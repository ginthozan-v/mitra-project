/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 22 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { PropsStepper } from '@mtcloud/globals/types';

const stepperData = [
  {
    individualTitle: 'Personal Information',
    enterpriseTitle: 'Business Information',
    id: 0,
  },
  {
    individualTitle: 'Email Verification',
    enterpriseTitle: 'Email Verification',
    id: 1,
  },
  {
    individualTitle: 'Mobile Verification',
    enterpriseTitle: 'Mobile Verification',
    id: 2,
  },
  {
    individualTitle: 'Password Creation',
    enterpriseTitle: 'Password Creation',
    id: 3,
  },
];

const Stepper = ({ step, isIndividual, updateStep }: PropsStepper) => {
  return (
    <div className='flex w-full max-w-2xl'>
      {stepperData.map(({ individualTitle, enterpriseTitle, id }) => (
        <div key={id} className='w-1/4'>
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

          <p className='p-2 text-center text-sm font-normal text-[#474747]'>
            {isIndividual ? individualTitle : enterpriseTitle}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
