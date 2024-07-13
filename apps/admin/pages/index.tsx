/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 24 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import Privilege from 'components/atoms/privilege';
import MainLayout from 'components/layouts/MainLayout';
import SEO from 'components/utils/SEO';
import routing from 'constants/routingConfig';
import usePermission from 'hooks/usePermission';
import { Permission, RolePermission } from 'models';

const recources = [
  {
    title: 'No of ECS',
    value: '98',
  },
  {
    title: 'No of EVS',
    value: '40',
  },
  {
    title: 'No of ELB',
    value: '50',
  },
  {
    title: 'No of CSBS',
    value: '45',
  },
];

const Index = () => {
  const permission: RolePermission = usePermission(Permission.DASHBOARD);

  return (
    <>
      <SEO title='MonitoringConsole' desc='Monitoring Console' />
      <Privilege permission={permission?.read} message='view this page'>
        <h1 className='mb-10 text-xl font-bold text-gray-800'>Total Resource Usage</h1>
        <div className='flex items-center justify-between max-w-4xl'>
          {recources.map((recource, i) => (
            <div key={i} className='flex items-center justify-center bg-white shadow-md rounded-xl w-52 h-52'>
              <div className='text-center'>
                <p className='text-gray-600'>{recource.title}</p>
                <p className='mt-2 font-bold text-gray-700 text-7xl'>{recource.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Privilege>
    </>
  );
};

Index.auth = true;
export default Index;

Index.Layout = MainLayout;
Index.routeSettings = routing.dashboard;
