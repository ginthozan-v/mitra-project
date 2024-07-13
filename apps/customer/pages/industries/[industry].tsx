/*
 * File: industires.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 3 May 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import api from 'api';
import Solution from 'components/organisms/Industries/Solution';
import useStore from '@/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export async function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}

const Industry = ({ params }) => {
  const industries = useStore((store) => store.industries);
  const [industry, setIndustry] = useState<any>();
  const [seo, setSEO] = useState({
    title: '',
    keywords: '',
    desc: '',
  });

  useEffect(() => {
    setIndustry(null);
  }, [params.industry]);

  useEffect(() => {
    setTimeout(() => {
      setIndustry(industries.find((i) => i.solutionKey === params.industry));
    }, 0);
  }, [industries, params.industry]);

  useEffect(() => {
    setSEO({
      title: industry?.solutionTitle || '',
      keywords: industry?.keywords || '',
      desc: industry?.description || '',
    });
  }, [industry]);

  return (
    <>
      <SEO title={seo.title} keywords={seo.keywords} desc={seo.desc} />
      {industry && <Solution industries={industries} industry={industry} />}
    </>
  );
};

export default Industry;

Industry.Layout = MainLayout;
