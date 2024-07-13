/*
 * File: all.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 3 May 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import Link from 'next/link';
import { ROUTE_FAQ_BASE } from 'constants/routes';
import api from 'api';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps = async () => {
  const categories = await api.faq.getCategories(true);
  return {
    props: { categories },
  };
};

const FAQHome = (props) => {
  const { locale } = useRouter();
  const [categories] = useState(props.categories?.content || []);

  return (
    <>
      <SEO title='FAQ' desc='FAQHome Description' />
      <ItemDescription title="FAQHome" type="TitleBanner" image="/learn.jpg" />
      <div className='content-wrapper'>
        <div className='flex flex-wrap mt-4'>
          {categories.map((category) => (
            <div className='w-full 2xs:w-1/2 md:w-1/3 lg:w-1/4 p-2' key={category.id}>
              <Link href={`${ROUTE_FAQ_BASE}${category.id}`}>
                <a className='bg-white shadow w-full h-20 p-4 grid place-items-center rounded-md font-semibold'>
                  <span className='line-clamp-2 overflow-hidden leading-8' style={{wordBreak: 'break-word'}}>
                    {category.title[locale]}
                  </span>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQHome;

FAQHome.Layout = MainLayout;
