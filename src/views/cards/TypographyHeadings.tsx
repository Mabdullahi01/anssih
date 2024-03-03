// ** MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'

const DemoGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`
  }
}))

const TypographyHeadings = () => {
  return (
    <Card>
      <CardHeader title='Privacy Policy & Terms' />
      <CardContent>
        <Grid container spacing={6}>
          <DemoGrid item xs={12} sm={10}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Privacy Policy of Association Of Nigerian Scholarship Students In Hungary (ANSSIH)
            </Typography>
            <Typography variant='body2'>
              Association Of Nigerian Scholarship Students In Hungary (ANSSIH) operates the www.anssihweb.com website,
              which provides the SERVICE.
            </Typography>
            <Typography variant='body2'>
              This page is used to inform website visitors regarding our policies with the collection, use, and
              disclosure of Personal Information if anyone decided to use our Service, the ANSSIH Web.
            </Typography>
            <Typography variant='body2'>
              If you choose to use our Service, then you agree to the collection and use of information in relation with
              this policy.
            </Typography>
            <Typography variant='body2'>
              The Personal Information that we collect are used for providing and improving the Service. We will not use
              or share your information with anyone except as described in this Privacy Policy.
            </Typography>
          </DemoGrid>

          <DemoGrid item xs={12} sm={10}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Information Collection and Use
            </Typography>
            <Typography variant='body2'>
              For a better experience while using our Service, we may require you to provide us with certain personally
              identifiable information, including but not limited to your name, phone number, and email. The information
              that we collect will be used to contact or identify you.
            </Typography>
          </DemoGrid>

          <DemoGrid item xs={12} sm={10}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Location data
            </Typography>
            <Typography variant='body2'>
              We want to inform you that whenever you visit our Service, we collect information that your browser sends
              to us. This may include information such as your computer’s Internet Protocol (“IP”) address, browser
              version, pages of our Service that you visit, the time and date of your visit and other statistics.
            </Typography>
          </DemoGrid>

          <DemoGrid item xs={12} sm={10}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Cookies
            </Typography>
            <Typography variant='body2'>
              Our website uses these “cookies” to collection information and to improve our Service. We use these
              cookies as part of our authorization and authentication
            </Typography>
          </DemoGrid>

          <DemoGrid item xs={12} sm={10}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Policy change
            </Typography>
            <Typography variant='body2'>
              We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically
              for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These
              changes are effective immediately, after they are posted on this page.
            </Typography>
          </DemoGrid>

          <DemoGrid item xs={12} sm={10}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Contact us
            </Typography>
            <Typography variant='body2'>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at
              official.anssih@gmail.com
            </Typography>
          </DemoGrid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TypographyHeadings
