import React from 'react'
import { backgroundColor, textColor } from '../types'

const AchievedPointsCard = ({ type, points, user }) => {
    return (
        <div className={`p-5 lg:p-6 xl:p-10 rounded-lg w-full shadow-lg ${backgroundColor[type]}`}>
            <p className={`text-2xl lg:text-5xl capitalize ${textColor[type]}`}>{type} Level</p>
            <h1 className='text-center text-6xl lg:text-8xl text-[#474747] leading-relaxed lg:leading-normal'>{points} <span className='text-5xl lg:text-7xl'>points</span> </h1>
            <p className={`text-lg lg:text-2xl ${textColor[type]}`}>{user}</p>
        </div>
    )
}

export default AchievedPointsCard