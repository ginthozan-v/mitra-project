/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 21 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function ChevronRightIcon({ className }: { className: string }) {
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
        d="M8.76661 17.6484C8.54165 17.4234 8.41527 17.1182 8.41527 16.8C8.41527 16.4818 8.54165 16.1766 8.76661 15.9516L12.7182 12L8.76661 8.04841C8.652 7.93771 8.56058 7.8053 8.49769 7.65889C8.4348 7.51249 8.4017 7.35502 8.40031 7.19569C8.39893 7.03635 8.42929 6.87834 8.48963 6.73086C8.54997 6.58339 8.63907 6.4494 8.75174 6.33673C8.86441 6.22406 8.99839 6.13496 9.14587 6.07462C9.29335 6.01428 9.45136 5.98392 9.6107 5.98531C9.77003 5.98669 9.92749 6.01979 10.0739 6.08268C10.2203 6.14558 10.3527 6.23699 10.4634 6.35161L15.2634 11.1516C15.4884 11.3766 15.6148 11.6818 15.6148 12C15.6148 12.3182 15.4884 12.6234 15.2634 12.8484L10.4634 17.6484C10.2384 17.8734 9.93321 17.9998 9.61501 17.9998C9.29682 17.9998 8.99165 17.8734 8.76661 17.6484Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ChevronRightIcon;
