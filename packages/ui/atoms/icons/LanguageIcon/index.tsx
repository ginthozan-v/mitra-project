/*
 * File: index.tsx
 * Project: MT Cloud Portal
 * Author: Dilum Sanjaya (dranasinghe@mitrai.com)
 * File Created: 21 March 2022 08:00 am
 * Module: MT Cloud Portal Frontend
 * Copyright 2022 - 2022 Mitra Innovation Ltd.
 */

function LanguageIcon({ className } : {className : string }) {
  return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true"><path d="M21.7061 3.55189C21.7047 3.55147 21.7052 3.55165 21.704 3.5512C21.6626 3.53689 12.105 0.227566 11.4583 0.0111094C11.4349 0.00326885 11.4121 0.00407505 11.3888 0.0120468L2.7011 2.97427C2.25621 3.1368 1.47766 3.39685 0.373386 3.77066C0.214499 3.82755 0.111221 3.88443 0.0635552 3.94944C0.0565816 3.95658 0.0373657 4.00128 0.0112805 4.07805C0.00366421 4.10047 0 4.12403 0 4.14771V21.3168C0 21.3322 0.00467191 21.3535 0.0100107 21.3679C0.0165029 21.3854 0.0192547 21.3977 0.0270623 21.4147C0.082983 21.536 0.167608 21.6 0.293942 21.6C0.365442 21.6 2.28004 20.9499 6.04568 19.6578C9.48248 18.476 11.4107 17.8041 11.8305 17.6482C11.8818 17.6292 11.9373 17.6274 11.9893 17.6444L23.7054 21.4554C23.8508 21.5027 24 21.3943 24 21.2414V4.46224C24 4.36482 23.9373 4.27846 23.8447 4.2483L21.7061 3.55189ZM11.4558 16.9697C11.4558 17.0659 11.3947 17.1514 11.3037 17.1826L0.909615 20.7422C0.76359 20.7922 0.611718 20.6837 0.611718 20.5294V4.52455C0.611718 4.42843 0.672769 4.34293 0.763672 4.31173L11.1578 0.744288C11.3039 0.694159 11.4558 0.802687 11.4558 0.957105V16.9697ZM12.1518 17.1808C12.059 17.1508 11.996 17.0644 11.996 16.9668V1.15418C11.996 0.999187 12.1491 0.89061 12.2954 0.94182L23.152 4.74245C23.2414 4.77375 23.3016 4.85767 23.3027 4.95237L23.4723 20.5314C23.4739 20.6852 23.3243 20.7953 23.178 20.7479L12.1518 17.1808Z" fill="currentColor" /><path d="M10.3961 13.4978C10.3936 13.5101 10.3898 13.5236 10.379 13.5299C10.3532 13.5448 10.2875 13.5388 10.1904 13.5081C10.0703 13.47 9.90218 13.4167 9.69398 13.333L9.38175 13.1959C8.91735 12.9979 8.46098 12.7543 8.01263 12.4649C7.94055 12.4116 7.7244 12.2593 7.36409 11.9928C7.16964 11.8489 7.02415 11.7428 6.92387 11.672C6.83346 11.6081 6.71755 11.6337 6.65445 11.7246C5.98625 12.6876 5.31805 13.5406 4.64985 14.2772C3.80115 15.2291 3.2487 15.7773 2.99249 15.922C2.95246 15.9448 2.84838 15.96 2.68824 15.9829C2.55213 16.0023 2.51379 15.8793 2.60886 15.7799C2.81844 15.561 3.17922 15.1678 3.68907 14.6046C3.91325 14.3686 4.36162 13.7899 5.03417 12.8837C5.71473 11.9776 6.12307 11.3836 6.26719 11.1171C6.44334 10.8201 6.71556 10.3252 7.06785 9.63982C7.28328 9.2301 7.43574 8.9265 7.52865 8.73067C7.58903 8.60347 7.50773 8.5005 7.37145 8.53575C7.09241 8.6079 6.60199 8.7537 5.90689 8.97735C5.82683 9.00022 5.6747 9.03832 5.47453 9.09157C5.27437 9.1449 5.09022 9.19057 4.93008 9.23625C4.81773 9.26302 4.74085 9.28597 4.69944 9.29992C4.67691 9.3075 4.65559 9.32055 4.64771 9.34297C4.63761 9.37177 4.63384 9.4149 4.63384 9.47235C4.63384 9.55612 4.62584 9.6018 4.61783 9.61702C4.56178 9.71602 4.40165 9.79215 4.12943 9.84547C3.88923 9.91395 3.64103 9.91395 3.39282 9.84547C3.20067 9.80737 3.05655 9.7008 2.95246 9.53325C2.92741 9.49515 2.9055 9.43612 2.89064 9.35625C2.87251 9.2589 2.93709 9.17017 3.03448 9.15195C3.09534 9.14055 3.16941 9.12825 3.25671 9.11445C3.44886 9.084 3.609 9.05355 3.72109 9.0231C4.32959 8.86312 4.88205 8.70322 5.37846 8.54332C6.3201 8.22885 6.84873 8.0556 6.96435 8.02342C6.97998 8.01907 6.99574 8.0163 7.0114 8.0121C7.12388 7.98187 7.34071 7.89142 7.6683 7.7286C8.01263 7.5534 8.24483 7.44683 8.3649 7.40876C8.46098 7.3783 8.5731 7.34023 8.7012 7.28692C8.8293 7.23362 8.90933 7.21078 8.9334 7.20316C8.98943 7.1854 9.0378 7.24856 9.04148 7.30723C9.04793 7.41031 9.03833 7.53562 9.0159 7.68907C9.01433 7.70017 9.0132 7.71135 9.00953 7.72192C8.99385 7.76775 8.9301 7.89367 8.81325 8.1093C8.68515 8.36062 8.54108 8.6271 8.39693 8.90887C8.25285 9.19057 8.15678 9.35812 8.1327 9.41145C7.89368 9.8661 7.5432 10.4392 7.07534 11.1478C6.9972 11.2661 7.04576 11.4266 7.17674 11.4811L7.93253 11.7948C8.06063 11.8557 8.45295 12.0156 9.1095 12.2745C9.71033 12.5114 10.0564 12.6463 10.1537 12.6851C10.1676 12.6906 10.1826 12.6943 10.1933 12.7048C10.2314 12.742 10.2812 12.8666 10.3426 13.0741C10.386 13.2877 10.4099 13.4327 10.3961 13.4978Z" fill="currentColor" /><path d="M7.18441 5.2242C7.22029 5.4808 7.19337 5.71174 7.11264 5.92984C6.96912 6.31474 6.67311 6.63549 6.23357 6.89209C5.88999 7.09369 5.53776 7.1963 5.19388 7.19991C5.18137 7.20004 5.16888 7.19903 5.15659 7.19668C4.85849 7.13979 4.57761 6.92279 4.31395 6.54568C4.15317 6.29016 4.04575 5.94558 4.00056 5.51194C4.00019 5.50833 4.00041 5.50465 4.00124 5.50111C4.00769 5.47346 4.05012 5.46132 4.07532 5.47441C4.1341 5.50496 4.22956 5.53137 4.3588 5.55778C4.54718 5.59627 4.70864 5.59627 4.82525 5.55778C4.94187 5.51929 5.28273 5.39099 5.84785 5.16004C6.26945 4.95477 6.59238 4.8393 6.81663 4.80081C7.01397 4.78798 7.13955 4.92911 7.18441 5.2242Z" fill="currentColor" /><path d="M19.0036 5.42324C18.9854 5.34924 18.931 5.28946 18.859 5.2644L17.7362 4.87333C17.6196 4.83273 17.492 4.89367 17.4504 5.00989L14.4771 13.3034C14.4347 13.4216 14.4973 13.5517 14.6162 13.5922L15.67 13.9519C15.7858 13.9915 15.9118 13.9312 15.9539 13.8164L16.4567 12.444C16.4989 12.3287 16.6258 12.2686 16.7417 12.3088L19.4691 13.255C19.5412 13.28 19.5958 13.3399 19.6139 13.4142L20.0925 15.3757C20.1107 15.4503 20.1658 15.5104 20.2384 15.5353L21.2107 15.8671C21.379 15.9246 21.5443 15.7732 21.502 15.6006L19.0036 5.42324ZM17.3099 10.7136C17.1902 10.6732 17.1273 10.5421 17.1705 10.4235L17.9349 8.32305C18.0109 8.11425 18.3115 8.1303 18.3648 8.346L19.0009 10.9196C19.0436 11.0921 18.8788 11.2436 18.7105 11.1868L17.3099 10.7136Z" fill="currentColor" /><path d="M17.2971 20.8L20 20.9861L19.0788 23.2411L18.3922 22.3105C16.9148 23.0908 15.5818 23.5436 13.9131 23.7727C13.2526 23.8873 12.7311 23.9445 12.3575 23.9445H10.9234C10.0196 23.9445 8.88975 23.7584 7.51658 23.3933C6.1434 23.0282 4.86041 22.6828 4.13906 22.2532C4.05215 22.1888 4 22.1101 4 22.0313C4 21.9598 4.02608 21.8953 4.08691 21.838C4.14775 21.7807 4.21728 21.7593 4.31288 21.7593C4.35633 21.7593 4.46062 21.7951 4.61706 21.8667C4.7735 21.9382 4.94732 22.017 5.13851 22.0958C5.32971 22.1745 5.4427 22.2318 5.48615 22.2532C6.32048 22.604 7.46442 22.8349 8.4552 23.064C9.44595 23.2931 10.3412 23.4076 11.1494 23.4076C12.2357 23.4076 13.1831 23.336 14 23.2C14.8169 23.064 15.4721 22.8833 16.4454 22.5468C16.6193 22.4823 16.793 22.4107 16.9669 22.332C17.1407 22.2532 17.3406 22.1602 17.5492 22.0671C17.7578 21.9669 17.9229 21.8881 18.0359 21.838L17.2971 20.8Z" fill="currentColor" /></svg>;
}

export default LanguageIcon;