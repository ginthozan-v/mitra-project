/*
 * File: [faqId].tsx
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
import { ROUTE_FAQ } from 'constants/routes';
import FAQListItem from 'components/molecules/FAQListItem';
import api from 'api';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const getServerSideProps = async ({ params }) => {
  const category = await api.faq.getCategory(params.faqId, true);
  const faqs = await api.faq.getFAQsByCategory(params.faqId, true);

  return {
    props: { faqs, category: { ...category.content?.title } },
  };
};

const FAQDetails = (props) => {
  const { locale } = useRouter();
  const [faqs] = useState(props.faqs?.content || []);

  return (
    <>
      <SEO title='FAQ Details' desc='FAQDetails Description' />
      <ItemDescription
        title="FAQ Details"
        type="TitleBanner"
        image="/learn.jpg"
      />
      <div className='max-w-7xl mx-auto p-4'>
        <Link href={ROUTE_FAQ}>
          <a className='inline-block text-white rounded-md text-sm py-1.5 px-6 bg-skyBlue'>
            All FAQ categories
          </a>
        </Link>
        <div className='mt-6'>
          <h1 className='content-heading'>{props.category[locale]}</h1>
          <div className='faqs'>
            {faqs.map((faq) => (
              <FAQListItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .faqs:empty:before {
          content: 'There are no frequently asked questions in this category.';
          display: block;
          margin-top: 25px;
        }
      `}</style>
    </>
  );
};

export default FAQDetails;

FAQDetails.Layout = MainLayout;
