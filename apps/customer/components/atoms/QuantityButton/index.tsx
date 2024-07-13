/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 18 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { MinusIcon, PlusIcon } from '@/../../packages/ui/atoms/icons';
import React, { useEffect, useState } from 'react';

const QuantityButton = ({
  quantity: qty,
  change,
  min,
  max,
  disabled = false,
  className = '',
  stepper = 1,
  suffix = '',
}: {
  quantity?: any;
  change?: any;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  stepper?: number;
  suffix?: string;
}) => {
  const [prevQuantity, updatePrevQuantity] = useState<number>(qty);
  const [quantity, updateQuantity] = useState<number>(qty);

  //change to default if not set
  if (!min) {
    min = 0;
  }
  if (!max) {
    max = 100;
  }

  const setQuantity = (newQuantity) => {
    //added due to MCP-1458
    if (!isNaN(newQuantity)) {
      if (min <= newQuantity && newQuantity <= max) {
        updatePrevQuantity(quantity);
        updateQuantity(parseInt(newQuantity));
      }
    }
  };

  const handlePlus = () => {
    if (!isNaN(quantity) && quantity < max) {
      setQuantity(quantity + stepper);
    } else setQuantity(max);
  };

  const handleMinus = () => {
    if (!isNaN(quantity) && quantity > min) {
      setQuantity(quantity - stepper);
    } else setQuantity(min);
  };

  useEffect(() => {
    if (prevQuantity !== quantity) {
      change(quantity);
    }
  }, [quantity]);

  return (
    <>
      <div className={`pl-1 flex items-center ${disabled ? 'opacity-60' : ''}`}>
        <button
          className='flex justify-center items-center w-6 h-6 border border-solid border-box border-mtBlue rounded-l'
          disabled={disabled ? disabled : null}
          onClick={handleMinus}
        >
          <MinusIcon className='w-4 h-4'></MinusIcon>
        </button>
        <input
          className='h-6 w-10 text-center border border-solid border-box border-x-0 border-mtBlue px-2'
          min={min}
          max={max}
          value={quantity}
          disabled={disabled ? disabled : null}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
        <button
          className='flex justify-center items-center w-6 h-6 border border-solid border-box border-mtBlue rounded-r'
          disabled={disabled ? disabled : null}
          onClick={handlePlus}
        >
          <PlusIcon className='w-4 h-4'></PlusIcon>
        </button>
      </div>
      {suffix && <span className='text-sm ml-2'>{suffix}</span>}
    </>
  );
};

export default QuantityButton;
