/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Thursday, 24 March 2022 8:30 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useRef, useEffect } from 'react';

function usePrevious<T>(value?: T) {
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default usePrevious;
