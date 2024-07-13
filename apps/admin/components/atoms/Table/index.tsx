/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 05 April 2022 11:55 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useTable, usePagination } from 'react-table';

interface Props {
  isLoading?: boolean;
  columns?: any[];
  data?: any[];
  totalResults?: number;
  offset?: number;
  currentResultsCount?: number;
  pageNext?: () => void;
  pagePrevious?: () => void;
}

export default function Table({ isLoading, columns, data, totalResults, offset, pageNext, pagePrevious, currentResultsCount }: Props) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } = useTable(
    {
      columns,
      data,
    },
    usePagination,
  );

  // Render the UI for your table
  return (
    <div className='overflow-hidden rounded shadow'>
      <div className='w-full overflow-x-auto'>
        <table {...getTableProps()} className='w-full overflow-x-auto text-sm text-left text-gray-500 table-auto '>
          <thead className='w-full text-sm text-gray-700 align-top bg-gray-50 '>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className='w-full'>
                {headerGroup.headers.map((column, i, row) => (
                  <th key={i} className='px-6 py-3 ' {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {!isLoading &&
              page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()} className='align-top bg-white border-b '>
                    {row.cells.map((cell, i) => {
                      return (
                        <td key={i} className='px-6 py-4 text-sm whitespace-pre-line truncate max-w-[300px]' {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className='py-5 text-center'>
                  Loading...
                </td>
              </tr>
            ) : (
              page.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className='py-5 text-center'>
                    No Data!
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav aria-label='Page navigation example' className='w-full px-4 py-2 bg-white'>
        <ul className='flex items-center justify-end -space-x-px'>
          <li>
            <button
              disabled={offset === 0}
              onClick={() => pagePrevious()}
              className='block px-2 py-1 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-200 disabled:text-gray-400'
            >
              <span className='sr-only'>Previous</span>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              disabled={currentResultsCount === totalResults}
              onClick={() => pageNext()}
              className='block px-2 py-1 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-200 disabled:text-gray-400'
            >
              <span className='sr-only'>Next</span>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </li>

          <span className='pl-4 text-xs text-gray-500'>
            Results{' '}
            <strong>
              {currentResultsCount} of {totalResults}
            </strong>{' '}
          </span>
        </ul>
      </nav>
    </div>
  );
}
