/*
 * File: index.ts
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: Monday, 7 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
export type PropsReactChildren = {
  children?: React.ReactNode;
};
export type PropsSEO = {
  title: string;
  desc: string;
};

export type PropsStepper = {
  step: number;
  updateStep?: (num: number) => void;
  userId?: string;
  updateId?: (userId: string) => void;
  userEmail?: string;
  updateEmail?: (email: string) => void;
  userMobile?: string;
  updateMobile?: (mobile: string) => void;
  isIndividual?: boolean;
  isPwdCreated?: boolean;
  isError?: boolean;
  updateError?: (val: boolean) => void;
  updatePwdState?: (val: boolean) => void;
  getData?: () => void;
  loading?: boolean;
  setPath?: (val: string) => void;
};

export type PropsComplete = {
  title1: string;
  title2?: string;
  successMgs: string;
  mgs?: string
  button1Text?: string;
  button1Action?: React.MouseEventHandler<HTMLButtonElement>;
  button2Text?: string;
  button2Action?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};
