// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography, { TypographyProps } from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third party imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useAuth } from 'src/hooks/useAuth'
import emails from 'src/constants/constants'
import toast from 'react-hot-toast'
import { Alert } from '@mui/material'
import useBgColor from 'src/@core/hooks/useBgColor'

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const RegisterIllustration = styled('img')(({ theme }) => ({
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

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { mt: theme.spacing(8) }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({
  firstName: yup.string().min(2).required(),
  lastName: yup.string().min(2).required(),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required.'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match')
})

const defaultValues = {
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  email: ''
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()
  const bgColors = useBgColor()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setChecked(event.target.checked)
  }

  const onSubmit = (data: FormData) => {
    const { firstName, lastName, email, password } = data

    if (checked === false) {
      toast.error('You must agree to privacy policy & terms.')

      return
    }

    if (emails.includes(email.toLowerCase())) {
      auth.register({ firstName, lastName, email, password }, () => {
        setError('root', {
          type: 'manual',
          message: 'Registration not open'
        })
      })
    } else {
      toast.error('Only verified scholars can register to use this platform.')

      return
    }
  }

  const onInvalid = (errors: any) => console.error(errors)

  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt='register-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </RegisterIllustrationWrapper>
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
            <Box sx={{ mb: 6, mt: 6, flexDirection: 'column', pt: 6 }}>
              <TypographyStyled variant='h6'>Adventure starts here 🚀</TypographyStyled>
              <Typography variant='body2'>Join the biggest student community!</Typography>
            </Box>
            <Box>
              <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
                <Typography variant='caption' sx={{ mb: 2, display: 'block', color: 'primary.main' }}>
                  Important: <strong>Your email must be verified to register</strong>
                </Typography>
                <Typography variant='caption' sx={{ display: 'block', color: 'primary.main' }}>
                  Closes: <strong>Registration closes 31st Jan, 2024</strong>
                </Typography>
              </Alert>
            </Box>

            <form id='form' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit, onInvalid)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      label='First Name'
                      onChange={onChange}
                      placeholder='First Name'
                      error={Boolean(errors.firstName)}
                    />
                  )}
                />
                {errors.firstName && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Last Name'
                      onChange={onChange}
                      placeholder='Last Name'
                      error={Boolean(errors.lastName)}
                    />
                  )}
                />
                {errors.lastName && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Email'
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='user@email.com'
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.confirmPassword)}>
                  Confirm password
                </InputLabel>
                <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='Confirm password'
                      onChange={onChange}
                      id='auth-login-v2-confirm-password'
                      error={Boolean(errors.confirmPassword)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmPassword.message}</FormHelperText>
                )}
              </FormControl>
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} />}
                sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                label={
                  <>
                    <Typography variant='body2' component='span'>
                      I agree to{' '}
                    </Typography>
                    <LinkStyled href='/privacy-policy'>privacy policy & terms</LinkStyled>
                  </>
                }
              />
              <Button form='form' fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                Sign up
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2 }}>
                  Already have an account?
                </Typography>
                <Typography variant='body2'>
                  <LinkStyled href='/login'>Sign in instead</LinkStyled>
                </Typography>
              </Box>
              <Divider sx={{ my: theme => `${theme.spacing(5)} !important` }}>or</Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
