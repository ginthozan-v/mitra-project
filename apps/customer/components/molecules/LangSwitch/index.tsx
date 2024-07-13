import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { ChevronDownIcon, ChevronRightIcon } from '@mtcloud/ui/atoms/icons';
import { Fragment } from 'react';
import api from 'api';
import { getAuth } from 'utils/auth';
import useCurrency from 'components/hooks/useCurrency';

export default function LangSwitch({
  isMobile,
  className,
  menuStyle,
  dropdown = false,
}: {
  isMobile: boolean;
  className?: string;
  menuStyle?: string;
  dropdown?: boolean;
}) {
  const { locale, locales, asPath, push } = useRouter();
  const { id: selectedCurrency } = useCurrency();
  const auth = getAuth();

  const change = (selectedLanguage: string) => {
    if (auth && auth.userid) {
      api.user.settings
        .saveGeneralSettings({
          preferredCurrency: selectedCurrency,
          // preferredLanguage: selectedLanguage,
          preferredLanguage: 'en',
        })
        .then(() => {
          push(asPath, null, {
            // locale: selectedLanguage,
            locale: 'en',
          });
        });
    } else {
      push(asPath, null, {
        // locale: selectedLanguage,
        locale: 'en',
      });
    }
  };
  return (
    <div className={`flex items-center ${dropdown ? 'w-full' : ''}`}>
      <Menu as='div' className='relative block w-full text-left z-20'>
        <div className='p-2'>
          <Menu.Button
            className={`flex justify-between w-full ${menuStyle} ${
              isMobile ? 'text-xs' : 'text-sm font-semibold text-mtBlue'
            } hover:text-mtBlue rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-mtBlueAlt focus-visible:ring-opacity-75`}
          >
            {/* {locale === 'en' ? 'English' : 'French'} */}
            {'English'}
            {dropdown ? (
              <ChevronDownIcon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} aria-hidden='true' />
            ) : (
              <ChevronRightIcon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} aria-hidden='true' />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items
            style={{ width: 'fit-content', minWidth: '100%' }}
            className={`${className} absolute mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className='px-1 py-1 '>
              {locales
                .filter((i) => i !== locale)
                .map((currentLang) => {
                  return (
                    <Menu.Item key={currentLang}>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-skyBlue text-white' : 'text-mtBlue '} group flex rounded-md items-center w-full px-2 py-2 ${
                            isMobile ? 'text-xs' : 'text-sm font-semibold'
                          } `}
                          onClick={() => {
                            change(currentLang);
                          }}
                        >
                          {/* {currentLang === 'en' ? 'English' : 'French'} */}
                          {'English'}
                        </button>
                      )}
                    </Menu.Item>
                  );
                })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
