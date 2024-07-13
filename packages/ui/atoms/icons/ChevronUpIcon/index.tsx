/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 21 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function ChevronUpIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6631 14.8481C17.4381 15.0731 17.1329 15.1995 16.8147 15.1995C16.4966 15.1995 16.1914 15.0731 15.9663 14.8481L12.0147 10.8965L8.06315 14.8481C7.95245 14.9628 7.82004 15.0542 7.67363 15.1171C7.52723 15.18 7.36976 15.2131 7.21043 15.2144C7.05109 15.2158 6.89308 15.1855 6.7456 15.1251C6.59813 15.0648 6.46414 14.9757 6.35147 14.863C6.2388 14.7503 6.1497 14.6164 6.08936 14.4689C6.02902 14.3214 5.99866 14.1634 6.00005 14.0041C6.00143 13.8447 6.03453 13.6873 6.09742 13.5409C6.16032 13.3945 6.25173 13.262 6.36635 13.1513L11.1663 8.35134C11.3914 8.12638 11.6966 8 12.0147 8C12.3329 8 12.6381 8.12638 12.8631 8.35134L17.6631 13.1513C17.8881 13.3764 18.0145 13.6815 18.0145 13.9997C18.0145 14.3179 17.8881 14.6231 17.6631 14.8481Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ChevronUpIcon;
