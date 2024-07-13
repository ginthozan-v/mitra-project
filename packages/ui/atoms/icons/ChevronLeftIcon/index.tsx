/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 21 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function ChevronLeftIcon({ className }: { className: string }) {
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
        d="M15.2484 6.3366C15.4734 6.56164 15.5998 6.86681 15.5998 7.185C15.5998 7.5032 15.4734 7.80837 15.2484 8.0334L11.2968 11.985L15.2484 15.9366C15.363 16.0473 15.4544 16.1797 15.5173 16.3261C15.5802 16.4725 15.6133 16.63 15.6147 16.7893C15.6161 16.9487 15.5857 17.1067 15.5254 17.2542C15.4651 17.4016 15.376 17.5356 15.2633 17.6483C15.1506 17.761 15.0166 17.8501 14.8692 17.9104C14.7217 17.9707 14.5637 18.0011 14.4043 17.9997C14.245 17.9983 14.0875 17.9652 13.9411 17.9023C13.7947 17.8394 13.6623 17.748 13.5516 17.6334L8.75161 12.8334C8.52665 12.6084 8.40027 12.3032 8.40027 11.985C8.40027 11.6668 8.52665 11.3616 8.75161 11.1366L13.5516 6.3366C13.7766 6.11164 14.0818 5.98526 14.4 5.98526C14.7182 5.98526 15.0234 6.11164 15.2484 6.3366Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ChevronLeftIcon;
