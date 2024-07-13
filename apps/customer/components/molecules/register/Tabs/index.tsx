/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 22 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { ROUTE_REGISTER_INDIVIDUAL, ROUTE_REGISTER_ENTERPRISE } from 'constants/routes';
import Link from 'next/link';

const Tabs = ({ isIndividual }: { isIndividual: boolean }) => {
  return (
    <div className=' w-full mt-5 flex justify-center mb-3'>
      <Link href={ROUTE_REGISTER_INDIVIDUAL}>
        <a
          className={`block mx-2 py-2 px-6 font-semibold rounded-t-md bg-white shadow-md border-b-4 ${
            isIndividual ? 'text-[#535353] border-[#00aeef]' : 'text-[#BFBFBF] border-[#BFBFBF]'
          }`}
        >
          Individual User
        </a>
      </Link>
      <Link href={ROUTE_REGISTER_ENTERPRISE}>
        <a
          className={`block  py-2 px-6 font-semibold rounded-t-md bg-white shadow-md border-b-4 ${
            isIndividual ? 'text-[#BFBFBF] border-[#BFBFBF]' : 'text-[#535353] border-[#00aeef]'
          }`}
        >
          Enterprise User
        </a>
      </Link>
    </div>
  );
};

export default Tabs;
