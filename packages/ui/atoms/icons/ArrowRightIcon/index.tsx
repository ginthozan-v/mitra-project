/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 30 May 2022 04:16 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function ArrowRightIcon({ className }: { className: string }) {
    return (
        <svg
            viewBox="0 0 44 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M9.43263 20.5L34.6421 20.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M22.0374 8.54167L34.6421 20.5L22.0374 32.4583"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}

export default ArrowRightIcon;
