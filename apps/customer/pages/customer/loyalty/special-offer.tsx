/*
 * File: special-offer.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 24 May 2022 03:12 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import MainLayout from 'components/layouts/MainLayout';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import Sidebar from 'components/molecules/Sidebar';
import SEO from 'components/utils/SEO';
import menuItems from 'constants/loyalty/menuItems';
import MobileProductSelect from 'components/molecules/MobileSelect';
import { ROUTE_LOYALTY_SPECIAL_OFFER } from 'constants/routes';
import SpecialOffersCard from 'components/organisms/Loyalty/SpecialOffersCard';
import EarnPointCard from 'components/organisms/Loyalty/EarnPointsCard';
import Modal from 'components/atoms/Modal';
import PromoDetail from 'components/molecules/PromoDetail';
import { useState } from 'react';

const SpecialOffer = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const onModelOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <SEO title="Loyalty" desc="Loyalty Description" />
      <ItemDescription
        title="Loyalty"
        type="TitleBannerSlim"
        image="/bgsample-mt.jpg"
      />
      <MobileProductSelect list={menuItems} select={menuItems[1]} />
      <div className="max-w-7xl mx-auto p-4 flex">
        <Sidebar selected={ROUTE_LOYALTY_SPECIAL_OFFER} menuItems={menuItems} />
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <PromoDetail />
        </Modal>
        <div className="grow overflow-hidden p-1 py-4">
          <SpecialOffersCard
            image="/offer1.png"
            promo="MT2022ECS"
            valid="22.05.2022"
            percentage="10%"
            onBtnClick={onModelOpen}
          />
          <SpecialOffersCard
            image="/offer2.png"
            promo="MT2022ECS"
            valid="22.05.2022"
            percentage="10%"
            flip
            onBtnClick={onModelOpen}
          />
          <EarnPointCard />
        </div>
      </div>
    </>
  );
};

export default SpecialOffer;
SpecialOffer.Layout = MainLayout;
