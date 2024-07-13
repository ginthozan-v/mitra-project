/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 30 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { ChevronDownIcon, ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import { IMG_LOGO } from 'constants/images';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import useStore from 'store';
import { isLoggedIn } from 'utils/auth';
import LearnMenu from '../LearnMenu';
import ExpandedMenu from './ExpandMenu';
import { IMAGE_PATH } from '@/constants';
import api from '@/api';

const MegaMenu = () => {
  const { locale, pathname, query } = useRouter();
  const [isMount, setMount] = useState(false);

  const [authenticated] = useState(isLoggedIn());

  const { logo, primaryMenu, setIndustries } = useStore((state) => ({
    logo: state.logo,
    primaryMenu: state.primaryMenu,
    setIndustries: state.setIndustries,
  }));

  const loadIndustries = async () => {
    const res = await api.industries.getIndustries('solutionSubList');

    const allKeywords = [];
    const industries = res.map(
      ({
        keywords,
        solutionId,
        solutionIndustry,
        solutionBanner,
        solutionTitle,
        solutionDescription,
        solutionImage,
        solutionImageDescription,
        solutionAdditionalSubTitle,
        solutionAdditionalLinkName,
        solutionAdditionalInfoLink,
        sortOrder,
        solutionSubList,
      }) => {
        keywords && allKeywords.push(keywords);
        return {
          keywords,
          solutionId,
          solutionIndustry,
          solutionKey: solutionIndustry['en'].toLowerCase().trim().replaceAll(' ', '-'),
          solutionBanner,
          solutionTitle,
          solutionDescription,
          solutionImage,
          solutionImageDescription,
          solutionAdditionalSubTitle,
          solutionAdditionalLinkName,
          solutionAdditionalInfoLink,
          sortOrder,
          solutionSubList: solutionSubList.map(({ id, solutionSubTitle, solutionSubIcon, solutionSubDescription }) => ({
            id,
            solutionSubIcon,
            solutionSubTitle,
            solutionSubDescription,
          })),
        };
      },
    );

    industries.sort((a, b) => a.sortOrder - b.sortOrder);

    setIndustries(industries);
  };

  useEffect(() => {
    loadIndustries();
  }, []);

  useEffect(() => {
    setMount(true);
  }, [locale]);

  return (
    isMount && (
      <div className='w-full bg-white hidden sm:block'>
        <div className='max-w-7xl w-full mx-auto px-6 text-mtBlue '>
          <div className='flex items-center h-16'>
            <Link href='/'>
              <a className='md:hidden'>
                {logo?.smallLogo?.length > 1 && <img src={`${IMAGE_PATH}/${logo?.smallLogo}`} alt={IMG_LOGO.alt} height={'48px'} width={'48px'} />}
              </a>
            </Link>
            <Link href='/'>
              <a className='hidden md:block lg:hidden'>
                {logo?.mediumLogo?.length > 1 && <img src={`${IMAGE_PATH}/${logo?.mediumLogo}`} alt={IMG_LOGO.alt} height={'48px'} width={'48px'} />}
              </a>
            </Link>
            <Link href='/'>
              <a className='hidden lg:block'>
                {logo?.largeLogo?.length > 1 && <img src={`${IMAGE_PATH}/${logo?.largeLogo}`} alt={IMG_LOGO.alt} height={'48px'} width={'48px'} />}
              </a>
            </Link>
            <div className='grow' />

            <ul className='flex items-center space-x-6'>
              {primaryMenu.map(({ id, title, titleFE, expandable, URL, isExternal, requireAuth }) => (
                <Fragment key={id}>
                  {(!requireAuth || (requireAuth && authenticated)) && (
                    <li className='hoverable group' key={id}>
                      {isExternal ? (
                        <div>
                          {expandable ? (
                            <div className='py-2'>
                              <LearnMenu title={title[locale]} />
                            </div>
                          ) : (
                            <a
                              href={URL}
                              className={`py-2 flex items-center font-semibold relative hover:text-[#00AEEF] after:relative after:top-[-1px] ${
                                pathname === URL ? 'text-skyBlue' : 'text-mtBlue'
                              }`}
                            >
                              <span>{title[locale]}</span>
                            </a>
                          )}
                        </div>
                      ) : (
                        <Link href={URL}>
                          <a
                            className={`py-2 flex items-center font-semibold relative hover:text-[#00AEEF] after:relative after:top-[-1px] ${
                              pathname.split('/')[1] === URL.split('/')[1] ? 'text-skyBlue' : 'text-mtBlue'
                            }`}
                          >
                            <span>{title[locale]}</span>
                            {expandable && (
                              <>
                                <ChevronRightIcon className='group-hover:hidden w-5 h-5 ml-1' />
                                <ChevronDownIcon className='hidden group-hover:block w-5 h-5 ml-1' />
                              </>
                            )}
                          </a>
                        </Link>
                      )}

                      {titleFE === 'Products' && <ExpandedMenu />}
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default MegaMenu;
