import { Oval } from 'react-loader-spinner';

const Loader = ({ children, overlay = false }: { children?: any; overlay?: boolean }) => {
  return (
    <div className={`flex flex-col justify-center items-center space-y-4 fixed inset-0 z-[10000] ${overlay ? 'bg-slate-100/[0.3]' : ''}`}>
      <Oval color='#00aeef' secondaryColor='#fff' width={70} strokeWidth={3} wrapperStyle={{ filter: 'drop-shadow(3px 3px 6px rgb(0 0 0 / 0.8))' }} />
      <div className='font-medium text-center px-4 space-y-0.5' style={{ textShadow: '2px 2px 4px rgb(0 0 0 / 20%)' }}>
        {children}
      </div>
    </div>
  );
};

export default Loader;
