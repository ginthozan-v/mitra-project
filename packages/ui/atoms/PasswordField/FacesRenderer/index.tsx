/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 23 March 2022 12:30 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { FcHappyIcon, FcNormalIcon, FcSadIcon } from '@mtcloud/ui/atoms/icons';

const FacesRenderer = ({ errors, currentError, touched }: any) => {
  if (!errors.password && !touched) {
    return <FcNormalIcon className='w-3.5 h-3.5 text-[#BFBFBF]' />;
  }
  if (errors.password?.includes(currentError) && touched) {
    return <FcSadIcon className='w-3.5 h-3.5 text-[#EA0000]' />;
  }
  if (!errors.password?.includes(currentError) && touched) {
    return <FcHappyIcon className='w-3.5 h-3.5 text-[#5FBD58]' />;
  }
  return <FcNormalIcon className='w-3.5 h-3.5 text-[#BFBFBF]' />;
};

export default FacesRenderer;
