/*
 * File: new.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 12 May 2022 10:30 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useEffect, useState } from 'react';

import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';

import { formFieldData, schema } from 'constants/staticData/formFields/featuredProductFormField';
import Forms from 'components/atoms/Forms';

import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import Privilege from 'components/atoms/privilege';
import api from 'api';
import Modal from 'components/atoms/Modal';
import Loader from 'components/molecules/Loader';
import { NETWORK_STATUS_CODES } from '../../../../constants';

const NewFeatureProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [initialValue, setInitialValue] = useState({
    productName: '',
    icon: '',
    displayNameEN: '',
    displayNameFR: '',
    descriptionEN: '',
    descriptionFR: '',
    scheduleStartDateTime: '',
    scheduleEndDateTime: '',
    priority: '',
    isActive: false,
  });
  const [productType, setProductType] = useState('');
  const [productDropdown, setProductDropdown] = useState([]);
  const [marketplace, setMarketplace] = useState([]);
  const [products, setProducts] = useState([]);
  const [solutions, setSolutions] = useState([]);

  formFieldData[0].options = productDropdown;

  const permission: RolePermission = usePermission(Permission.FEATURED_PRODUCTS);

  const handleTypeChange = (e: any) => {
    const value = e.target.value;
    setProductType(value);
    if (value === 'PRODUCT_LEVEL_2') {
      setProductDropdown(products);
    } else if (value === 'MARKETPLACE_LEVEL_2') {
      setProductDropdown(marketplace);
    } else if (value === 'SOLUTION') {
      setProductDropdown(solutions);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const icon = await api.image.post({
        file: values.icon,
        data: new Blob(
          [
            JSON.stringify({
              fileName: 'icon',
              type: 'system',
              autoGenerateKey: true,
            }),
          ],
          {
            type: 'application/json',
          },
        ),
      });
      const obj = {
        productId: values.productName,
        type: productType,
        icon: icon,
        displayName: values.displayNameEN,
        displayNameFR: values.displayNameFR,
        shortDescription: values.descriptionEN,
        shortDescriptionFR: values.descriptionFR,
        scheduleStart: values.scheduleStartDateTime,
        scheduleEnd: values.scheduleEndDateTime,
        priority: values.priority,
        isActive: values.isActive,
      };

      if (Date.parse(values.scheduleStartDateTime) < Date.parse(values.scheduleEndDateTime)) {
        await api.featured_products.post(obj);
        setIsOpen(true);
        if (icon === null) {
          setModalContent({
            heading: 'Error!',
            content: 'Something went wrong!.',
          });
        } else {
          setModalContent({
            heading: 'Success!',
            content: 'Successfully created!',
          });
        }
      } else {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Schedule start should be less than Schedule end!.',
        });
      }
    } catch (error) {
      console.log('error', error);
      if (!NETWORK_STATUS_CODES.includes(error.code)) {
        setIsOpen(true);
        setModalContent({
          heading: 'Error!',
          content: 'Something went wrong!.',
        });
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const products = await api.product_search.getProductsCatalogueSubcategory();
      const marketplace = await api.product_search.getMarketPlaceSubcategory();
      const solutions = await api.product_search.getSolutionCatalogue();

      const marketArr = marketplace.marketplaceSubCategories?.map((data) => ({
        value: data.subCategoryId,
        label: data.productSubCategoryTitle.en,
      }));

      const productsArr = products.productSubCategories?.map((data) => ({
        value: data.subCategoryId,
        label: data.productSubCategoryTitle.en,
      }));

      const solutionsArr = solutions.solutions?.map((data) => ({
        value: data.solutionId,
        label: data.solutionTitle.en,
      }));
      setProductDropdown(productsArr);
      setMarketplace(marketArr);
      setProducts(productsArr);
      setSolutions(solutionsArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    setProductType('PRODUCT_LEVEL_2');
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <SEO title='Featured Products' desc='Featured Products Description' />
      <Privilege permission={permission?.create} message='create featured products'>
        {isOpen && (
          <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
            <div className='flex justify-center pt-3'>
              <button className='mt-confirmationBtnYes' onClick={closeModal}>
                Ok
              </button>
            </div>
          </Modal>
        )}
        <div className='max-w-2xl'>
          <h1 className='mb-10 text-lg font-bold text-gray-800'>Featured products</h1>

          {marketplace.length > 0 && products.length > 0 && solutions.length > 0 ? (
            <div className='w-full p-10 bg-white rounded shadow'>
              <div>
                <div className='mb-4 md:flex md:items-baseline'>
                  <div className='md:w-1/3'>
                    <label className='self-stretch my-1 text-sm font-normal tracking-wide'>Type</label>
                  </div>
                  <div onChange={handleTypeChange}>
                    <div className='flex items-center gap-2'>
                      <input type='radio' value='PRODUCT_LEVEL_2' name='productType' className='w-4 h-4' defaultChecked /> Products
                    </div>
                    <div className='flex items-center gap-2'>
                      <input type='radio' value='MARKETPLACE_LEVEL_2' name='productType' className='w-4 h-4' /> Marketplace Products
                    </div>
                    <div className='flex items-center gap-2'>
                      <input type='radio' value='SOLUTION' name='productType' className='w-4 h-4' /> Solutions
                    </div>
                  </div>
                </div>
              </div>
              <Forms formFields={formFieldData} handleSubmit={handleSubmit} initialValue={initialValue} formsSchema={schema} buttonValue='Save' />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </Privilege>
    </>
  );
};

NewFeatureProduct.auth = true;
export default NewFeatureProduct;
NewFeatureProduct.Layout = MainLayout;
NewFeatureProduct.routeSettings = routing.cmsHomeFeaturedProducts;
