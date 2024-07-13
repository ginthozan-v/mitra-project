/*
 * File: badge/index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 07 April 2022 03:16 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { propTypes, colors } from './types';

function Badge({ value, type }: propTypes) {
  return (
    <div
      className={`text-xs text-center truncate font-semibold w-24 py-1 rounded-full m-0 ${colors[type]}`}
    >
      <span>{value}</span>
    </div>
  );
}

export default Badge;
