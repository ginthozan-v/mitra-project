/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Ginthozan Varnakulasingam (ginthozanv@mitrai.com)
 * File Created: 18 April 2022 03:00 pm
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function InputInfo({ info }: { info: string }) {
    return (
        <p className="text-xs italic text-gray-600 font-extralight">
            ( {info} )
        </p>
    );
}

export default InputInfo;
