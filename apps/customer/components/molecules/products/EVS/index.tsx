import { BinIcon, PlusCircleIcon } from '@/../../packages/ui/atoms/icons';
import api, { apiController } from '@/api';
import ProductAttribute from '@/components/atoms/ProductAttribute';
import DiskCapacity from '@/components/molecules/DiskCapacity';
import { DISK_TYPE, PRODUCT_CODE } from '@/models';
import { getAuth } from '@/utils/auth';
import { useEffect, useState } from 'react';

const SystemDisk = ({ selected, data, onChange, min, capacity, changeDiskCapacity }) => {
  return (
    <ProductAttribute label='System Disk' {...{ selected, data, onChange }} dropdown={true} code='value'>
      <DiskCapacity min={min} capacity={capacity} changeDiskCapacity={changeDiskCapacity} />
    </ProductAttribute>
  );
};

const EVS = ({ code, label, billingType, region, setOtherAttributes, onChange, className }) => {
  const [attributes, setAttributes] = useState<any>();
  const [defaultDisk, setDefaultDisk] = useState<any>();
  const [product, setProduct] = useState<any>();
  const [selected, setSelected] = useState<any>({});
  const [disks, setDisks] = useState<any[]>([]);
  const [diskType, setDiskType] = useState(DISK_TYPE.SYSTEM);
  const [diskCount] = useState(5);
  const productCode = 'EVS';
  let defaultCapacity = 40;

  //#region functions
  const getData = () => {
    let query: any = getAuth()?.userType === 'enterprise' ? { isEnterpriseClient: true } : {};
    query = {
      ...query,
      productTypeLevel2Code: productCode,
      billingMode: billingType,
      region,
    };

    api.products.getProductAttributes(query).then((res) => {
      if (res.attributes?.specs?.length > 0) {
        const codeMap = {};
        res.attributes?.specs.forEach((spec) => {
          codeMap[spec.value] = spec.nextLevel?.specs?.[0].value || '';
        });
        setProduct(codeMap);
        const defaultCode = res.attributes.specs[0].value;
        defaultCapacity = res.attributes.specs[0].nextLevel.specs[0].otherAttributes.defaultStorage;
        const default_Disk = {
          type: defaultCode,
          noOfUnits: defaultCapacity,
          productCode: codeMap[defaultCode],
        };
        setDefaultDisk(default_Disk);

        setSelected((selected) => {
          const newState = {
            ...selected,
          };
          if (code === PRODUCT_CODE.ECS || (code === PRODUCT_CODE.EVS && diskType === DISK_TYPE.SYSTEM)) {
            newState['system_disk'] = default_Disk;
          }
          return newState;
        });

        setAttributes(res.attributes);
        setOtherAttributes(res.attributes.specs[0].nextLevel.specs[0].otherAttributes);
      }
    });
  };

  const onUpdate = (value, index?: number) => {
    const key = index ? `disk_${index}` : 'system_disk';
    const disk = { ...selected[key], type: value, productCode: product[value] };
    setSelected((selected) => ({ ...selected, [key]: disk }));
  };

  const resetDiskType = (type) => {
    setDiskType(type);
    if (type === DISK_TYPE.SYSTEM) {
      setDisks([]);
      setSelected({ system_disk: defaultDisk });
    } else {
      setSelected({ [`disk_${disks.length + 1}`]: defaultDisk });
    }
  };

  const addDataDisk = () => {
    setSelected((selected) => ({
      ...selected,
      [`disk_${disks.length + 1}`]: defaultDisk,
    }));
  };

  const removeDisk = (index) => {
    setDisks([]);

    setSelected((selected) => {
      const state = { ...selected };
      delete state[`disk_${index}`];
      const keys = Object.keys(state);

      let newState = {};
      if (code === PRODUCT_CODE.ECS || (code === PRODUCT_CODE.EVS && diskType === DISK_TYPE.SYSTEM)) {
        newState = { ...newState, system_disk: state.system_disk };
      }

      let c = 1;
      keys.forEach((key, i) => {
        // if (!['system_disk', 'disk_0'].includes(key) && state[key]) {
        if (!['system_disk'].includes(key) && state[key]) {
          newState[`disk_${c++}`] = state[key];
        }
      });
      return newState;
    });
  };

  const changeDiskCapacity = (value, index?: number) => {
    const key = index ? `disk_${index}` : 'system_disk';
    const disk = { ...selected[key], noOfUnits: parseInt(value) };
    setSelected((selected) => ({ ...selected, [key]: disk }));
  };
  //#endregion

  //#region useEffects
  useEffect(() => {
    const disks = Object.values(selected);
    const optDisks = [];
    Object.keys(selected).forEach((disk) => {
      if (!['system_disk'].includes(disk)) {
        optDisks.push(selected[disk]);
      }
    });

    setDisks(optDisks);
    onChange({ evs: disks });
  }, [selected]);

  useEffect(() => {
    getData();
    // return () => {
    //   apiController.abort();
    // };
  }, []);
  //#endregion

  return attributes ? (
    <div>
      <div className={`flex flex-col space-y-5 ${className}`}>
        {code === PRODUCT_CODE.EVS && (
          <ProductAttribute
            label='Disk Type'
            data={[{ key: DISK_TYPE.SYSTEM }, { key: DISK_TYPE.DATA }]}
            code='key'
            selected={diskType}
            onChange={resetDiskType}
          ></ProductAttribute>
        )}
        {(code === PRODUCT_CODE.ECS || diskType === DISK_TYPE.SYSTEM) && (
          <SystemDisk
            selected={selected['system_disk'].type}
            data={attributes?.specs}
            onChange={(value) => onUpdate(value)}
            min={defaultCapacity}
            capacity={selected['system_disk'].noOfUnits}
            changeDiskCapacity={changeDiskCapacity}
          />
        )}
        <>
          {disks.map((disk, i) => (
            <ProductAttribute
              key={i}
              label={i === 0 ? label : ''}
              selected={disk.type}
              dropdown={true}
              data={attributes?.specs}
              code='value'
              onChange={(value) => onUpdate(value, i + 1)}
            >
              <div className='flex items-center'>
                <DiskCapacity
                  key={i}
                  min={defaultCapacity}
                  capacity={disk.noOfUnits}
                  changeDiskCapacity={(value) => changeDiskCapacity(value, i + 1)}
                />
                {(code !== PRODUCT_CODE.EVS || i !== 0) && (
                  <span onClick={() => removeDisk(i + 1)}>
                    <BinIcon className='w-5 h-5 ml-4 text-red-600 cursor-pointer' />
                  </span>
                )}
              </div>
            </ProductAttribute>
          ))}
        </>
      </div>
      {(code === PRODUCT_CODE.ECS || (code === PRODUCT_CODE.EVS && diskType === DISK_TYPE.DATA)) && disks.length < diskCount && (
        <div className='ml-[10rem] mt-4'>
          <span className='cursor-pointer inline-flex' onClick={addDataDisk}>
            <PlusCircleIcon className='w-6 h-6 mr-2' /> You can attach {diskCount - disks.length} more data disks.
          </span>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default EVS;
