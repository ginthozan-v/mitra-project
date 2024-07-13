import React from 'react'
import { backgroundColor, textColor } from '../types'

const TargetLevelCard = ({ type, goal }) => {
    return (
        <div className={`p-5 lg:p-6 xl:p-10 rounded-lg shadow-md w-full flex items-center justify-center gap-3 lg:gap-0 lg:flex-col ${backgroundColor[type]}`}>
            <p className='text-sm md:text-xl lg:text-2xl text-[#757575] text-center'>You need more</p>
            <h1 className='text-center text-4xl md:text-7xl lg:text-8xl text-[#757575] leading'>{goal}</h1>
            <div>
                <p className='text-base md:text-xl lg:text-2xl text-[#757575] text-center'>points to</p>
                <h2 className={`text-3xl md:text-4xl lg:text-6xl text-center capitalize ${textColor[type]}`}>{type}</h2>
            </div>
        </div>
    )
}

export default TargetLevelCard