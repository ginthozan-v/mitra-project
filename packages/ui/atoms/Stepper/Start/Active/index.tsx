/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 23 March 2022 10:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import React from 'react';

const ActiveStart = () => {
  return (
    <div>
      <svg
        width="276"
        height="52"
        viewBox="0 0 276 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_625_15937)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 5C2 2.79086 3.79086 1 6 1H255.859C257.197 1 258.446 1.6684 259.187 2.7812L272.521 22.7812C273.417 24.1248 273.417 25.8752 272.521 27.2188L259.187 47.2188C258.446 48.3316 257.197 49 255.859 49H6C3.79086 49 2 47.2091 2 45V5Z"
            fill="#00AEEF"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_625_15937"
            x="0"
            y="0"
            width="275.192"
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
              result="effect1_dropShadow_625_15937"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_625_15937"
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

export default ActiveStart;
