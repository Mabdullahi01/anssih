// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(16)
  }
}))

const ComingSoon = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <BoxWrapper>
          <Box sx={{ mb: 5.75, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
              We are launching soon 🚀
            </Typography>
            <Typography variant='body2'>
              Our market place is opening soon. Please keep in touch and you will get notified when it&prime;s ready!
            </Typography>
          </Box>
        </BoxWrapper>
        <Img height='487' alt='coming-soon-illustration' src='/images/pages/misc-coming-soon.png' />
      </Box>
      <FooterIllustrations />
    </Box>
  )
}

ComingSoon.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ComingSoon
