/*
 * File: promo.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 27 May 2022 11:36 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
*/

import { useState } from 'react';
import HomeLayout from 'components/layouts/HomeLayout';
import SpecialOffersCard from 'components/organisms/Loyalty/SpecialOffersCard';
import SEO from "components/utils/SEO"
import Modal from 'components/atoms/Modal';
import PromoDetail from 'components/molecules/PromoDetail';

const Promo = () => {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false);
    }

    const onModelOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <SEO title="MT Cloud Promo" desc="Site Description" />
            <div
                className="bg-cover bg-center"
                style={{ backgroundImage: 'url("/bgsample.jpg")', height: '500px' }}
            />

            <Modal isOpen={isOpen} closeModal={closeModal}>
                <PromoDetail />
            </Modal>

            <div className='max-w-7xl w-full mx-auto px-4 mt-16'>
                <SpecialOffersCard image="/offer1.png" promo="MT2022ECS" valid="22.05.2022" percentage="10%" onBtnClick={onModelOpen} />
                <SpecialOffersCard image="/offer2.png" promo="MT2022ECS" valid="22.05.2022" percentage="10%" flip={true} onBtnClick={onModelOpen} />
                <SpecialOffersCard image="/offer3.png" promo="MT2022ECS" valid="22.05.2022" percentage="Rs.1000" onBtnClick={onModelOpen} />
                <SpecialOffersCard image="/offer4.png" promo="MT2022ECS" valid="22.05.2022" percentage="50%" flip={true} onBtnClick={onModelOpen} />
            </div>
        </>
    )
}

export default Promo
Promo.Layout = HomeLayout;