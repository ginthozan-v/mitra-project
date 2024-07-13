import { BILLING_TYPE } from '@/models';

const BillingType = ({
  selection,
  disabled = false,
  changeBillingType,
}: {
  selection?: any;
  disabled?: boolean;
  changeBillingType?: (p: any) => void;
}) => {
  const updateBillingType = (type) => {
    if (!disabled && selection !== type) {
      changeBillingType(type);
    }
  };

  return (
    <>
      {Object.keys(BILLING_TYPE).map((type) => (
        <button
          key={type}
          className={`attr-val px-3 py-1 text-[0.9em] font-[500] text-white rounded ${
            selection && selection === type ? 'bg-skyBlue' : disabled ? 'pointer-events-none bg-gray-300' : 'bg-skyBlueLight'
          }`}
          onClick={() => updateBillingType(type)}
        >
          {type}
        </button>
      ))}
    </>
  );
};

export default BillingType;
