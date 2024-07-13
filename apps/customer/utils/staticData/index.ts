import { CONSOLE_LINK } from '@/constants';
import { GENERIC_CONTENT } from 'api/generic-contents';
import menuLinks from 'constants/menu/menuLinks';

const getStaticData = async (api, serverSide = false) => {
  const logo = await api.genericContents.get(GENERIC_CONTENT.HOME_LOGO, serverSide);

  const res = await api.home.getAllPrimaryMenu();
  const menuItems = [];
  res?.map((item) => {
    if (item.active) {
      menuItems.push(item);
    }
  });

  const menuItemsList = menuItems.map((menuItem) => {
    const itemList = menuLinks.find((item) => item.id === menuItem.id);
    return { ...itemList, ...menuItem };
  });

  menuItemsList.push(CONSOLE_LINK);
  return { logo, primaryMenu: menuItemsList };
};

export default getStaticData;
