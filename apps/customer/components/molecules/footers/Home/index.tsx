/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 24 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import api from 'api';
import { IMG_LOGO } from 'constants/images';
import { ROUTE_ABOUT_US, ROUTE_NEWS, ROUTE_CONTACT } from 'constants/routes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TermsAndConditions from 'components/atoms/TermsAndConditions';
import PrivacyPolicy from 'components/atoms/PrivacyPolicy';
import { GENERIC_CONTENT } from 'api/generic-contents';
import { useRouter } from 'next/router';
import Copyright from 'components/atoms/Copyright';
import { IMAGE_PATH } from '@/constants';

const footerNavItems = [
  { id: 'about', title: 'About Us', route: ROUTE_ABOUT_US },
  { id: 'privacy-policy', title: 'Privacy Policy', route: '' },
  { id: 'news', title: 'Latest News', route: ROUTE_NEWS },
  { id: 'terms-conditions', title: 'Terms & Conditions', route: '' },
  { id: 'contact-us', title: 'Contact Us', route: ROUTE_CONTACT },
];

const FooterHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [genericContent, setGenericContent] = useState({ terms: '', privacyPolicy: '' });
  const { locale } = useRouter();

  const setModal = (name: string) => {
    setModalName(name);
    setShowModal(true);
  };

  useEffect(() => {
    getSocialMediaData();
    api.genericContents.get(GENERIC_CONTENT.TERMS_CONDITIONS).then((res) => {
      setGenericContent({ terms: res?.termsnCondition, privacyPolicy: res?.privacyPolicy });
    });
  }, []);

  const [list, setList] = useState([]);

  const getSocialMediaData = async () => {
    const res = await api.home.getAllSocialMedia();
    const socialMedia = [];
    res?.map((item) => {
      if (item.active) {
        socialMedia.push(item);
      }
    });
    socialMedia.sort((a, b) => a.priority - b.priority);
    setList(socialMedia);
  };

  const clickHandle = (path: string) => {
    if (!path.startsWith('http:') && !path.startsWith('https:')) {
      path = '//' + path;
    }
    document.location.href = path;
  };

  return (
    <footer className='shrink-0 bg-mtBlue text-white mt-12'>
      <div className='max-w-7xl mx-auto p-4 pb-20 sm:pb-4'>
        <div className='block md:flex md:justify-between items-start'>
          <div className='w-full md:w-1/2'>
            <h3 className='text-lg font-semibold'>Mauritius Telecom</h3>
            <ul className='flex flex-wrap mt-3 items-start'>
              {footerNavItems.map(({ id, title, route }) => (
                <li key={id} className='w-1/2 mt-1'>
                  {route !== '' ? (
                    <Link href={route}>
                      <a className=''>{title}</a>
                    </Link>
                  ) : (
                    <button className='' onClick={() => setModal(title)} type='button'>
                      {title}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {showModal && modalName === 'Terms & Conditions' ? (
              <TermsAndConditions
                content={genericContent?.terms?.[locale]}
                show={showModal}
                setVisibility={setShowModal}
              />
            ) : (
              <PrivacyPolicy
                content={genericContent?.privacyPolicy?.[locale]}
                show={showModal}
                setVisibility={setShowModal}
              />
            )}
          </div>

          <div className='flex flex-wrap w-full md:w-1/2 md:block mt-12 md:mt-0'>
            <div className='w-1/2 md:w-full flex md:justify-end'>
              <Link href='/'>
                <a>
                  <img src={IMG_LOGO.src} alt={IMG_LOGO.alt} className='w-16' />
                </a>
              </Link>
            </div>
            <div className='w-1/2 md:w-full flex md:justify-end items-center md:pt-5 space-x-3'>
              {list.map(({ id, logoImage, link }) => (
                <a onClick={() => clickHandle(link)} key={id} className='cursor-pointer'>
                  <img src={`${IMAGE_PATH}/${logoImage}`} className='w-6 h-6' />
                </a>
              ))}
            </div>
            <div className='w-full pt-4 md:text-right'>
              <Copyright />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;
