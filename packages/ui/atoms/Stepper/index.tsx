/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 23 March 2022 10:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import React, { useState } from 'react';
import Button from '../Button';
import ActiveEnd from './End/Active';
import DefaultEnd from './End/Default';
import ActiveMiddle from './Middle/Active';
import DefaultMiddle from './Middle/Default';
import ActiveStart from './Start/Active';
import DefaultStart from './Start/Default';

const Stepper = ({ step }: { step: number }) => {
  return (
    <div className="flex flex-cols">
      {step === 1 ? <ActiveStart /> : <DefaultStart />}
      {step === 2 ? <ActiveMiddle /> : <DefaultMiddle />}
      {step === 3 ? <ActiveEnd /> : <DefaultEnd />}
    </div>
  );
};

export default Stepper;
