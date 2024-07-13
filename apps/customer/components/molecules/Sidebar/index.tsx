/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 09 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Link from 'next/link';
import React from 'react';

type ListItems = {
  title: string;
  id: string;
  path: string;
}[];

const Sidebar = ({
  menuItems,
  selected,
}: {
  selected: string;
  menuItems: ListItems;
}) => {
  return (
    <div className="w-48 hidden md:block shrink-0 pt-8 mr-4">
      <ul className="space-y-6">
        {menuItems.map(({ title, id, path }) => (
          <li key={id}>
            <Link href={path}>
              <a
                className={`text-lg font-semibold ${
                  selected === path ? 'text-skyBlue' : 'text-mtBlue'
                }`}
              >
                {title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
