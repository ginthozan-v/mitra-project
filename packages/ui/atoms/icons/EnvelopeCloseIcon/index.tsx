/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 6th June 2022 04:16 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function EnvelopeCloseIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1.42109 6.56074H22.575V17.6681H1.42109V6.56074Z"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
      <path
        d="M1.42109 6.56074L8.29609 11.186C11.0881 13.0042 12.709 12.9292 15.7 11.186L22.575 6.56074"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

export default EnvelopeCloseIcon;
