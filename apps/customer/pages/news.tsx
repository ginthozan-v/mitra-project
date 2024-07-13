/*
 * File: news.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 24 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import api from 'api';
import MainLayout from 'components/layouts/MainLayout';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import NewsListItem from 'components/molecules/NewsListItem';
import SEO from 'components/utils/SEO';

export async function getServerSideProps({ locale }) {
  const res = await api.latestNews.getLatestNews(locale, true);

  const data = [];
  res.map((i) => {
    if (i.active) {
      data.push(i);
    }
  });

  return {
    props: {
      data,
    },
  };
}

const News = ({ data }) => {
  const val = data.map((obj) => ({
    ...obj,
    updatedOn: new Date(obj.updatedOn),
  }));
  val.sort((objA, objB) => objB.updatedOn.getTime() - objA.updatedOn.getTime());
  return (
    <>
      <SEO title='News' desc='News Description' />
      <ItemDescription title='Latest News' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <div className='max-w-7xl mx-auto p-4'>
        {val.map((i, index) => (
          <NewsListItem key={i.id} index={index} data={i} />
        ))}
      </div>
    </>
  );
};

export default News;

News.Layout = MainLayout;
