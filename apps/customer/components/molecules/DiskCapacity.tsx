import QuantityButton from '@/components/atoms/QuantityButton';

class DiskCapacityProps {
  min?: number = 1;
  max?: number;
  capacity: number;
  changeDiskCapacity?: (p: any) => void;
  stepper?: number = 10;
  suffix?: string = 'GB';
  className?: string = '';
  public constructor(initial: Partial<DiskCapacityProps>) {
    Object.assign(this, initial);
  }
}

const DiskCapacity = (props: DiskCapacityProps) => {
  const prop = new DiskCapacityProps(props);
  return (
    <>
      <div className={`${prop.className}`}>
        <div className='flex items-center'>
          <span className='mr-1 text-sm'>Capacity</span>
          <QuantityButton
            stepper={prop.stepper}
            min={prop.min}
            max={prop.max}
            quantity={prop.capacity}
            change={(value) => prop.changeDiskCapacity(value)}
            suffix={prop.suffix}
          />
        </div>
        {(prop.min || prop.max) && (
          <div className='text-sm text-red-500 space-x-2'>
            {prop.min && <span>Min: {prop.min}</span>}
            {prop.max && <span>Max: {prop.max}</span>}
          </div>
        )}
      </div>
    </>
  );
};

export default DiskCapacity;
