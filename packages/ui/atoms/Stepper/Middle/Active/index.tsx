/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 23 March 2022 10:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import React from 'react';

const ActiveMiddle = () => {
  return (
    <div>
      <svg
        width="274"
        height="52"
        viewBox="0 0 274 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_625_15924)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M257.188 2.7812C256.446 1.6684 255.197 1 253.86 1H7.4745C4.27972 1 2.37415 4.56058 4.1463 7.2188L14.5212 22.7812C15.417 24.1248 15.417 25.8752 14.5212 27.2188L4.1463 42.7812C2.37415 45.4394 4.27972 49 7.4745 49H253.86C255.197 49 256.446 48.3316 257.188 47.2188L270.521 27.2188C271.417 25.8752 271.417 24.1248 270.521 22.7812L257.188 2.7812Z"
            fill="#00AEEF"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_625_15924"
            x="1.46777"
            y="0"
            width="271.726"
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
              result="effect1_dropShadow_625_15924"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_625_15924"
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

export default ActiveMiddle;
