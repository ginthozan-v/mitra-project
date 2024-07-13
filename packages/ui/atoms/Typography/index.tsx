/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 15 March 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { textColor, textType } from './types';
import type { types } from './types';

const Typography = ({
  textColorScheme,
  children,
  textTypeScheme,
  className,
}: types) => {
  if (textTypeScheme === textType.h1) {
    return (
      <h1
        className={`${textColor[textColorScheme]} ${className} text-8xl font-light item-center`}
      >
        {children}
      </h1>
    );
  }
  if (textTypeScheme === textType.h2) {
    return (
      <h2
        className={`${textColor[textColorScheme]} ${className} text-6xl font-light item-center`}
      >
        {children}
      </h2>
    );
  }
  if (textTypeScheme === textType.h3) {
    return (
      <h3
        className={`${textColor[textColorScheme]} ${className} text-5xl font-normal item-center`}
      >
        {children}
      </h3>
    );
  }
  if (textTypeScheme === textType.h4) {
    return (
      <h4
        className={`${textColor[textColorScheme]} ${className} text-4xl font-medium item-center`}
      >
        {children}
      </h4>
    );
  }
  if (textTypeScheme === textType.h5) {
    return (
      <h5
        className={`${textColor[textColorScheme]} ${className} text-2xl font-normal item-center`}
      >
        {children}
      </h5>
    );
  }
  if (textTypeScheme === textType.h6) {
    return (
      <h6
        className={`${textColor[textColorScheme]} ${className} text-xl font-normal item-center py-6`}
      >
        {children}
      </h6>
    );
  }
  if (textTypeScheme === textType.bodyRegular1) {
    return (
      <p
        className={`${textColor[textColorScheme]} ${className} text-base font-normal item-center`}
      >
        {children}
      </p>
    );
  }
  if (textTypeScheme === textType.bodyHeavy1) {
    return (
      <p
        className={`${textColor[textColorScheme]} ${className} text-base font-semibold item-center`}
      >
        {children}
      </p>
    );
  }
  if (textTypeScheme === textType.bodyRegular2) {
    return (
      <p
        className={`${textColor[textColorScheme]} ${className} text-sm font-normal item-center`}
      >
        {children}
      </p>
    );
  }
  if (textTypeScheme === textType.bodyHeavy2) {
    return (
      <p
        className={`${textColor[textColorScheme]} ${className} text-sm font-semibold item-center`}
      >
        {children}
      </p>
    );
  }
  if (textTypeScheme === textType.intro) {
    return (
      <p
        className={`${textColor[textColorScheme]} ${className} text-lg font-light item-center`}
      >
        {children}
      </p>
    );
  }
  if (textTypeScheme === textType.introSmall) {
    return (
      <p
        className={`${textColor[textColorScheme]} ${className} text-base font-light item-center`}
      >
        {children}
      </p>
    );
  }
  if (textTypeScheme === textType.menu) {
    return (
      <p
        className={`${textColor[textColorScheme]} ${className} text-xsm font-semibold item-center`}
      >
        {children}
      </p>
    );
  }
};

export default Typography;
