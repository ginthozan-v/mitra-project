/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 30 March 2022 12:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import FeaturedProductsItem from 'components/molecules/FeaturedProductItem';

const FeaturedProducts = ({
  featuredData,
}: {
  featuredData: {
    id: string;
    productId: string;
    type: string;
    icon: string;
    solutionIndustry: string;
    displayName: string;
    shortDescription: string;
  }[];
}) => {
  return (
    <div className='max-w-7xl w-full mx-auto px-4 mt-16 text-mtBlue'>
      <h2 className='text-center font-bold text-3xl'>Featured Products</h2>
      <div className='max-w-5xl w-full mx-auto mt-3'>
        <p className='text-center font-medium'>
          Best-in-class solutions engineered by professional architects to expedite your cloud
          transformation
        </p>

        <div className='flex flex-wrap mt-4'>
          {featuredData
            ?.slice(0 - 6)
            .map(
              ({ id, productId, type, displayName, icon, solutionIndustry, shortDescription }) => (
                <FeaturedProductsItem
                  productId={productId}
                  type={type}
                  shortDescription={shortDescription}
                  displayName={displayName}
                  solutionIndustry={solutionIndustry}
                  icon={icon}
                  key={id}
                />
              ),
            )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
