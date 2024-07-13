/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 7 April 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import NewTicket from 'components/molecules/support/NewTicket';
import api from 'api';
import { useEffect, useState } from 'react';
import AuthGuard from 'components/utils/AuthGuard';

const New = () => {
  const [categories, setCategories] = useState([]);

  const fetchSupportTicketCategories = async () => {
    try {
      const res: { categories: [any]; subcategories: [any] } =
        await api.support.getTicketCategories();

      const categories = [];

      res.categories.map((cat, i) => {
        categories.push({
          label: cat.name,
          value: cat.name,
          subCategories: [],
        });
        cat.subCategories.map((sub) => {
          categories[i].subCategories.push({ label: sub, value: sub });
        });
      });
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSupportTicketCategories();
  }, []);

  return (
    <>
      <SEO title='New' desc='New Description' />
      <ItemDescription title='Support' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <div className='p-4 mx-auto max-w-7xl'>
        <NewTicket categories={categories} />
      </div>
    </>
  );
};

New.Layout = MainLayout;

export default AuthGuard(New);
