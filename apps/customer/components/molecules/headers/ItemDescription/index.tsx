import { IMAGE_PATH } from '@/constants';

/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 31 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
const bannerType = {
  HeroBanner: 'md:h-[500px] h-[350px]',
  TitleBanner: 'md:h-[270px] h-[200px]',
  TitleBannerSlim: 'md:h-[150px] h-[110px]',
};

const ItemDescription = ({
  title,
  description,
  children,
  type = 'TitleBannerSlim',
  image = '/bgsample-mt.jpg',
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  type?: string;
  image?: string;
}) => {
  const LineClamp = {
    HeroBanner: {
      title: 'line-clamp-3',
      content: 'line-clamp-4',
    },
    TitleBanner: {
      title: 'line-clamp-2',
      content: 'line-clamp-3',
    },
    TitleBannerSlim: {
      title: 'line-clamp-1',
      content: 'line-clamp-1',
    },
  };

  return (
    <>
      <div className={`bg-[#ccd8de] ${bannerType[type]}`}>
        <div className={`max-w-full relative flex h-full md:p-0 overflow-hidden`}>
          <div
            className='w-full h-full absolute bg-cover bg-center'
            style={{ backgroundImage: `url(${image})` }}
            // style={{
            //   backgroundImage: `url('${IMAGE_PATH}/${image}')`,
            // }}
          />
          <div
            className={`content-wrapper py-0 w-full mx-auto rounded-t-lg md:rounded-none h-full flex flex-col absolute md:relative justify-start inset-x-0 md:items-start`}
          >
            <div className='w-full md:w-8/12 h-full py-5 flex text-section relative'>
              <div className='bg ml-0 sm:-ml-18 md:-ml-24 w-full sm:w-3/4 md:w-full' />
              <div className='my-auto flex flex-col px-2 -mx-2 text-white text-left relative z-10'>
                <h1
                  className={`${LineClamp[type].title} px-2 -mx-2 font-bold text-xl md:text-3xl`}
                  title={title}
                >
                  {title}
                </h1>
                {description !== undefined ? (
                  <p
                    className={`${LineClamp[type].content} px-2 -mx-2 text-md md:text-base font-medium pt-3 text-justify`}
                  >
                    {description}
                  </p>
                ) : null}
                {children !== undefined ? <div className='mt-6'>{children}</div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .text-section {
          text-shadow: 0 0 10px #000;
        }
        .text-section .bg {
          position: absolute;
          top: 0;
          bottom: 0;
          background: rgb(0,0,0);
          background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%);
        }
      `}</style>
    </>
  );
};

export default ItemDescription;
