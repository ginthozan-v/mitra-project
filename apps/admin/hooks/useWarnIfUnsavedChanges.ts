/*
 * File: useWarnIfUnsavedChanges.ts
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 20 April 2022 10:19 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

import { useEffect } from 'react';
import Router from 'next/router';

const useWarnIfUnsavedChanges = (
    unsavedChanges: boolean,
    callback: () => boolean
) => {
    useEffect(() => {
        if (unsavedChanges) {
            const routeChangeStart = () => {
                const ok = callback();
                if (!ok) {
                    Router.events.emit('routeChangeError');
                    // tslint:disable-next-line: no-string-throw
                    throw 'Abort route change. Please ignore this error.';
                }
            };
            Router.events.on('routeChangeStart', routeChangeStart);

            return () => {
                Router.events.off('routeChangeStart', routeChangeStart);
            };
        }
    }, [unsavedChanges]);
};

export default useWarnIfUnsavedChanges;
