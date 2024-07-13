import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import { ROUTE_PRODUCTS } from 'constants/routes';
import Link from 'next/link';
// import useStore from "store";

const ContinueShopping = ({
  url = ROUTE_PRODUCTS,
  style = 'button',
  className = '',
}: {
  url?: string;
  style?: 'button' | 'link';
  className?: string;
}) => {
  let classList =
    'bg-[#FFFFFF] py-1 font-semibold text-center text-base text-[#474747] rounded border-solid border-2 border-[#474747] box-border inline-flex justify-center items-center h-12 w-48 md:w-52 mt-4';
  if (style == 'link') {
    classList = `flex flex-row text-mtBlue text-center font-semibold ${className}`;
  }
  return (
    <Link href={url}>
      <a className={classList}>
        Continue Shopping
        {style == 'link' && <ChevronRightIcon className=' w-5 h-5 m-1' />}
      </a>
    </Link>
  );
};

export default ContinueShopping;
