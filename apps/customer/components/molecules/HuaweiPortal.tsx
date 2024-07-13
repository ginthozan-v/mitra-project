/**
 * File: HuaweiPortal.tsx
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 23 November 2022, 16:41
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import api from '@/api';
import Confirm from '@/components/molecules/Confirm';
import { ROUTE_CART } from '@/constants/routes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const HuaweiPortal = ({ url, className }) => {
  const { push } = useRouter();
  const [confirm, setConfirm] = useState(false);

  let tempVar = 0;
  const checkStatus = () => {
    api.products.getAllMeta().then((res) => {
      // Replace with actual api call...
      if (tempVar === 4) {
        // Replace with actual condition...
        setConfirm(true);
      } else {
        setTimeout(checkStatus, 5000);
      }
      tempVar++;
    });
  };

  useEffect(() => {
    setTimeout(checkStatus, 120000);
  }, []);

  return (
    <>
      {url && (
        <>
          <div className='max-w-7xl mx-auto p-4'>
            <iframe className={className} src={url}></iframe>
          </div>
          {confirm && (
            <Confirm
              open={confirm}
              heading='Purchase'
              content={`Received the Resource purchase request. Do you want to load the Shopping cart and continue the payment?`}
              confirmButtonLabel='Go to Cart'
              cancelButtonLabel='Stay here'
              onConfirm={() => push(ROUTE_CART)}
              onCancel={() => {
                setConfirm(false);
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default HuaweiPortal;
