const NoImage = ({ className, data_src = '' }: { className: string, data_src?: any }) => {
  return (
    <div data-src={data_src}
      className={`bg-gray-300 px-2 py-1 inline-flex justify-center items-center  ${className}`}
    >
      <svg viewBox='0 0 80 25' style={{width: '100%', height: '100%'}}>
        <text x='6%' y='68%' style={{fontSize: '88%', fontWeight: 600, textShadow: '2px 2px 5px rgb(0 0 0 / 40%)'}}>
          No Image
        </text>
      </svg>
    </div>
  );
};

export default NoImage;
