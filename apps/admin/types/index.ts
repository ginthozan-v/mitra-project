/**
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Shihab Bhuiyan (sbhuiyan@mitrai.com)
 * File Created: 23 August 2022, 10:33
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { RolePermission } from 'models/role-permission';

export type UserPermission = {
  code: string;
  description?: string;
  accessible: boolean;
  subcategories?: UserPermission[];
  pages?: RolePermission[];
}
