import React from 'react'
import { backgroundColor, textColor } from '../types'

const LoyaltyLevelsCard = ({ type, from, to }) => {

    return (
        <div className={`p-5 lg:p-10 rounded-xl shadow-md flex flex-col lg:flex-row justify-between items-start my-5 ${backgroundColor[type]}`}>
            <h1 className={`text-2xl lg:text-5xl capitalize ${textColor[type]}`}>{type} Level</h1>
            <h1 className='text-6xl lg:text-8xl text-right mx-auto lg:ml-auto lg:mr-0 text-[#757575] leading-10 mt-4'>{from} - {to} <br /> <span className='text-3xl lg:text-7xl'>points</span>
            </h1>
        </div>
    )
}

export default LoyaltyLevelsCard