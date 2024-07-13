/* eslint-disable no-unused-vars */

/*
 * File: types.ts
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 29 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

export enum PrimaryItems {
  Dashboard = 'dashboard',
  CMS = 'cms',
  Billing = 'billing',
  MGMT = 'mgmt',
  User = 'userCreate',
  Settings = 'settings'
}

export interface RoutingItems {
  [key: string]: { primary: PrimaryItems; secondary: string };
}

export type MenuList = {
  id: string;
  code: string;
  route: string;
  title: string;
}[];

type NestedList = {
  id: string;
  code: string;
  title: string;
  items: MenuList;
}[];

export type MenuItemSet = {
  id: PrimaryItems;
  code: string;
  Icon: ({ className }: { className: string }) => JSX.Element;
  secondaryItems: NestedList;
  defaultRoute: string;
};

export type MenuItem = MenuItemSet;
