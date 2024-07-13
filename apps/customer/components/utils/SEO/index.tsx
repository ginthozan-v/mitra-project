/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 15 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Head from 'next/head';

type SEOProps = {
  title: string;
  keywords?: string;
  desc: string;
};

const SEO = ({ title, keywords, desc }: SEOProps) => {
  return (
    <Head>
      <title>MTC - {title}</title>
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="description" content={desc} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
