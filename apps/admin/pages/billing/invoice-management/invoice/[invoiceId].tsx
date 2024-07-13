/*
 * File: [invoiceId].tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 21 Sep 2022 12:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import { useEffect, useState } from 'react';

import SEO from 'components/utils/SEO';
import MainLayout from 'components/layouts/MainLayout';
import routing from 'constants/routingConfig';
import Modal from 'components/atoms/Modal';
import Privilege from 'components/atoms/privilege';
import { Permission, RolePermission } from 'models';
import usePermission from 'hooks/usePermission';
import { useRouter } from 'next/router';
import api from 'api';
import Enterprise from 'components/pages/billing/invoice/enterprice';
import Individual from 'components/pages/billing/invoice/individual';

export const billingTableData = [
  {
    id: '1',
    date: '07.02.2022',
    invoiceId: '121212',
    email: 'john@gmail.com',
    name: 'Smith',
    userType: 'Individual',
    brn: '121212',
    billingMode: 'prepaid',
    currency: 'USD',
    total: '$100.00',
    status: 'pending',
  },
  {
    id: '2',
    date: '07.02.2022',
    invoiceId: '121212',
    email: 'john@gmail.com',
    name: 'Smith',
    userType: 'Individual',
    brn: '121212',
    billingMode: 'prepaid',
    currency: 'USD',
    total: '$100.00',
    status: 'pending',
  },
  {
    id: '3',
    date: '07.02.2022',
    invoiceId: '121212',
    email: 'john@gmail.com',
    name: 'Smith',
    userType: 'Individual',
    brn: '121212',
    billingMode: 'prepaid',
    currency: 'USD',
    total: '$100.00',
    status: 'pending',
  },
];

const ViewInvoice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isOpenRefund, setIsOpenRefund] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [accountCode, setAccountCode] = useState('');
  const [amount, setAmount] = useState('');
  const [accountError, setAccountError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const permission: RolePermission = usePermission(Permission.INVOICE_MANAGEMENT);
  const router = useRouter();
  const { invoiceId }: any = router.query;

  const fetchInvoice = async (id) => {
    try {
      const invoice = await api.invoice_management.getOne(id);
      setInvoice(invoice);
    } catch (error) {
      console.error(`🚀 ${error.name} `, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const downloadReceipt = async () => {
    try {
      const res = await api.invoice_management.downloadReceipt(invoiceId);

      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      const fileName = `invoice-${invoiceId}.pdf`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(`🚀 ${error.name} `, error.message);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: 'Something went wrong!.',
      });
    }
  };

  const handleRefund = async () => {
    try {
      if (!amount) setAmountError(true);
      if (!accountCode) setAccountError(true);
      if (amount && accountCode) {
        const obj = {
          accountCode: accountCode,
          amount: amount,
        };
        await api.invoice_management.refund(invoiceId, obj);
        setIsOpenRefund(false);
        setIsOpen(true);
        setModalContent({
          heading: 'Success!',
          content: 'Refunded successfully.',
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      setIsOpenRefund(false);
      setIsOpen(true);
      setModalContent({
        heading: 'Error!',
        content: error.response.data.message ?? 'Something went wrong!.',
      });
    }
  };

  const renderBill = (type: string) => {
    if (type === 'ENTERPRISE') {
      return <Enterprise data={invoice?.userReceipt} download={downloadReceipt} refund={() => setIsOpenRefund(true)} />;
    } else {
      return <Individual data={invoice?.userReceipt} download={downloadReceipt} refund={() => setIsOpenRefund(true)} />;
    }
  };

  const handleChange = (evt: any) => {
    const { value } = evt.target;

    // check if value includes a decimal point
    if (value.match(/\./g)) {
      const [, decimal] = value.split('.');

      // restrict value to only 2 decimal places
      if (decimal?.length > 2) {
        // do nothing
        return;
      }
    }

    // otherwise, update value in state
    setAmount(value);
  };

  function preventNonNumericalInput(e: any) {
    const regex = new RegExp(/(^\d*\.?$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);
    if (!e.key.match(regex)) e.preventDefault();
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeRefundModal = () => {
    setIsOpenRefund(false);
  };

  useEffect(() => {
    if (invoiceId) {
      fetchInvoice(invoiceId);
    }
  }, [invoiceId]);

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal} heading={modalContent?.heading} content={modalContent?.content}>
          <div className='flex justify-center pt-3'>
            <button className='mt-confirmationBtnYes' onClick={closeModal}>
              Ok
            </button>
          </div>
        </Modal>
      )}
      {isOpenRefund && (
        <Modal isOpen={isOpenRefund} closeModal={closeRefundModal} heading='Refund Invoice' content={`Receipt ID ${invoiceId}`}>
          <div className='mt-5'>
            <div className='mt-1 mb-2'>
              <input
                type='text'
                placeholder='Account code'
                className={`form-control appearance-none static w-full h-10 bg-[#f2f8fb] border border-solid box-border rounded self-stretch p-3  font-normal text-sm items-center text-[#535353] leading-tight focus:outline-none focus:bg-white`}
                value={accountCode}
                onChange={(e) => setAccountCode(e.target.value)}
                onKeyPress={() => setAccountError(false)}
              />
              {accountError && <small className='m-0 text-red-500'>This field cannot be empty.</small>}
            </div>
            <div className='mt-1 mb-2'>
              <input
                type='text'
                placeholder='Amount (MUR)'
                className={`form-control appearance-none static w-full h-10 bg-[#f2f8fb] border border-solid box-border rounded self-stretch p-3  font-normal text-sm items-center text-[#535353] leading-tight focus:outline-none focus:bg-white`}
                value={amount}
                onWheel={(e: any) => e.target.blur()}
                onKeyDown={(evt: any) => {
                  preventNonNumericalInput(evt);
                }}
                onKeyPress={() => setAmountError(false)}
                onChange={(e) => handleChange(e)}
              />
              {amountError && <small className='text-red-500 '>This field cannot be empty.</small>}
            </div>
          </div>
          <div className='flex justify-center pt-3'>
            <button className='mt-confirmationBtnYes' onClick={() => handleRefund()}>
              Refund
            </button>
          </div>
        </Modal>
      )}
      <SEO title='BillerManagement' desc='BillerManagement Description' />
      <Privilege permission={permission?.read} message='view this page'>
        <div>{invoice?.userReceipt ? renderBill(invoice?.userType) : <></>}</div>
      </Privilege>
    </>
  );
};

ViewInvoice.auth = true;
export default ViewInvoice;

ViewInvoice.Layout = MainLayout;
ViewInvoice.routeSettings = routing.invoiceMgmt;
