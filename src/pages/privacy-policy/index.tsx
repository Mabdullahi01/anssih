// ** MUI Imports
import Grid from '@mui/material/Grid'
import { ReactNode } from 'react'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import TypographyHeadings from 'src/views/cards/TypographyHeadings'

const PrivacyPolicy = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TypographyHeadings />
      </Grid>
    </Grid>
  )
}

PrivacyPolicy.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

PrivacyPolicy.guestGuard = true

export default PrivacyPolicy
