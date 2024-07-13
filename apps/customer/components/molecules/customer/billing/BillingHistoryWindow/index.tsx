/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dushanthi Madhushika (dmadhushika@mitrai.com)
 * File Created: Monday, 08 August 2022 3:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import api from 'api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAuth } from 'utils/auth';
import { Oval } from 'react-loader-spinner';
import { NETWORK_STATUS_CODES } from '@/constants';

const BillingHistoryWindow = ({ closeModal, refId, billingMode }: { closeModal: () => void; refId: string; billingMode: string }) => {
  const [topDataLeft, setTopDataLeft] = useState([]);
  const [topDataRight, setTopDataRight] = useState([]);
  const [trData, setTrData] = useState([]);
  const { locale } = useRouter();
  const [isMount, setMount] = useState(false);
  const [loading, setStatus] = useState(true);

  useEffect(() => {
    setMount(true);
    setStatus(true);
    const getData = async () => {
      try {
        const res = await api.billing.getBillingReceipt(refId, locale);

        let topLeftResponse;
        let topRightResponse;
        if (typeof res !== 'string') {
          if (getAuth().userType === 'individual') {
            if (billingMode === 'Postpaid' || billingMode === 'port payé') {
              topLeftResponse = res?.map(
                ({ dateOfBill, billFrom, billTo, name, email, billNumber, billingAccountNumber, fixedLineNumber, currency }) => ({
                  Bill_Number: billNumber,
                  Date_of_Bill: new Date(dateOfBill).toLocaleDateString(),
                  Billing_Period: new Date(billFrom).toLocaleDateString() + '-' + new Date(billTo).toLocaleDateString(),
                  Name: name,
                  Email: email,
                  Billing_Account_No: billingAccountNumber,
                  Fixed_Line_No: fixedLineNumber,
                  Currency: currency,
                }),
              );

              topRightResponse = res?.map(({ subTotal, vat, total, paymentDueDate }) => ({
                Sub_Total: subTotal,
                VAT: vat,
                Total: total,
                Payment_Due_Date: new Date(paymentDueDate).toLocaleDateString(),
              }));
            } else {
              topLeftResponse = res?.map(({ dateOfBill, name, email, billNumber, currency }) => ({
                Bill_Number: billNumber,
                Date_of_Bill: new Date(dateOfBill).toLocaleDateString(),
                Name: name,
                Email: email,
                Currency: currency,
              }));

              topRightResponse = res?.map(({ subTotal, vat, creditNoteAmount, total }) => ({
                Sub_Total: subTotal,
                VAT: vat,
                Credit_Note: creditNoteAmount,
                Total: total,
              }));
            }
          } else {
            if (billingMode === 'Postpaid' || billingMode === 'port payé') {
              topLeftResponse = res?.map(
                ({ dateOfBill, billFrom, billTo, name, companyName, billingAccountNumber, email, fixedLineNumber, billNumber, currency, brn }) => ({
                  Bill_Number: billNumber,
                  Date_of_Bill: new Date(dateOfBill).toLocaleDateString(),
                  Billing_Period: new Date(billFrom).toLocaleDateString() + '-' + new Date(billTo).toLocaleDateString(),
                  BRN: brn,
                  Company_Name: companyName,
                  Billing_Account_No: billingAccountNumber,
                  Fixed_Line_No: fixedLineNumber,
                  Email: email,
                  Name: name,
                  Currency: currency,
                }),
              );

              topRightResponse = res?.map(({ subTotal, vat, total, paymentDueDate }) => ({
                Sub_Total: subTotal,
                VAT: vat,
                Total: total,
                Payment_Due_Date: new Date(paymentDueDate).toLocaleDateString(),
              }));
            } else {
              topLeftResponse = res?.map(({ dateOfBill, name, companyName, email, billNumber, currency, brn }) => ({
                Bill_Number: billNumber,
                Date_of_Bill: new Date(dateOfBill).toLocaleDateString(),
                BRN: brn,
                Company_Name: companyName,
                Email: email,
                Name: name,
                Currency: currency,
              }));

              topRightResponse = res?.map(({ subTotal, vat, creditNoteAmount, creditNoteId, total }) => ({
                Sub_Total: subTotal,
                VAT: vat,
                [creditNoteId !== null && creditNoteId?.length !== 0 ? 'Credit_Note' + '[' + creditNoteId + ']' : 'Credit_Note']: creditNoteAmount,
                Total: total,
              }));
            }
          }

          const trDataResponse1 = res?.map(({ billedProducts }) => ({
            billedProducts: billedProducts.map(({ productName, specification, billingType, quantity, unitPrice, subTotal }) => ({
              Product_Name: productName,
              Specification: specification,
              Billing_Type: billingType,
              Quantity: quantity,
              Unit_Price: unitPrice,
              Sub_Total: subTotal,
            })),
          }));

          trDataResponse1?.map(({ billedProducts }) => {
            let combined = [];
            if (billedProducts.length !== 0) {
              {
                billedProducts.map((i) => {
                  combined.push(Object.entries(i));
                });
              }
            } else {
              combined = [];
            }

            setTrData(combined);
          });

          setTopDataLeft(Object.entries(topLeftResponse[0]));
          setTopDataRight(Object.entries(topRightResponse[0]));
        } else {
          if (!NETWORK_STATUS_CODES.includes(res)) {
            toast.error('Something went wrong');
          }
        }

        setStatus(false);
      } catch (error) {
        setStatus(false);
      }
    };
    getData();
  }, [billingMode, locale, refId]);

  const downloadBill = async () => {
    const response = await api.billing.downloadBill(refId);
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', refId + '.pdf');
    document.body.appendChild(link);
    link.click();
    closeModal();
  };
  const longString = (val: string) => {
    let text = '';

    while (val.length > 25) {
      text += val.substring(0, 25) + ' ';
      val = val.substring(25);
    }
    text += val.substring(0, 25);

    return text;
  };
  return (
    isMount && (
      <div>
        {loading ? (
          <div className='grid pt-4 place-items-center'>
            <Oval color='#00AEEF' width={80} secondaryColor='#bae6fd' height={80} />
          </div>
        ) : (
          <div>
            <h3 className='md:text-4xl text-2xl text-center font-medium leading-6 text-gray-900 pt-3'>MT Cloud Portal Bill</h3>
            <div className='flex items-center justify-between pb-4 px-3'>
              <Image src='/billing.png' width='100%' height='50px' objectFit='contain' alt='' />
              <Image src='/mt-logo.png' width='100%' height='50px' objectFit='contain' alt='' />
            </div>
            <div className='flex items-start justify-between w-full md:pl-16 md:pr-20 md:py-4 rounded'>
              <table className='text-gray-600 md:text-sm text-xs'>
                <tbody>
                  {topDataLeft.map(([key, val]) => (
                    <tr className='' key={key}>
                      <td className='px-3'>{key.split('_').join(' ')}</td>
                      <td className='px-3 max-w-[200px]'>{longString(val)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className='text-gray-600 md:text-sm text-xs'>
                <tbody>
                  {topDataRight.map(([key, val]) => (
                    <tr className='' key={key}>
                      <td className='px-3'>{key !== 'Total' && key !== 'Payment_Due_Date' ? key.split('_').join(' ') : null}</td>
                      <td className='px-4'>{key !== 'Total' && key !== 'Payment_Due_Date' ? val : null}</td>
                    </tr>
                  ))}

                  {topDataRight.map(([key, val]) => (
                    <tr className='' key={key}>
                      <td className='px-3 font-bold text-gray-900'>{key === 'Total' ? key.split('_').join(' ') : null}</td>
                      <td className='px-4 font-bold text-gray-900'>{key === 'Total' ? val : null}</td>
                    </tr>
                  ))}
                  {topDataRight.map(([key]) => (
                    <tr className='' key={key}>
                      <td className='px-3'>{key === 'Payment_Due_Date' ? key.split('_').join(' ') : null}</td>
                    </tr>
                  ))}
                  {topDataRight.map(([key, val]) => (
                    <tr className='' key={key}>
                      <td className='px-3 md:text-2xl text-lg'>{key === 'Payment_Due_Date' ? val : null}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='py-2'>
              {trData.length === 0 ? (
                <div className='text-center md:text-3xl text-2xl font-medium'>No Billed Products</div>
              ) : (
                <div className='relative overflow-x-auto'>
                  <table className='w-full md:text-sm text-xs text-left text-gray-500'>
                    <thead className='text-xs text-gray-700'>
                      <tr className=''>
                        {trData[0].map(([key]) => (
                          <th scope='col' key={key} className='px-3 py-3'>
                            {key.split('_').join(' ')}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {trData.map((item, index) => (
                        <tr className='bg-white border-b' key={index}>
                          {item.map(([key, val]) => (
                            <td className='truncate max-w-[200px] hover:text-clip hover:max-w-full px-3 py-2' key={key}>
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className='flex justify-center py-3'>
              <button className='w-32 h-12 px-4 py-2 bg-skyBlue text-white rounded-md' onClick={downloadBill}>
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default BillingHistoryWindow;
