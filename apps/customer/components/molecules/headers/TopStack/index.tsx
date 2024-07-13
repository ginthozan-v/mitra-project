/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 31 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MegaMenu from 'components/molecules/headers/MegaMenu';
import TopMenu from 'components/molecules/headers/TopMenu';
import Mobile from 'components/molecules/headers/Mobile';
import { ROUTE_NOTIFICATIONS } from 'constants/routes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isLoggedIn } from 'utils/auth';
import useStore from 'store';

const TopStack = () => {
  const { locale } = useRouter();
  const [isAuthenticated] = useState(isLoggedIn());
  const [isMount, setMount] = useState(false);
  const status = useStore((state) => state.status);

  useEffect(() => {
    setMount(true);
  }, [locale]);

  return (
    isMount && (
      <>
        <div className='fixed inset-x-0 top-0 z-[999] bottom-shadow'>
          <Mobile />

          {isAuthenticated ? (
            <div>
              {status === 'INTERMEDIATE' ? (
                <div className='flex justify-center py-2 w-full h-10 bg-[#FDF7E0] text-sm font-semibold border-2 border-solid border-[#E0B400]'>
                  Your profile is currently under review. You will receive an Email shortly.
                </div>
              ) : (
                status === 'REJECTED' && (
                  <div className='flex justify-center py-2 w-full h-10 bg-[#FFDDDD] text-sm font-semibold border-2 border-solid border-[#BC0000]'>
                    <p>
                      Your profile has been rejected. Please follow this{' '}
                      <strong>
                        <a href={ROUTE_NOTIFICATIONS}>link</a>{' '}
                      </strong>{' '}
                      to learn more and update your profile.
                    </p>
                  </div>
                )
              )}
            </div>
          ) : null}

          <TopMenu />
          <MegaMenu />
        </div>
        <style jsx>{`
          .bottom-shadow {
            box-shadow: 0 2px 4px rgb(72 72 72 / 20%);
          }
        `}</style>
      </>
    )
  );
};

export default TopStack;
