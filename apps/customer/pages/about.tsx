/* eslint-disable @next/next/no-css-tags */
/*
 * File: about.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 24 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import Img from '@/components/molecules/Img';
import { IMAGE_PATH } from '@/constants';
import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import api from 'api';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';

export async function getServerSideProps({ locale }) {
  const data = await api.aboutUs.getAllAboutus(locale, true);

  return {
    props: {
      data,
    },
  };
}

const About = ({ data }) => {
  useEffect(() => {
    api.aboutUs.getAllAboutus('en').then((res) => console.log(res));
  }, []);
  const clickHandle = (path: string) => {
    if (!path.startsWith('http:') && !path.startsWith('https:')) {
      path = '//' + path;
    }
    document.location.href = path;
  };
  return (
    <>
      <Head>
        <link href='/quill.snow.css' rel='stylesheet' />
      </Head>
      <SEO title='About' desc='About Description' />

      <div className='w-full'>
        <Image
          src='/banner-mt.jpg'
          alt='aboutus hero'
          width={'1000px'}
          height={'400px'}
          layout={'responsive'}
        />
      </div>

      {/* <div className='w-full absolute'>
        <Image src='/banner-mt.jpg' alt='aboutus hero' layout='fill' objectFit='contain' />
      </div> */}
      <div className='max-w-7xl mx-auto p-4'>
        <h1 className='text-3xl font-semibold'>{data?.section_title}</h1>
        <div className='flex flex-wrap mt-6'>
          {['mission', 'vision', 'motto']?.map((i) => (
            <div className='w-full md:w-1/3 p-2' key={i}>
              <div
                className={`bg-mtBlue text-white h-full text-center p-5 ${
                  i === 'mission' ? 'rounded-l-lg' : ''
                } ${i === 'vision' ? 'rounded-none' : ''} ${i === 'motto' ? 'rounded-r-lg' : ''}`}
              >
                <div className='flex justify-center'>
                  <Img
                    src={`${IMAGE_PATH}/${data[i]?.img}`}
                    alt='item-img'
                    width={'112px'}
                    height={'96px'}
                    className='w-28 h-24'
                  />
                </div>
                <h2 className='text-2xl font-semibold mt-3'>{data[i]?.title}</h2>
                <p className='mt-6'>{data[i]?.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='bg-white mt-12'>
          <h1 className='text-3xl font-semibold'>{data?.profileSectionTitle}</h1>

          <div className='p-3 mt-5 ql-editor'>
            {ReactHtmlParser(data?.profileSectionDescription)}
          </div>
        </div>

        {data.redirection_link.length !== 1 ? (
          <div className='flex flex-row justify-center mt-6'>
            <a
              onClick={() => clickHandle(data.redirection_link)}
              className='text-mtBlue font-semibold text-xl cursor-pointer'
            >
              {data?.redirectionTitle}
            </a>
            <ChevronRightIcon className={`w-7 h-7 text-mtBlue pt-1`} aria-hidden='true' />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default About;

About.Layout = MainLayout;
