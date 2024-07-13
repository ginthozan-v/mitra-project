import ProductAttribute from '@/components/atoms/ProductAttribute';
import { PRODUCT_CUSTOMIZATION_KEY } from '@/models';
import { useEffect, useState } from 'react';

const ProductAttributes = ({
  productCode,
  data,
  setOtherAttributes,
  className = '',
  onUpdate = (value) => {
    return;
  },
}: {
  productCode: string;
  data: { level: string; specs?: any[] };
  setOtherAttributes?: any;
  className?: string;
  onUpdate?: (value) => void;
}) => {
  const [selected, setSelected] = useState(data.specs[0]?.value);
  const [nextLevel, setNextLevel] = useState(data.specs[0]?.nextLevel);

  const onChange = (value) => {
    setNextLevel(null);
    const selectedAttr = data.specs.find((s) => s.value === value);
    setTimeout(() => {
      setSelected(value);
      setNextLevel(selectedAttr.nextLevel);
      onUpdate({ [PRODUCT_CUSTOMIZATION_KEY[data.level]]: value });
    }, 0);
  };

  useEffect(() => {
    onUpdate({ [PRODUCT_CUSTOMIZATION_KEY[data.level]]: selected });
  }, [selected]);

  useEffect(() => {
    if (typeof setOtherAttributes === 'function') {
      setOtherAttributes(null);
      setTimeout(() => {
        if (data.level === 'PRODUCT') {
          setOtherAttributes(data.specs[0]?.otherAttributes);
        }
      });
    }
  }, [data.level]);

  return (
    <>
      {data?.level !== 'PRODUCT' && (
        <div className={`flex flex-col space-y-12 ${className}`}>
          <ProductAttribute label={data?.level} data={data?.specs} code='value' {...{ selected, onChange }} />
          {nextLevel && <ProductAttributes {...{ productCode, setOtherAttributes }} data={nextLevel} onUpdate={onUpdate} />}
        </div>
      )}
    </>
  );
};

export default ProductAttributes;
