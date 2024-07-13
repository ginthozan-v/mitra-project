/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 21 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function PriceTagIcon({ className } : {className : string }) {
  return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><g clipPath="url(#clip0_6_151)"><path fillRule="evenodd" clipRule="evenodd" d="M12.268 0.53464C12.3383 0.464314 12.4336 0.424805 12.5332 0.424805H23.1998C23.4069 0.424805 23.5748 0.592698 23.5748 0.799807V11.4664C23.5748 11.5659 23.5353 11.6613 23.465 11.7317L11.7317 23.465C11.5852 23.6114 11.3477 23.6114 11.2013 23.465L0.53464 12.7983C0.388193 12.6518 0.388193 12.4144 0.53464 12.268L12.268 0.53464ZM14.9988 8.46638C14.7691 8.23665 14.4575 8.10765 14.1326 8.10765H10.9326C10.6077 8.10765 10.2962 8.23665 10.0664 8.46638C10.0377 8.4951 10.0106 8.5251 9.98505 8.55622C9.8064 8.77425 9.70762 9.04837 9.70762 9.33262V9.86595C9.70762 10.1909 9.8367 10.5024 10.0664 10.7321C10.0951 10.7608 10.1252 10.788 10.1563 10.8135C10.3742 10.9922 10.6484 11.0909 10.9326 11.0909H14.1326C14.6564 11.0909 15.1588 11.2991 15.5291 11.6694C15.8995 12.0398 16.1076 12.5422 16.1076 13.066V13.5993C16.1076 14.1231 15.8995 14.6254 15.5291 14.9958C15.1588 15.3662 14.6564 15.5743 14.1326 15.5743H13.2826C13.0755 15.5743 12.9076 15.7422 12.9076 15.9493V16.4241C12.9076 16.6313 12.7397 16.7991 12.5326 16.7991C12.3255 16.7991 12.1576 16.6313 12.1576 16.4241V15.9493C12.1576 15.7422 11.9897 15.5743 11.7826 15.5743H10.9326C10.4088 15.5743 9.90645 15.3662 9.5361 14.9958C9.48975 14.9495 9.44602 14.9011 9.40485 14.851C9.11693 14.4995 8.95762 14.0576 8.95762 13.5993V13.441C8.95762 13.2338 9.12547 13.066 9.33262 13.066C9.5397 13.066 9.70762 13.2338 9.70762 13.441V13.5993C9.70762 13.9242 9.8367 14.2358 10.0664 14.4655C10.0951 14.4942 10.1252 14.5213 10.1563 14.5469C10.3742 14.7255 10.6484 14.8243 10.9326 14.8243H14.1326C14.4575 14.8243 14.7691 14.6952 14.9988 14.4655C15.0275 14.4368 15.0547 14.4067 15.0802 14.3756C15.2588 14.1577 15.3576 13.8836 15.3576 13.5993V13.066C15.3576 12.7411 15.2285 12.4294 14.9988 12.1997C14.7691 11.97 14.4575 11.8409 14.1326 11.8409H10.9326C10.4088 11.8409 9.90645 11.6329 9.5361 11.2624C9.48975 11.2162 9.44602 11.1678 9.40485 11.1176C9.11693 10.7662 8.95762 10.3243 8.95762 9.86595V9.33262C8.95762 8.80882 9.16568 8.30647 9.5361 7.93605C9.58237 7.88977 9.63075 7.84605 9.68093 7.80487C10.0324 7.51695 10.4743 7.35762 10.9326 7.35762H11.7826C11.9897 7.35762 12.1576 7.18972 12.1576 6.98262V6.50771C12.1576 6.30061 12.3255 6.13271 12.5326 6.13271C12.7397 6.13271 12.9076 6.30061 12.9076 6.50771V6.98262C12.9076 7.18972 13.0755 7.35762 13.2826 7.35762H14.1326C14.6564 7.35762 15.1588 7.5657 15.5291 7.93605C15.8995 8.30647 16.1076 8.80882 16.1076 9.33262V9.49095C16.1076 9.69802 15.9398 9.86595 15.7326 9.86595C15.5255 9.86595 15.3576 9.69802 15.3576 9.49095V9.33262C15.3576 9.00772 15.2285 8.69617 14.9988 8.46638ZM12.5786 1.28464L1.5953 12.268C1.44897 12.4143 1.44885 12.6514 1.59494 12.7979C1.59482 12.7978 1.59506 12.7981 1.59494 12.7979L11.2013 22.4043C11.3477 22.5508 11.5852 22.5508 11.7317 22.4043L22.715 11.421C22.7853 11.3506 22.8248 11.2552 22.8248 11.1558V1.54981C22.8248 1.3427 22.6569 1.17481 22.4498 1.17481H12.8438C12.7444 1.17481 12.649 1.21432 12.5786 1.28464ZM20.3748 3.30801V3.62467H20.6915V3.30801H20.3748ZM21.0665 2.55801C21.2736 2.55801 21.4415 2.7259 21.4415 2.93301V3.99967C21.4415 4.20678 21.2736 4.37467 21.0665 4.37467H19.9998C19.7927 4.37467 19.6248 4.20678 19.6248 3.99967V2.93301C19.6248 2.7259 19.7927 2.55801 19.9998 2.55801H21.0665Z" fill="currentColor" /></g><defs><clipPath id="clip0_6_151"><rect width={24} height={24} fill="white" /></clipPath></defs></svg>;
}

export default PriceTagIcon;