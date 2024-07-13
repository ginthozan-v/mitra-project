/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Tuesday, 26 April 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { PropsReactChildren, PropsComplete } from '@mtcloud/globals/types';
import Button from '@mtcloud/ui/atoms/Button';
import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons';

const CompletionIndividual = ({
  title1,
  title2,
  successMgs,
  mgs,
  button1Text,
  button2Text,
  className,
  button1Action,
  button2Action,
  children,
}: PropsComplete & PropsReactChildren) => {
  return (
    <div className='mx-auto max-w-3xl px-4 flex flex-col items-center'>
      <h3 className='text-4xl font-medium mt-20 mb-5 text-center'>{title1}</h3>
      {title2 ? <h3 className='text-6xl font-medium mt-20 mb-5 text-center'>{title2}</h3> : null}

      {children}

      <h4 className={`mt-4 text-center text-3xl md:px-24 mb-8 leading-normal text-mtBlue ${className}`}>{successMgs}</h4>
      {mgs ? <p className=' text-center text-xl md:px-24 mb-8 leading-normal text-mtBlue'>{mgs}</p> : null}
      {button1Text && button1Action && (
        <Button
          colorScheme='skyBlue'
          textStyleScheme='semiboldMedium'
          textColorScheme='white'
          sizeScheme='md'
          borderScheme='rounded'
          onClick={button1Action}
          type='submit'
        >
          {button1Text}
        </Button>
      )}
      {button2Text && button2Action && (
        <button className='flex text-mtBlue font-semibold mt-8' onClick={button2Action}>
          <span>{button2Text}</span>
          <ChevronRightIcon className='w-5 h-5 ml-1 mt-1' />
        </button>
      )}
    </div>
  );
};

export default CompletionIndividual;
