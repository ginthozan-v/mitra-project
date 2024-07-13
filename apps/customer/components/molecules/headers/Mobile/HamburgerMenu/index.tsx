/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 27 April 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { ChevronDownIcon, ChevronRightIcon, CrossIcon } from '@mtcloud/ui/atoms/icons';
import { ROUTE_PRODUCTS, ROUTE_PRODUCT_OVERVIEW, ROUTE_SUPPORT } from 'constants/routes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import menuLinks from 'constants/menu/menuLinks';
import { useRouter } from 'next/router';
import { createRoute } from 'utils/routes';
import { isLoggedIn } from 'utils/auth';
import useStore from 'store';
import { CONSOLE_LINK } from '@/constants';

const stylesData = [
  { id: 0, style: 'bg-[#F2F8FB] w-full px-3' },
  { id: 1, style: 'bg-[#D4E6F2] w-full pr-3 pl-6' },
  { id: 2, style: 'bg-[#C5DEED] w-full pr-3 pl-9' },
];
type hamburgerTypes = {
  isNavOpen?: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
};
const HamburgerMenu = ({ setIsNavOpen }: hamburgerTypes) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());
  const [megaMenuLink, setMegaMenuLink] = useState([]);
  const { locale } = useRouter();
  const { menuData } = useStore((state) => ({
    menuData: state.primaryMenu,
  }));
  const { expand } = useStore((state) => ({
    expand: state.expand,
    setExpandMenu: state.setExpandMenu,
  }));

  const closeMenu = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
    const getData = async () => {
      const menuItemsList = menuData.map((menuItem, menuIndex) => {
        const itemList = menuLinks.find((item, index) => index === menuIndex);
        return { ...itemList, ...menuItem };
      });

      menuItemsList.push(CONSOLE_LINK);

      const data = expand.map(({ category, categoryId, subCategory }) => ({
        title: category,
        id: categoryId.toString(),
        level: 1,
        path:
          subCategory.length === 0
            ? {
                pathname: ROUTE_PRODUCTS,
                query: { category: categoryId },
              }
            : '',
        expandable: subCategory.length === 0 ? false : true,
        children: subCategory.map(({ subCategoryId, productSubCategoryTitle }) => ({
          id: subCategoryId,
          title: productSubCategoryTitle,
          level: 2,
          path: createRoute({
            basePath: ROUTE_PRODUCT_OVERVIEW,
            params: [{ key: 'productId', element: subCategoryId }],
          }),
          expandable: false,
        })),
      }));

      const menuItems = [{ id: 'all', level: 1, title: 'All Products', path: ROUTE_PRODUCTS }, ...data];
      const hamburgerMenuLink = [
        {
          id: menuItemsList[0]?.id,
          level: 0,
          title: menuItemsList[0]?.title,
          expandable: menuItemsList[0]?.expandable,
          children: menuItems,
          path: '',
          requireAuth: false,
        },
        ...menuItemsList.slice(1, 6).map(({ id, level, title, expandable, children, URL, requireAuth }) => ({
          id,
          level,
          title,
          expandable,
          path: URL,
          children,
          requireAuth,
        })),
      ];

      if (isAuthenticated) {
        hamburgerMenuLink.push({
          id: 'supportMobile',
          level: 0,
          title: 'Support',
          expandable: false,
          path: ROUTE_SUPPORT,
          children: null,
          requireAuth: true,
        });
      }

      setMegaMenuLink(hamburgerMenuLink);
    };
    getData();
  }, [expand, isAuthenticated, locale, menuData]);

  return (
    <div className='absolute w-full top-0 left-0 bg-transparent z-10 flex flex-col justify-evenly items-center'>
      <button className='absolute top-0 right-0 pr-5 py-4' onClick={closeMenu}>
        <CrossIcon className='w-8 h-8 text-[#00AEEF]' />
      </button>
      <div className='mt-16 bg-white w-full shadow px-3 pb-3'>
        {megaMenuLink.map((i) => (
          <div key={i.id}>
            {!i.requireAuth || (i.requireAuth && isAuthenticated) ? <Tree key={i.id} node={i} closeMenu={closeMenu} stylesData={stylesData} /> : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

const Tree = ({ node, closeMenu, stylesData }) => {
  const [expand, setExpand] = useState(false);
  const router = useRouter();

  const updateExpand = (link: string) => {
    setExpand(!expand);
    if (link !== '') {
      router.push(link);
      closeMenu();
    }
  };

  const getTitle = (data) => {
    return typeof data === 'string' ? data : data[router.locale];
  };

  return (
    <div className='flex flex-col items-start text-[#003E5C]'>
      <a
        className={`flex mb-0.5 py-3 ${stylesData[node.level].style} `}
        onClick={() => updateExpand(node.path)}
      >
        {getTitle(node.title)}
        {node.expandable ? (
          expand ? (
            <ChevronDownIcon className='absolute w-5 h-5 text-[#00AEEF] mt-1 right-6' />
          ) : (
            <ChevronRightIcon className='absolute w-5 h-5 text-[#003E5C] mt-1 right-6' />
          )
        ) : null}
      </a>

      {node.children && expand ? (
        <div className='w-full'>
          {node.children.map((i) => (
            <Tree key={i.id} node={i} closeMenu={closeMenu} stylesData={stylesData} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default HamburgerMenu;
