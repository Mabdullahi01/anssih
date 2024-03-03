// ** React Imports
import { ReactNode } from 'react'
import Image from 'next/image'

// ** MUI Components
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useAuth } from 'src/hooks/useAuth'

// ** Styled Components
const VerifyEmailIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const VerifyEmailIllustration = styled('img')(({ theme }) => ({
  maxWidth: '46rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '35rem'
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  bottom: 0,
  left: '1.875rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    left: 0
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const VerifyEmail = () => {
  // ** Hooks
  const theme = useTheme()
  const auth = useAuth()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const imageSource =
    skin === 'bordered' ? 'auth-v2-verify-email-illustration-bordered' : 'auth-v2-verify-email-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <VerifyEmailIllustrationWrapper>
            <VerifyEmailIllustration
              alt='verify-email-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </VerifyEmailIllustrationWrapper>
          <FooterIllustrationsV2 image={<TreeIllustration alt='tree' src='/images/pages/tree-2.png' />} />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 12,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                mb: 5
              }}
            >
              <Image
                priority
                src={'/images/logos/anssihlogo.svg'}
                alt='Anssih'
                height={50}
                width={50}
                style={{
                  objectFit: 'cover',
                  borderRadius: '100px'
                }}
              />
              <Typography
                variant='caption'
                sx={{
                  mt: 3,
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 650,
                  fontSize: '1.0rem !important'
                }}
              >
                {themeConfig.templateName}
                <Typography variant='caption' sx={{ mb: 2, display: 'block' }}>
                  Motto: <strong>Uniting the scholars.</strong>
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ mb: 8 }}>
              <Typography variant='h5' sx={{ mb: 2 }}>
                Verify your email ✉️
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Account activation link sent to your email address: <strong>{auth.user?.email}</strong> Please follow
                the link inside to continue. Please also check your spam folder.
              </Typography>
            </Box>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

VerifyEmail.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default VerifyEmail
