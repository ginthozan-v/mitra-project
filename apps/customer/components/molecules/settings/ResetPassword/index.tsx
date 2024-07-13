// /*
//  * File: index.tsx
//  * Project: MT Cloud Portal
//  * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
//  * File Created: Wednesday, 04 May 2022 11:00 am
//  * Module: MT Cloud Portal Frontend
//  * Copyright 2022 - 2022 Mitra Innovation Ltd.
//  */

// import React, { useEffect, useRef, useState } from 'react';

// const ResetPassword = () => {
//   const baseUrl = process.env.NEXT_PUBLIC_AUTH_HOST;
//   const objectRef = useRef<any>();
//   const [loaded, setLoaded] = useState(false);
//   const [height, setHeight] = useState(0);

//   const contentLoaded = () => {
//     objectRef.current.contentWindow.postMessage({ contentLoaded: true }, '*');
//     setLoaded(true);
//   };

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       window.addEventListener(
//         'message',
//         (event) => {
//           if (event.origin == baseUrl && event.data.contentHeight) {
//             setHeight(event.data.contentHeight);
//           }
//         },
//         false,
//       );
//     }
//   }, []);

//   return (
//     <>
//       <iframe
//         className={`${loaded ? '' : 'opacity-0'}`}
//         ref={objectRef}
//         style={{ width: '100%', height: height }}
//         onLoad={contentLoaded}
//         src={`${baseUrl}/myaccount/security`}
//       ></iframe>
//       {/* <object
//         className={`${loaded ? '' : 'opacity-0'}`}
//         ref={objectRef}
//         style={{ width: '100%', height: height }}
//         type='text/html'
//         onLoad={contentLoaded}
//         data={`${baseUrl}/myaccount/security`}
//       ></object> */}
//     </>
//   );
// };

// export default ResetPassword;

/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 04 May 2022 11:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Button from '@mtcloud/ui/atoms/Button';
import ResetPassword from 'components/molecules/ResetPasswordForm';
import React from 'react';
import { useState } from 'react';

const ResetPwd = () => {
  const [reset, setReset] = useState(false);
  return (
    <div className={`flex md:flex-row justify-between items-center w-full bg-[#F2F8FB] my-4 ${reset ? 'h-full' : 'h-32 md:h-24'}`}>
      <div className={`pt-2 md:pt-0 pb-3 md:pb-0 ${reset ? '' : 'md:pr-64'}`}>
        <span className='text-base'>Reset Password</span>
        {/* <p className='text-xs'>Last Reset 02/02/2022</p> */}
      </div>
      {reset ? (
        <div className=''>
          <ResetPassword />
        </div>
      ) : (
        <Button
          colorScheme='skyBlue'
          textStyleScheme='semiboldSmall'
          textColorScheme='white'
          sizeScheme='sm'
          borderScheme='rounded'
          onClick={() => setReset(true)}
        >
          Reset
        </Button>
      )}
    </div>
  );
};

export default ResetPwd;
