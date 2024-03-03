// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Home',
    path: '/home',
    icon: 'mdi:home-outline'
  },
  {
    title: 'Second Page',
    path: '/second-page',
    icon: 'mdi:email-outline'
  },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'Access Control',
    icon: 'mdi:shield-outline'
  },
  {
    title: 'Roles & Permissions',
    icon: 'mdi:shield-outline',
    children: [
      {
        title: 'Roles',
        path: '/apps/roles'
      },
      {
        title: 'Permissions',
        path: '/apps/permissions'
      }
    ]
  },
  {
    title: 'Account Settings',
    auth: false,
    children: [
      {
        title: 'Account',
        auth: false,
        path: '/account/account'
      },
      {
        title: 'Security',
        path: '/account/security'
      },
      {
        title: 'Billing',
        path: '/account/billing'
      }
    ]
  }
]

export default navigation
