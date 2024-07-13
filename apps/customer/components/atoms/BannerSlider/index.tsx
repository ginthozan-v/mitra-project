/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 30 May 2022 12:13 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import Slider from 'react-slick';
import { IMAGE_PATH } from '@/constants';
import Img from '@/components/molecules/Img';

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{ marginRight: '50px', bottom: '10px', marginTop: 'auto' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        zIndex: 100,
        marginLeft: 'auto',
        right: 0,
        marginRight: '50px',
        bottom: '10px',
        marginTop: 'auto',
      }}
      onClick={onClick}
    />
  );
}

const BannerSlider = ({ images, className }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const clickHandle = (path: string) => {
    if (!path.startsWith('http:') && !path.startsWith('https:')) {
      path = '//' + path;
    }
    document.location.href = path;
  };

  return (
    <Slider {...settings}>
      {images?.slice(0 - 6).map((img) => (
        <div key={img.id} className={className}>
          {img.redirectionLink !== undefined ? (
            <>
              <a
                onClick={() => clickHandle(img.redirectionLink)}
                className='cursor-pointer h-full hidden lg:block'
              >
                <Img
                  className='hidden lg:block'
                  priority={img.priority}
                  src={`${IMAGE_PATH}/${img.images[0].banner}`}
                  alt={img.title}
                  layout='fill'
                  objectFit='cover'
                  quality={100}
                />
              </a>
              <a
                onClick={() => clickHandle(img.redirectionLink)}
                className='cursor-pointer h-full hidden md:block lg:hidden'
              >
                <Img
                  className='hidden md:block lg:hidden'
                  priority={img.priority}
                  src={`${IMAGE_PATH}/${img.images[1].banner}`}
                  alt={img.title}
                  layout='fill'
                  objectFit='cover'
                  // quality={100}
                />
              </a>
              <a
                onClick={() => clickHandle(img.redirectionLink)}
                className='cursor-pointer h-full md:hidden'
              >
                <Img
                  className='md:hidden'
                  priority={img.priority}
                  src={`${IMAGE_PATH}/${img.images[2].banner}`}
                  alt={img.title}
                  layout='fill'
                  objectFit='cover'
                  quality={100}
                />
              </a>
            </>
          ) : (
            <Img
              priority={img.priority}
              src={`${IMAGE_PATH}/${img.banner}`}
              alt={img.title}
              layout='fill'
              objectFit='cover'
              quality={100}
            />
          )}
        </div>
      ))}
    </Slider>
  );
};

export default BannerSlider;
