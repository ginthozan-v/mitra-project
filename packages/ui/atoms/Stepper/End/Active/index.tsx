/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 23 March 2022 10:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import React from 'react';

const ActiveEnd = () => {
  return (
    <div>
      <svg
        width="258"
        height="52"
        viewBox="0 0 258 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_625_15920)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.1463 7.2188C2.37415 4.56058 4.27972 1 7.47451 1H252C254.21 1 256 2.79086 256 5V45C256 47.2091 254.21 49 252 49H7.4745C4.27972 49 2.37415 45.4394 4.1463 42.7812L14.5212 27.2188C15.417 25.8752 15.417 24.1248 14.5212 22.7812L4.1463 7.2188Z"
            fill="#00AEEF"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_625_15920"
            x="1.46777"
            y="0"
            width="256.532"
            height="52"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_625_15920"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_625_15920"
              result="shape"
            />
          </filter>
        </defs>
        <text
          x="30"
          y="30"
          className="text-sm font-normal item-center fill-white"
        >
          Step Name
        </text>
      </svg>
    </div>
  );
};

export default ActiveEnd;
