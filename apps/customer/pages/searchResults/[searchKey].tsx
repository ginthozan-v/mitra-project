/* eslint-disable no-unused-vars */
/*
 * File: [searchKey].tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Wednesday, 25 May 2022 09:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import ItemDescription from 'components/molecules/headers/ItemDescription';
import SearchResultsItem from 'components/molecules/SearchResultsItem';
import api from 'api';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import useStore from 'store';
import SearchBar from 'components/molecules/SearchBar';
import { SearchData } from '@mtcloud/utils/validation/types';
import { ROUTE_SEARCH } from 'constants/routes';
import Pagination from 'components/molecules/Pagination';

export async function getServerSideProps({ params }) {
  const searchKey = params.searchKey;

  return {
    props: {
      searchKey,
    },
  };
}

const SearchResults = ({ searchKey }) => {
  const [loading, setStatus] = useState(false);
  const [isDisable, setDisable] = useState(false);
  const [total, setTotal] = useState();
  const [resultCount, setResultCount] = useState(10);

  const [page, setPage] = useState(0);
  const { locale, asPath, query } = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const { setSearch } = useStore((state) => ({
    search: state.search,
    setSearch: state.setSearch,
  }));
  const router = useRouter();
  const formikRef = useRef(null);
  // const [searchKey, setSearchKey] = useState(searchKey);

  useEffect(() => {
    setStatus(true);
    setDisable(false);
    const getData = async (limit: number) => {
      try {
        const res = await api.search.search(searchKey.toLocaleString(), locale, page, limit);
        let data;
        if (res[0].total !== 0) {
          data = res[0].results.map(({ id, title, category, description, solutionIndustry, productType, type, productId }) => ({
            id,
            title,
            tags: [{ name: productType }, { name: category }],
            description,
            solutionIndustry,
            type,
            productId,
          }));
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }

        setStatus(false);
        setTotal(res[0].total);
      } catch (error) {
        setSearchResults([]);
        setStatus(false);
        toast.error('Something went wrong', { duration: 8000 });
      }
    };
    getData(resultCount);
  }, [locale, page, asPath, resultCount, searchKey]);

  useEffect(() => {
    setSearch(true);
  }, [setSearch]);

  const updateLimit = (newState: number) => {
    setResultCount(newState);
    setPage(0);
    setDisable(false);
  };

  const nextPage = (val: number, total: number) => {
    const x = total / (val + 1);

    if (searchResults.length !== resultCount || x === resultCount) {
      setDisable(true);
      setPage(val);
    } else {
      setDisable(false);
      setPage(val + 1);
    }
  };

  const prevPage = (val: number) => {
    setDisable(false);
    if (page !== 0) {
      setPage(val - 1);
    } else {
      setPage(val);
    }
  };

  const searchData = (data: SearchData) => {
    router.push(`${ROUTE_SEARCH}${data.searchKey}`);
    setPage(0);
  };

  return (
    <>
      <SEO title='Search' desc='Search Results Description' />
      <ItemDescription title='Search' type='TitleBannerSlim' image='/bgsample-mt.jpg' />
      <div className='flex justify-center pt-6'>
        <SearchBar searchData={searchData} width='w-96' name='searchKey' formikRef={formikRef} />
      </div>

      <div className='max-w-7xl mx-auto p-4'>
        <div className='flex justify-end text-[#535353] font-semibold text-base'>{total} results found</div>

        <div>
          {loading ? (
            <div className='grid place-items-center fixed inset-y-0 inset-x-0 overflow-y-auto bg-slate-100/[0.3] z-[1000]'>
              <Oval
                color='#00aeef'
                secondaryColor='#fff'
                width={70}
                strokeWidth={3}
                wrapperStyle={{ filter: 'drop-shadow(3px 3px 6px rgb(0 0 0 / 0.8))' }}
              />
            </div>
          ) : (
            <div className='max-w-5xl mx-auto mt-6'>
              {searchResults.length === 0 ? (
                <div className='text-center text-3xl font-medium py-20'>No results found.</div>
              ) : (
                <div>
                  {searchResults.map(({ id, tags, title, description, solutionIndustry, productId, type }) => (
                    <SearchResultsItem
                      title={title}
                      description={description}
                      tags={tags}
                      key={productId}
                      id={id}
                      productId={productId}
                      type={type}
                      solutionIndustry={solutionIndustry}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <Pagination
          updatePageLimit={updateLimit}
          limit={resultCount}
          count={total}
          page={page}
          isDisable={isDisable}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </>
  );
};

export default SearchResults;

SearchResults.Layout = MainLayout;
