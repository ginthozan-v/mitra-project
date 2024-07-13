/*
 * File: priceCalculator.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 11 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import MainLayout from 'components/layouts/MainLayout';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import TabSet from 'components/molecules/TabSet';
import SEO from 'components/utils/SEO';
import tabData from 'constants/marketplace/tabs';
import React from 'react';

const PriceCalculator = () => {
  return (
    <>
      <SEO title="Price-Calculator" desc="Price-Calculator Description" />
      <ItemDescription
        title="Price-Calculator"
        type="TitleBanner"
        image="/marketplace.jpg"
      />
      <div className="max-w-7xl mx-auto p-4">
        <TabSet tabData={tabData} selectedTab={2} />
        Price Calculator
      </div>
    </>
  );
};

export default PriceCalculator;

PriceCalculator.Layout = MainLayout;
