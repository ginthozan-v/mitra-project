import * as Yup from 'yup';

export const formFieldData = [
  {
    label: 'Role Id',
    name: 'roleId',
    fieldType: 'text',
    placeholder: 'Role Id',
    disable: true
  },
  {
    label: 'Role Title',
    name: 'title',
    fieldType: 'text',
    placeholder: 'Role Title',
  },
  {
    label: 'Role Description',
    name: 'description',
    fieldType: 'text',
    placeholder: 'Role Description',
  },
  {
    label: 'isActive',
    name: 'active',
    fieldType: 'toggle',
  },
];

export const permissions = [
  {
    title: 'Monitoring Console',
    category: [
      {
        id: 1,
        title: 'Dashboard',
        name: 'dashboard',
        code: 'DASHBOARD',
        permissions: [
          {
            name: 'create',
          },
          {
            name: 'read',
          },
          {
            name: 'update',
          },
          {
            name: 'delete',
          },
        ],
      },
    ],
  },
  {
    title: 'CMS HOME',
    category: [
      {
        id: 2,
        title: 'Logo',
        name: 'home_logo',
        code: 'LOGO',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
      {
        id: 3,
        title: 'Hero Banner',
        name: 'hero_banner',
        code: 'HERO_BANNER',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
      {
        id: 4,
        title: 'Featured Products',
        name: 'featured_products',
        code: 'FEATURED_PRODUCTS',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
      {
        id: 5,
        title: 'Latest News',
        name: 'latest_news',
        code: 'LATEST_NEWS',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
      {
        id: 6,
        title: 'Loyalty Section',
        name: 'loyalty_section',
        code: 'LOYALITY_SECTION',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
      {
        id: 7,
        title: 'Promotion Section',
        name: 'promotion_section',
        code: 'PROMOTION_SECTION',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
      {
        id: 8,
        title: 'Privacy Policy',
        name: 'privacy_policy',
        code: 'PRIVAY_POLICY',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
      {
        id: 9,
        title: 'Social Media',
        name: 'social_media',
        code: 'SOCIAL_MEDIA',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
      {
        id: 10,
        title: 'Copyrights',
        name: 'copyrights',
        code: 'COPYRIGHTS',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
      {
        id: 11,
        title: 'Auto Logout Timeout',
        name: 'auto_logout_timeout',
        code: 'AUTO_LOGOUT_TIMEOUT',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
    ],
  },
  {
    title: 'CMS Primary Menu',
    category: [
      {
        id: 12,
        title: 'Primary Menu',
        name: 'primary_menu',
        code: 'PRIMARY_MENU',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
    ],
  },
  {
    title: 'CMS Registration',
    category: [
      {
        id: 13,
        title: 'Country List',
        name: 'country_list',
        code: 'COUNTRY_LIST',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
    ],
  },
  {
    title: 'CMS About Us',
    category: [
      {
        id: 14,
        title: 'About Us Management',
        name: 'about_us_management',
        code: 'ABOUT_US_MANAGEMENT',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
    ],
  },
  {
    title: 'CMS Loyalty',
    category: [
      {
        id: 15,
        title: 'Enable Disable Loyalty',
        name: 'enable_disable_loyalty',
        code: 'ENABLE_DISABLE_LOYALITY',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
    ],
  },
  {
    title: 'CMS Contact Us',
    category: [
      {
        id: 16,
        title: 'Contact Us Management',
        name: 'contact_us_management',
        code: 'CONTACT_US_MANAGEMENT',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
    ],
  },
  {
    title: 'CMS Faq',
    category: [
      {
        id: 17,
        title: 'Faq Categories',
        name: 'faq_categories',
        code: 'FAQ_CATEGORIES',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
      {
        id: 18,
        title: 'Faq Lists',
        name: 'faq_lists',
        code: 'FAQ_LISTS',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
    ],
  },
  {
    title: 'CMS Payment Method',
    category: [
      {
        id: 19,
        title: 'Payment Methods',
        name: 'payment_methods',
        code: 'PAYMENT_METHODS',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
      {
        id: 20,
        title: 'Payment Terms & Condition',
        name: 'payment_terms',
        code: 'PAYMENT_TERMS',
        permissions: [
          {
            name: 'create',
            value: true,
          },
          {
            name: 'read',
            value: true,
          },
          {
            name: 'update',
            value: true,
          },
          {
            name: 'delete',
            value: true,
          },
        ],
      },
    ],
  },
  {
    title: 'Billing Console',
    category: [
      {
        id: 21,
        title: 'Billing Management',
        name: 'billing',
        code: 'BILLING_MANAGEMENT',
        permissions: [
          {
            name: 'create',
          },
          {
            name: 'read',
          },
          {
            name: 'update',
          },
          {
            name: 'delete',
          },
        ],
      },
      {
        id: 27,
        title: 'Invoice Management',
        name: 'invoice_management',
        code: 'INVOICE_MANAGEMENT',
        permissions: [
          {
            name: 'create',
          },
          {
            name: 'read',
          },
          {
            name: 'update',
          },
          {
            name: 'delete',
          },
        ],
      },
      {
        id: 22,
        title: 'Billing Statistics',
        name: 'billing_statistics',
        code: 'BILLING_STATISTICS',
        permissions: [
          {
            name: 'create',
          },
          {
            name: 'read',
          },
          {
            name: 'update',
          },
          {
            name: 'delete',
          },
        ],
      },
      {
        id: 23,
        title: 'Billing Rule Customisation',
        name: 'billing_rule_customisation',
        code: 'RULE_CUSTOMIZATION',
        permissions: [
          {
            name: 'create',
          },
          {
            name: 'read',
          },
          {
            name: 'update',
          },
          {
            name: 'delete',
          },
        ],
      },
    ],
  },
  {
    title: 'User & Role Management',
    category: [
      {
        id: 24,
        title: 'User Management',
        name: 'user_management',
        code: 'USER_MANAGEMENT',
        permissions: [
          {
            name: 'create',
          },
          {
            name: 'read',
          },
          {
            name: 'update',
          },
          {
            name: 'delete',
          },
        ],
      },
      {
        id:25,
        title: 'User Role Management',
        name: 'user_role_management',
        code: 'ROLE_MANAGEMENT',
        permissions: [
          {
            name: 'create',
          },
          {
            name: 'read',
          },
          {
            name: 'update',
          },
          {
            name: 'delete',
          },
        ],
      },
      {
        id: 26,
        title: 'Admin User Management',
        name: 'admin_user_management',
        code: 'ADMIN_USER_MANAGEMENT',
        permissions: [
          {
            name: 'create',
          },
          {
            name: 'read',
          },
          {
            name: 'update',
          },
          {
            name: 'delete',
          },
        ],
      },
    ],
  },
  {
    title: 'Enterprise user',
    category: [
      {
        id:27,
        title: 'Create Enterprise User',
        name: 'create_enterprise_user',
        code: 'CREATE_ENTERPRISE_USER',
        permissions: [
          {
            name: 'create',
          },
          {
            name: 'read',
          },
          {
            name: 'update',
          },
          {
            name: 'delete',
          },
        ],
      },
    ],
  },
  {
    title: 'Settings',
    category: [
      {
        id: 1,
        title: 'Tech Support',
        name: 'tech_support',
        code: 'TECH_SUPPORT',
        permissions: [
          {
            name: 'create',
          },
          {
            name: 'read',
          },
          {
            name: 'update',
          },
          {
            name: 'delete',
          },
        ],
      },
    ],
  },
];

export const schema = {
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('This field cannot be empty'),
  description: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!')
};
