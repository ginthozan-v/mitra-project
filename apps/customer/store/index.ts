import { stringify } from 'querystring';
import create from 'zustand';

type STORE = {
  loyalty: boolean;
  setLoyalty: (v: boolean) => void;
};
type menu = {
  id: number;
  titleFE: string;
  title: string;
  active: boolean;
  level: number;
  children?: [];
  expandable: boolean;
  URL: string;
  isExternal: boolean;
  requireAuth: boolean;
}[];

type expandMenu = {
  category: string;
  categoryId: string;
  subCategory: {
    subCategoryId: string;
    productSubCategoryTitle: string;
    productSubCategoryShortDescription: string;
  }[];
}[];

const useStore = create((set: any) => ({
  online: true,
  setOnline: (online: boolean) => set((state) => ({ online })),

  loading: false,
  setLoading: (loading: boolean) => set((state) => ({ loading })),

  loyalty: false,
  setLoyalty: (enabled: boolean) => set((state) => ({ loyalty: enabled })),

  search: false,
  setSearch: (enabled: boolean) => set((state) => ({ search: enabled })),

  logo: { smallLogo: '', mediumLogo: '', largeLogo: '' },
  setLogo: (logoData: any) => set((state) => ({ logo: logoData })),

  primaryMenu: [],
  setPrimaryMenu: (primaryMenu) => set((state) => ({ primaryMenu: primaryMenu })),

  expand: [],
  setExpandMenu: (val: expandMenu) => set((state) => ({ expand: val })),

  currencySwitchable: true,
  setCurrencySwitchable: (s) => set((state) => ({ currencySwitchable: s })),

  status: '',
  setUserStatus: (status: string) => set((state) => ({ status: status })),

  industries: [],
  setIndustries: (industries: any) => set((state) => ({ industries })),

  productMeta: {} as any,
  productMetaMapping: {} as any,
  setProductMeta: (meta: any) =>
    set((state) => {
      const arrToObj = (arr, key) => {
        const obj = {};
        arr.forEach((a) => {
          obj[a[key + 'Code']] = { ...a, code: a[key + 'Code'], name: a[key + 'Name'] };
        });
        return obj;
      };
      const productMetaMapping = {
        ...arrToObj(meta.regions, 'region'),
        ...arrToObj(meta.infraTypes, 'infraType'),
        ...arrToObj(meta.availabilityZones, 'az'),
        ...arrToObj(meta.seriesList, 'series'),
      };
      return { productMeta: meta, productMetaMapping };
    }),
}));

export default useStore;
