import { IMAGE_PATH } from '@/constants';
import { useEffect, useState } from 'react';

const Img = ({ className = '', src, alt = '', ...imgProps }) => {
  const TRANSPARENT = '/transparent.png';
  const NO_IMAGE = '/no-image.png';
  const imgResourceId = src.replace(`${IMAGE_PATH}/`, '');
  // const [noImage, setNoImage] = useState<boolean>(!imgResourceId);
  const [source, setSource] = useState(imgResourceId ? src : NO_IMAGE);
  const [classList] = useState(className + (imgProps?.layout === 'fill' ? ' w-full h-full ' : ''));

  const [style, setStyle] = useState<any>({
    backgroundSize: 80,
    backgroundColor: '#f0f0f0',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: imgProps.width ? `${imgProps.width}px` : null,
    height: imgProps.height ? `${imgProps.height}px` : null,
    objectFit: imgProps.objectFit,
  });

  const setImageStyle = () => {
    if (source === TRANSPARENT) {
      setStyle({ ...style, backgroundImage: `url(${NO_IMAGE})` });
    }
  };

  useEffect(setImageStyle, [source]);

  const error = () => {
    // setNoImage(true);
    setSource(TRANSPARENT);
  };

  // return noImage ? (
  //   <div className='w-full h-full bg-[#f0f0f0] flex items-center justify-center'>
  //     <img src={NO_IMAGE} style={{ maxHeight: '150px', height: '80%' }} />
  //   </div>
  // ) : (
  //   <img src={source} alt={alt} {...imgProps} className={`relative ${className} ${layoutClasses}`} onError={error} />
  // );
  return <img src={source} alt={alt} style={style} className={`relative ${classList}`} onError={error} />;
};

export default Img;
