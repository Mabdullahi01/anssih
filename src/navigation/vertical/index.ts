// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Announcements',
      path: '/announcements',
      icon: 'mdi:email-outline'
    },
    {
      title: 'Account',
      icon: 'pajamas:account',
      children: [
        {
          title: 'Profile',
          icon: 'iconamoon:profile-fill',
          path: '/account/profile'
        },
        {
          title: 'Security',
          icon: 'material-symbols-light:settings',
          path: '/account/security'
        },
        {
          title: 'Payment',
          icon: 'ic:baseline-payment',
          path: '/account/payment'
        }
      ]
    },
    {
      title: 'Scholars',
      path: '/scholars',
      icon: 'mdi:people'
    },
    {
      title: 'Mandate',
      icon: 'mdi:account-payment',
      path: '/mandate'
    },
    {
      title: 'Market place',
      icon: 'mdi:marketplace',
      path: '/coming-soon'
    },
    {
      title: 'Academic Excellence',
      icon: 'fluent:hat-graduation-28-filled',
      path: '/under-maintenance'
    },
    {
      title: 'Roles',
      icon: 'eos-icons:role-binding',
      path: '/roles'
    },
    {
      title: 'Permissions',
      icon: 'mdi:shield-outline',
      path: '/permissions'
    },
    {
      title: 'FAQs',
      icon: 'ph:question-fill',
      path: '/faq'
    }
  ]
}

export default navigation
