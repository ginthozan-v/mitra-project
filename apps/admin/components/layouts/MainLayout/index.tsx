/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 24 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */
import Header from 'components/molecules/navs/Header';
import SidebarMain from 'components/molecules/navs/SidebarMain';
import SidebarSub from 'components/molecules/navs/SidebarSub';

import type { PropsReactChildren } from '@mtcloud/globals/types';
import type { PropsRouteSettings } from 'constants/types';

const MainLayout = ({
  children,
  routeSettings,
}: PropsReactChildren & PropsRouteSettings) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="grow flex overflow-auto">
        <SidebarMain routeSettings={routeSettings} />
        <SidebarSub routeSettings={routeSettings} />
        <div className="grow bg-cms-base-20 h-full overflow-y-auto p-10">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
