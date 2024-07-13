/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 30 May 2022 04:16 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function ArrowLeftIcon({ className }: { className: string }) {
    return (
        <svg
            viewBox="0 0 44 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M34.2129 20.5H9.00342"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M21.6081 32.4583L9.00342 20.5L21.6081 8.54163"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}

export default ArrowLeftIcon;
