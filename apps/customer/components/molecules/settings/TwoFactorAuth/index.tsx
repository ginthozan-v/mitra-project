/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 04 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import QRCode from 'react-qr-code';

const authTypes = [
  { id: 0, type: 'SMS', label: 'SMS' },
  { id: 1, type: 'EMAIL', label: 'Email' },
  // { id: 2, type: 'SMS_EMAIL', label: 'SMS & Email' },
  { id: 3, type: 'GOOGLE', label: 'Google Authentication' },
];

const TwoFactorAuth = ({ enabled: on, method, onChange: change }: { enabled: boolean; method: string; onChange: (a: any) => void }) => {
  const [firstload, setFirstload] = useState(true);
  const [enabled, setEnabled] = useState(on);
  const [selectedMethod, setSelectedMethod] = useState(method);

  useEffect(() => {
    setEnabled(on);
    setSelectedMethod(method);
    setFirstload(false);
  }, [on, method]);

  const enableTFA = (tfa_enabled) => {
    setEnabled(tfa_enabled);
    let defaultMethod = 'SMS_EMAIL';
    if (!tfa_enabled) {
      defaultMethod = 'NONE';
    }
    setSelectedMethod(defaultMethod);
    updateMethod(defaultMethod);
  };

  const updateMethod = (val: string) => {
    change(val);
  };

  return (
    <>
      {firstload ? (
        <span className='pt-2 text-base text-center md:text-left md:pt-0'>Enable Two Factor Authentication</span>
      ) : (
        <div className='flex flex-col items-start justify-between w-full sm:flex-row'>
          <div className='flex items-center py-3 pr-6 '>
            <span className='text-base text-center md:text-left md:pt-0'>Enable Two Factor Authentication</span>
            <Switch checked={enabled} onChange={enableTFA} className={`${enabled ? 'bg-[#00AEEF] on' : 'bg-[#A7CDE4]'} switch`}>
              <span aria-hidden='true' className={`nob`} />
            </Switch>
          </div>
          {enabled ? (
            <div className='shrink' style={{ marginTop: 0 }}>
              {authTypes.map(({ id, type, label }, index) => (
                <div className={`${index > 0 ? 'pt-1' : ''}`} key={id}>
                  <label>
                    <input
                      className='w-4 h-4 pt-1'
                      type='radio'
                      name='authType'
                      defaultChecked={type === selectedMethod}
                      value={type}
                      onClick={(e: any) => {
                        updateMethod(type);
                      }}
                    />
                    <span className='pl-2 text-sm'>{label}</span>
                  </label>
                </div>
              ))}
              {method === 'GOOGLE' && (
                <div className='w-full p-4 mt-5 bg-gray-200 rounded-lg aspect-square'>
                  <QRCode
                    size={256}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    viewBox={`0 0 256 256`}
                    value='otpauth://totp/carbon.super:kim?secret=b3RwYXV0aDovL3RvdHAvY2FyYm9uLnN1cGVyOmdpbnRob3phbnZAbWl0cmFpLmNvbT9zZWNyZXQ9NlJERERTTDVRWjRKM1BYViZpc3N1ZXI9Y2FyYm9uLnN1cGVyJnBlcmlvZD0zMA==&issuer=carbon.super&period=30'
                  />
                </div>
              )}
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
    </>
  );
};

export default TwoFactorAuth;
