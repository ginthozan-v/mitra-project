import { ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import { ROUTE_CART } from 'constants/routes';
import Link from 'next/link';
// import useStore from "store";

const BackToShoppingCart = ({
  url = ROUTE_CART,
  style = 'button',
}: {
  url?: string;
  style?: 'button' | 'link';
}) => {
  let classList =
    'bg-[#FFFFFF] py-1 font-semibold text-center text-base text-[#474747] rounded border-solid border-2 border-[#474747] box-border inline-flex justify-center items-center h-12 w-48 md:w-52 mt-4';
  if (style == 'link') {
    classList = 'flex flex-row text-mtBlue text-center font-semibold mt-2';
  }
  return (
    <Link href={url}>
      <a className={classList}>
        Back to Shopping Cart
        {style == 'link' && <ChevronRightIcon className=' w-5 h-5 m-1' />}
      </a>
    </Link>
  );
};

export default BackToShoppingCart;
