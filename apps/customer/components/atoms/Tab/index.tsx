/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 8 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useRouter } from 'next/router';
type TabItem = {
  id: string;
  title: string;
  link: string;
};

const replaceParams = (link: string, query: any) => {
  let newLink = link;
  if (Object.entries(query)) {
    Object.entries(query).forEach(([key, val]) => {
      newLink = newLink.replace(key, val as string);
    });
  }

  return newLink;
};

const Tab = ({
  item: { title, link },
  isSelected,
}: {
  item: TabItem;
  isSelected: boolean;
}) => {
  const router = useRouter();

  const handleClick = () => {
    const newLink = replaceParams(link, router.query);
    router.push(newLink);
  };
  return (
    <button
      className={`bg-white shadow  font-semibold py-1.5 px-4 rounded-t-md border-b-2 ${
        isSelected
          ? 'text-mtBlue border-b-skyBlue'
          : 'text-[#BFBFBF] border-b-[#BFBFBF]'
      }`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Tab;
