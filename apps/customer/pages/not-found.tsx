/*
 * File: 404.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 15 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import HomeLayout from 'components/layouts/HomeLayout';
import SEO from 'components/utils/SEO';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <SEO title='Not Found' desc='Page not found.' />

      <div className='flex md:flex-row flex-col items-center justify-center py-60 px-6'>
        <div className='flex flex-col px-6 text-slate-400 py-6'>
          <div className='text-9xl font-extrabold'>404</div>
          <div className='text-xl text-center '>Page Not Found</div>
        </div>
        <div className='flex flex-col px-6 text-center text-2xl'>
          Sorry, the page you are looking for does not exist.
          <div className='flex justify-center'>
            <button
              onClick={() => router.push('/')}
              className='mt-3 text-center text-xl w-36 text-white font-medium p-2 bg-skyBlue border rounded-md'
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

NotFound.Layout = HomeLayout;
