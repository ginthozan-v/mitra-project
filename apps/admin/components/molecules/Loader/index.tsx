/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 27 July 2022 12:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

const Loader = () => {
    return (
        <div className='animate-pulse'>
            <div className='flex flex-col gap-3 p-10 bg-gray-200 rounded-lg'>
                <div className='flex items-center gap-10'>
                    <div className='w-1/3 h-5 bg-gray-300 rounded'></div>
                    <div className='w-2/3 h-10 border-2 border-gray-300 rounded'></div>
                </div>
                <div className='flex items-center gap-10'>
                    <div className='w-1/3 h-5 bg-gray-300 rounded'></div>
                    <div className='w-2/3 h-10 border-2 border-gray-300 rounded'></div>
                </div>
                <div className='flex items-center gap-10'>
                    <div className='w-1/3 h-5 bg-gray-300 rounded'></div>
                    <div className='w-2/3 h-10 border-2 border-gray-300 rounded'></div>
                </div>
                {/* <p className='text-gray-600'>Loading...</p> */}
            </div>
        </div>
    )
}

export default Loader
