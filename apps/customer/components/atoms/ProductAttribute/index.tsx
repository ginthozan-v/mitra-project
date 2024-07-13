import { ChevronDownIcon } from '@mtcloud/ui/atoms/icons';
import { PRODUCT_BUILDER_LABEL, PRODUCT_CODE } from '@/models';
import useStore from '@/store';
import { Menu } from '@headlessui/react';

type ProductAttributeType = {
  label?: string;
  data: any[];
  code: string;
  customMap?: boolean;
  value?: string;
  selected?: string;
  dropdown?: boolean;
  onChange?: (value) => void;
  children?: any;
};

const Dropdown = ({ data, selected, onChange, code, productMetaMapping }) => {
  const options = data.filter((v) => v[code] !== selected);
  const hasOptions = options.length > 0;
  return (
    <div className={`flex items-center`}>
      <Menu as='div' className='relative block w-full'>
        <Menu.Button
          className={`attr-val flex items-center px-4 min-h-[2.25rem] text-[0.9em] font-[500] text-white text-center bg-skyBlue min-w-[8rem] rounded`}
        >
          {productMetaMapping[selected]?.name || selected}
          {hasOptions && <ChevronDownIcon className='w-6 h-6 pl-2 -mr-1.5' />}
        </Menu.Button>
        {hasOptions && (
          <Menu.Items
            style={{ width: 'fit-content', minWidth: '100%' }}
            className={`absolute z-10 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md overflow-hidden shadow-lg`}
          >
            {options.map((v, i) => (
              <Menu.Item key={v[code]}>
                {({ active }) => (
                  <button
                    className={`${active ? 'text-skyBlue' : 'text-mtBlue '} font-weight-600 group flex items-center w-full px-3 py-1.5`}
                    onClick={() => onChange(v[code])}
                  >
                    {productMetaMapping[v[code]]?.name || v[code]}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        )}
      </Menu>
    </div>
  );
};

const ProductAttribute = ({
  label = '',
  data,
  customMap = false,
  code,
  value = code,
  selected = '',
  dropdown = false,
  onChange = (value) => {
    return;
  },
  children,
}: ProductAttributeType) => {
  const productMetaMapping = useStore((store) => store.productMetaMapping);

  const keys = data?.map((d) => d[code]);

  const getClass = (currentKey, index) => {
    const selectDefault = (!selected || !keys.includes(selected)) && index === 0;
    return (selected && selected === currentKey) || selectDefault ? 'bg-skyBlue' : 'bg-skyBlueLight';
  };

  const withSuffix = (attribute: string, value: number) => {
    if (attribute === 'VCPU') {
      return `${value} ${value === 1 ? 'vCPU' : 'vCPUs'}`;
    } else if (attribute === 'MEMORY') {
      return `${value} GB RAM`;
    } else {
      return value;
    }
  };

  return (
    <>
      <div className='flex items-start min-h-[2rem] product-attribute'>
        <label className='w-[10rem] min-w-[10rem] py-1.5'>{PRODUCT_BUILDER_LABEL[label] || label}</label>
        <div className='flex flex-wrap items-start w-full gap-2'>
          <>
            {dropdown ? (
              <Dropdown {...{ data, selected, onChange, code, getClass, productMetaMapping }} />
            ) : (
              <>
                {data?.length > 0 ? (
                  <>
                    {data?.map((v, i) => (
                      <button
                        className={`attr-val px-4 min-h-[2.25rem] text-[0.9em] font-[500] text-white min-w-[8rem] ${getClass(v[code], i)} rounded`}
                        key={v[code]}
                        onClick={() => onChange(v[code])}
                      >
                        {withSuffix(label, customMap ? v[value] : productMetaMapping[v[code]]?.name || v[code])}
                      </button>
                    ))}
                  </>
                ) : (
                  <span className='text-gray-400 py-1.5'>No options available.</span>
                )}
              </>
            )}
          </>
          {children}
        </div>
      </div>
    </>
  );
};

export default ProductAttribute;
