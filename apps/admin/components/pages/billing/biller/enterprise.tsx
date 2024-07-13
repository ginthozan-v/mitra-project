import Badge from '@mtcloud/ui/atoms/Badge';
import Currency from 'components/utils/Currency';
import Status from 'components/utils/Status';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';

const MYT_LOGO =
  'data:image/png;base64,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';
const TELECOM_LOGO =
  'data:image/png;base64,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';

const BillerEnterprise = ({ data, download }) => {
  return (
    <div className='p-5 bg-white rounded-lg shadow'>
      <div className='flex items-center gap-2'>
        Payment status: <Badge type={Status(data?.status?.code)} value={data?.status?.name} />
      </div>

      <h1 className='text-4xl text-center'>MT Cloud Portal Bill</h1>
      <div className='flex items-center justify-between mt-5'>
        <Image src={TELECOM_LOGO} width='100%' height='50px' objectFit='contain' />
        <Image src={MYT_LOGO} width='100%' height='50px' objectFit='contain' />
      </div>
      <div className='flex items-start justify-between w-full p-5 mt-10 rounded-lg bg-gray-50'>
        <table className='text-gray-600'>
          <tbody>
            <tr className=''>
              <td className='px-3'>Bill Number</td>
              <td className='px-3'>{data?.billNumber}</td>
            </tr>
            <tr>
              <td className='px-3'>Date of Bill</td>
              <td className='px-3'>{moment(data?.dateOfBill).format('DD/MM/YYYY')}</td>
            </tr>
            <tr>
              <td className='px-3'>BRN</td>
              <td className='px-3'>{data?.brn}</td>
            </tr>
            <tr>
              <td className='px-3'>Company Name</td>
              <td className='px-3'>{data?.companyName}</td>
            </tr>
            <tr>
              <td className='px-3'>Billing Account No</td>
              <td className='px-3'>{data?.billingAccountNumber}</td>
            </tr>
            <tr>
              <td className='px-3'>Fixed line No</td>
              <td className='px-3'>{data?.fixedLineNumber}</td>
            </tr>
            <tr>
              <td className='px-3'>Email</td>
              <td className='px-3'>{data?.email}</td>
            </tr>
            <tr>
              <td className='px-3'>Name</td>
              <td className='px-3'>
                {data?.firstName} {data?.lastName}
              </td>
            </tr>
            <tr>
              <td className='px-3'>Currency</td>
              <td className='px-3'>{data?.currency?.code}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <table className='text-gray-600'>
            <tbody>
              <tr>
                <td className='px-3'>Sub Total</td>
                <td className='px-3'>{Currency(data?.subTotal, data?.currency?.code)}</td>
              </tr>
              <tr>
                <td className='px-3'>VAT</td>
                <td className='px-3'>{Currency(data?.vat, data?.currency?.code)}</td>
              </tr>
              {data?.billingMode === 'PREPAID' && (
                <tr>
                  <td className='px-3'>Credit Note</td>
                  <td className='px-3'>
                    {data?.creditNoteId} {Currency(data?.creditNoteAmount, data?.currency?.code)}
                  </td>
                </tr>
              )}
              <tr>
                <td className='px-3'>Discount</td>
                <td className='px-3'>{Currency(data?.discount, data?.currency?.code)}</td>
              </tr>
              <tr>
                <td className='px-3 font-bold text-gray-900'>Total</td>
                <td className='px-3 font-bold text-gray-900'>{Currency(data?.total, data?.currency?.code)}</td>
              </tr>
              {data?.billingMode === 'ATB' && (
                <>
                  <tr>
                    <td className='px-3 pt-4 text-xl text-gray-900'>Payment Due Date</td>
                  </tr>
                  <tr>
                    <td className='px-3 text-xl font-bold text-gray-900 '>{moment(data?.paymentDueDate).format('DD/MM/YYYY')}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex justify-end mt-4'>
        <button onClick={() => download()}>
          <a className='px-3 py-2 m-0 text-sm font-medium text-white uppercase transition-colors rounded shadow-sm bg-sky-400 hover:opacity-80'>
            Export
          </a>
        </button>
      </div>
      <div className='mt-20'>
        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700'>
              <tr>
                <th scope='col' className='px-3 py-3'>
                  Product Name
                </th>

                <th scope='col' className='px-3 py-3'>
                  Specification
                </th>
                <th scope='col' className='px-3 py-3'>
                  Billing Type
                </th>
                <th scope='col' className='px-3 py-3'>
                  Quantity
                </th>
                <th scope='col' className='px-3 py-3'>
                  Unit Price
                </th>
                <th scope='col' className='px-3 py-3'>
                  Sub Total {data?.billingMode === 'ATB' && '(per month)'}
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.billedProducts?.length > 0 ? (
                data?.billedProducts?.map((products, index) => (
                  <tr key={index} className='bg-white border-b'>
                    <td className='px-3 py-2 whitespace-nowrap'>{products?.productName}</td>
                    <td className='px-3 py-2'>{products?.specification}</td>
                    <td className='px-3 py-2'>{products?.billingType?.en}</td>
                    <td className='px-3 py-2'>{products?.quantity}</td>
                    <td className='px-3 py-2 whitespace-nowrap'>{Currency(products?.unitPrice, data?.currency?.code)}</td>
                    <td className='px-3 py-2 whitespace-nowrap'>{Currency(products?.subTotal, data?.currency?.code)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className='px-3 py-3 text-center'>
                    No Data!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillerEnterprise;
