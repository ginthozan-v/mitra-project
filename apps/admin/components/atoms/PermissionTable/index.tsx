/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 22 April 2022 09:44 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { Fragment, useEffect } from 'react';
import { DeleteIcon, EditIcon, PlusCircleIcon, ReadIcon } from '@mtcloud/ui/atoms/icons';
import { propTypes } from './types';

function PermissionTable({
  dataList,
  checkedPermissions,
  setCheckedPermissions,
  roleId,
}: propTypes) {
  const select = (value: string, type: string) => {
    let permissions = [...checkedPermissions];
    let foundIndex = permissions.findIndex((x) => x.code === value);
    switch (type) {
      case 'read':
        if (foundIndex !== -1) {
          if (permissions[foundIndex]['read']) {
            permissions[foundIndex]['read'] = false;
          } else {
            permissions[foundIndex]['read'] = true;
          }
        } else {
          permissions.push({
            code: value,
            read: true,
            create: false,
            update: false,
            delete: false,
          });
        }
        break;
      case 'create':
        if (foundIndex !== -1) {
          if (permissions[foundIndex]['create']) {
            permissions[foundIndex]['create'] = false;
          } else {
            permissions[foundIndex]['create'] = true;
          }
        } else {
          permissions.push({
            code: value,
            read: false,
            create: true,
            update: false,
            delete: false,
          });
        }
        break;
      case 'update':
        if (foundIndex !== -1) {
          if (permissions[foundIndex]['update']) {
            permissions[foundIndex]['update'] = false;
          } else {
            permissions[foundIndex]['update'] = true;
          }
        } else {
          permissions.push({
            code: value,
            read: false,
            create: false,
            update: true,
            delete: false,
          });
        }
        break;
      case 'delete':
        if (foundIndex !== -1) {
          if (permissions[foundIndex]['delete']) {
            permissions[foundIndex]['delete'] = false;
          } else {
            permissions[foundIndex]['delete'] = true;
          }
        } else {
          permissions.push({
            code: value,
            read: false,
            create: false,
            update: false,
            delete: true,
          });
        }
        break;
    }
    setCheckedPermissions(permissions);
  };

  const seletAll = (value: string) => {
    let values = [...checkedPermissions];
    let foundIndex = values.findIndex((x) => x.code === value);
    if (foundIndex !== -1) {
      values = values.filter((x) => x.code !== value);
    }
    values.push({
      code: value,
      read: true,
      create: true,
      update: true,
      delete: true,
    });
    setCheckedPermissions(values);
  };

  const removeAll = (value: string) => {
    const values = checkedPermissions.filter((x) => x.code !== value);
    setCheckedPermissions(values);
  };

  const isAllSelected = (param: string) => {
    let permissions = checkedPermissions.find((x) => x.code === param);
    if (permissions?.create && permissions?.read && permissions?.update && permissions?.delete) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!roleId) {
      const options = [...checkedPermissions];

      dataList?.map((data) => {
        data.category.map((category) => {
          category.permissions.map((permission) => {
            if (permission.value) {
              const foundIndex = options.findIndex((x) => x.code === category.code);
              if (foundIndex !== -1) {
                options[foundIndex][permission.name] = true;
              } else {
                options.push({
                  code: category.code,
                  [permission.name]: true,
                });
              }
            }
          });
        });
      });
      setCheckedPermissions(options);
    }
  }, [roleId]);

  return (
    <table className='w-full table-auto'>
      <thead>
        <tr className='border-b bg-gray-50'>
          <th className='text-left text-xl py-2 px-2'>Permissions</th>
          <th className='py-1'>
            <PlusCircleIcon className='w-5 h-5 mx-auto' />
          </th>
          <th className='py-1'>
            <ReadIcon className='w-5 h-5 mx-auto' />
          </th>
          <th className='py-1'>
            <EditIcon className='w-5 h-5 mx-auto' />
          </th>
          <th className='py-1'>
            <DeleteIcon className='w-5 h-5 mx-auto' />
          </th>
          <th className='py-1'></th>
        </tr>
      </thead>
      <tbody className='text-left'>
        {dataList.map((categories, i) => (
          <Fragment key={i}>
            <tr>
              <th className='py-4 px-2 font-medium'>{categories.title}</th>
            </tr>
            {categories.category?.map((cat, j) => (
              <tr key={j}>
                <td className='py-1 px-2 text-gray-600'> {cat.title}</td>
                {cat.permissions.map((permission, k) => (
                  <td key={k} className='py-1 text-center'>
                    <input
                      type='checkbox'
                      name={`${cat.name}_${permission.name}`}
                      className='w-4 h-4 accent-[#00AEEF] hover:accent-[#FFA400]'
                      checked={
                        checkedPermissions.find((x) => x.code === cat.code)?.[permission.name] ||
                        false
                      }
                      onChange={() => select(cat.code, permission.name)}
                    />
                  </td>
                ))}
                <td className='py-1 text-right text-sky-500 w-28'>
                  {isAllSelected(cat.code) === true ? (
                    <p className='cursor-pointer' onClick={() => removeAll(cat.code)}>
                      Remove All
                    </p>
                  ) : (
                    <p className='cursor-pointer' onClick={() => seletAll(cat.code)}>
                      Select All
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default PermissionTable;
