/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 6th June 2022 04:16 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function EnvelopeOpenIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.19297 11.5852H15.5968" stroke="black" strokeMiterlimit="10" />
      <path d="M8.29609 5.14629H15.7" stroke="black" strokeMiterlimit="10" />
      <path
        d="M8.29609 8.3668C9.04309 8.3668 13.1879 8.3668 14.1134 8.3668"
        stroke="black"
        strokeMiterlimit="10"
      />
      <path
        d="M5.65187 4.97871L1.42109 9.13725V20.1708H22.575V9.13725L18.3441 4.97871"
        stroke="black"
        strokeMiterlimit="10"
      />
      <path
        d="M1.42109 9.13809L8.29609 13.7326C10.9963 15.4054 12.6133 15.3457 15.7 13.7326L22.575 9.13809"
        stroke="black"
        strokeMiterlimit="10"
      />
      <path
        d="M18.3501 12.0151V3.42969H5.65782V12.0151"
        stroke="black"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export default EnvelopeOpenIcon;
