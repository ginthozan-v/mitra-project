/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 05 August 2022 12:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function PlusCircleIcon({ className }: { className: string }) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
        </svg>
    )
}

export default PlusCircleIcon
