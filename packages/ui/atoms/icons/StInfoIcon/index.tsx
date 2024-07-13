/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 21 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function StInfoIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        fill="#EBF2FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2 3.78963C12.4845 3.32996 10.6681 3.4192 9.00588 4.0448C7.34369 4.6704 5.91921 5.80095 4.93251 7.27765C3.94581 8.75436 3.44644 10.503 3.50455 12.2781C3.56266 14.0532 4.17533 15.7655 5.2565 17.1745C6.33767 18.5835 7.83304 19.6184 9.53258 20.134C11.2321 20.6495 13.0505 20.6198 14.7322 20.0489C16.414 19.478 17.8747 18.3947 18.9092 16.9511C19.9437 15.5074 20.5 13.776 20.5 12C20.5 11.7239 20.7239 11.5 21 11.5C21.2761 11.5 21.5 11.7239 21.5 12C21.5 13.985 20.8782 15.9201 19.722 17.5335C18.5658 19.147 16.9333 20.3578 15.0537 20.9958C13.1741 21.6339 11.1418 21.6671 9.2423 21.0909C7.34281 20.5147 5.67151 19.358 4.46315 17.7832C3.25478 16.2085 2.57003 14.2947 2.50509 12.3108C2.44014 10.3269 2.99825 8.37252 4.10104 6.72208C5.20383 5.07165 6.79589 3.8081 8.65363 3.1089C10.5114 2.40969 12.5415 2.30996 14.4588 2.82371C14.7255 2.89518 14.8838 3.16935 14.8123 3.43608C14.7409 3.70281 14.4667 3.8611 14.2 3.78963Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5 6.5V12.5H17.5V6.5H18.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 5V3.5H18.5V5H17.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default StInfoIcon;
