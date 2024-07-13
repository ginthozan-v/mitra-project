/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 18 August 2022, 13:20
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

 export class Pagination {
  pageNo: number = 0;
  pageSize: number = 10;
  sortBy?: string;
  sortDir?: string;

  constructor(initial?: Partial<Pagination>) {
    Object.assign(this, initial);
  }

  /**
   * @returns Pagination params with default values.
   */
  static get defaults() {
    return new Pagination();
  }
}