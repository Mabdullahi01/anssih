// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
//import axios from 'axios'

// ** Types
import { PricingDataType } from 'src/@core/components/plan-details/types'

// ** Demo Components Imports
import AccountSettings from 'src/views/pages/account/AccountSettings'

const AccountSettingsTab = ({ tab, apiPricingPlanData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <AccountSettings tab={tab} apiPricingPlanData={apiPricingPlanData} />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { tab: 'profile' } }, { params: { tab: 'security' } }, { params: { tab: 'payment' } }],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const data: PricingDataType = {
    pricingPlans: [
      {
        title: 'Basic',
        monthlyPrice: 0,
        currentPlan: true,
        popularPlan: false,
        subtitle: 'A simple start for everyone',
        imgSrc: '/images/pages/pricing-tree-1.png',
        yearlyPlan: {
          perMonth: 0,
          totalAnnual: 0
        },
        planBenefits: [
          '100 responses a month',
          'Unlimited forms and surveys',
          'Unlimited fields',
          'Basic form creation tools',
          'Up to 2 subdomains'
        ]
      },
      {
        monthlyPrice: 49,
        title: 'Standard',
        popularPlan: true,
        currentPlan: false,
        subtitle: 'For small to medium businesses',
        imgSrc: '/images/pages/pricing-tree-2.png',
        yearlyPlan: {
          perMonth: 40,
          totalAnnual: 480
        },
        planBenefits: [
          'Unlimited responses',
          'Unlimited forms and surveys',
          'Instagram profile page',
          'Google Docs integration',
          'Custom “Thank you” page'
        ]
      },
      {
        monthlyPrice: 99,
        popularPlan: false,
        currentPlan: false,
        title: 'Enterprise',
        subtitle: 'Solution for big organizations',
        imgSrc: '/images/pages/pricing-tree-3.png',
        yearlyPlan: {
          perMonth: 80,
          totalAnnual: 960
        },
        planBenefits: [
          'PayPal payments',
          'Logic Jumps',
          'File upload with 5GB storage',
          'Custom domain support',
          'Stripe integration'
        ]
      }
    ],
    faq: [
      {
        id: 'responses-limit',
        question: 'What counts towards the 100 responses limit?',
        answer:
          'We count all responses submitted through all your forms in a month. If you already received 100 responses this month, you won’t be able to receive any more of them until next month when the counter resets.'
      },
      {
        id: 'process-payments',
        question: 'How do you process payments?',
        answer:
          'We accept Visa®, MasterCard®, American Express®, and PayPal®. So you can be confident that your credit card information will be kept safe and secure.'
      },
      {
        id: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer: '2Checkout accepts all types of credit and debit cards.'
      },
      {
        id: 'money-back-guarantee',
        question: 'Do you have a money-back guarantee?',
        answer: 'Yes. You may request a refund within 30 days of your purchase without any additional explanations.'
      },
      {
        id: 'more-questions',
        question: 'I have more questions. Where can I get help?',
        answer: 'Please contact us if you have any other questions or concerns. We’re here to help!'
      }
    ],
    pricingTable: {
      header: [
        {
          title: 'Features',
          subtitle: 'Native Front Features'
        },
        {
          title: 'Starter',
          subtitle: 'Free'
        },
        {
          isPro: true,
          title: 'Pro',
          subtitle: '$7.5/month'
        },
        {
          title: 'Enterprise',
          subtitle: '$16/month'
        }
      ],
      rows: [
        {
          pro: true,
          starter: true,
          enterprise: true,
          feature: '14-days free trial'
        },
        {
          pro: false,
          starter: false,
          enterprise: true,
          feature: 'No user limit'
        },
        {
          pro: true,
          starter: false,
          enterprise: true,
          feature: 'Product Support'
        },
        {
          starter: false,
          enterprise: true,
          pro: 'Add-On Available',
          feature: 'Email Support'
        },
        {
          pro: true,
          starter: false,
          enterprise: true,
          feature: 'Integrations'
        },
        {
          starter: false,
          enterprise: true,
          pro: 'Add-On Available',
          feature: 'Removal of Front branding'
        },
        {
          pro: false,
          starter: false,
          enterprise: true,
          feature: 'Active maintenance & support'
        },
        {
          pro: false,
          starter: false,
          enterprise: true,
          feature: 'Data storage for 365 days'
        }
      ]
    }
  }

  // const res = await axios.get('/pages/pricing')
  // const data: PricingDataType = res.data

  return {
    props: {
      tab: params?.tab,
      apiPricingPlanData: data.pricingPlans
    }
  }
}

export default AccountSettingsTab
