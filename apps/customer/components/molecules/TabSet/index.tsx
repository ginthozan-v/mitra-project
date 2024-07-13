/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 8 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Tab from 'components/atoms/Tab';

type TabData = {
  id: string;
  title: string;
  link: string;
}[];

const TabSet = ({
  tabData,
  selectedTab,
}: {
  tabData: TabData;
  selectedTab: number;
}) => {
  return (
    <div className="flex justify-center space-x-2 mb-5">
      {tabData.map((item, index) => (
        <Tab key={item.id} item={item} isSelected={index === selectedTab} />
      ))}
    </div>
  );
};

export default TabSet;
