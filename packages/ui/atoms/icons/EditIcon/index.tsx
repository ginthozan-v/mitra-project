/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 05 August 2022 12:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function EditIcon({ className }: { className: string }) {
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
                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            />
        </svg>
    )
}

export default EditIcon
