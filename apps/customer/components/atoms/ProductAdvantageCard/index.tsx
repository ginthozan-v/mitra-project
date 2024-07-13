import { IMAGE_PATH } from "@/constants";

const ProductAdvantageCard = ({ icon, title, description }) => {
  return (
    <div className='w-full md:w-1/2 p-2'>
      <div className='bg-white shadow rounded-md flex p-3 h-full'>
        <img
          src={`${IMAGE_PATH}/${icon}`}
          className='w-8 h-8 md:w-12 md:h-12'
        />

        <div className='pl-2'>
          <h3 className='text-md font-medium'>{title}</h3>
          <p className='text-sm mt-2 leading-6'>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductAdvantageCard;
