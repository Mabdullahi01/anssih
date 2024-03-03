// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { PricingPlanType } from 'src/@core/components/plan-details/types'

// ** Demo Components
import BillingAddressCard from 'src/views/pages/account/billing/BillingAddressCard'

const TabBilling = ({}: { apiPricingPlanData: PricingPlanType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <BillingAddressCard />
      </Grid>
    </Grid>
  )
}

export default TabBilling
