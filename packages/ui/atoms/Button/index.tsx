/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 14 March 2022 10:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { colors, textStyle, textColor, border, size } from './types';
import type { propTypes } from './types';

const Button = ({
  colorScheme,
  textStyleScheme,
  textColorScheme,
  sizeScheme,
  borderScheme,
  children,
  onClick,
  type,
  disabled,
  className = '',
}: propTypes) => {
  return (
    <button
      className={` ${disabled ? textColor['charcoal'] : textColor[textColorScheme]} ${
        textStyle[textStyleScheme]
      } ${size[sizeScheme]} ${border[borderScheme]} ${className} ${
        disabled ? colors['argent'] : colors[colorScheme]
      } ${!disabled && 'hover:opacity-80'} `}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
