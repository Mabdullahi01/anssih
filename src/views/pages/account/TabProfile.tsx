/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, ElementType, ChangeEvent, forwardRef, Ref } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** hooks

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { useAxios } from 'src/hooks/useAxios'
import Cleave from 'cleave.js/react'

interface Data {
  id: number | undefined
  title: string | undefined
  email: string | undefined
  city: string | undefined
  lastName: string | undefined
  firstName: string | undefined
  university: string | undefined
  middleName: string | undefined
  phone: string | undefined
  course: string | undefined
  level: string | undefined
  graduationDate: string | undefined
}

const schema = yup.object().shape({
  email: yup.string().email().required()
})

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: 4,
  marginRight: theme.spacing(5)
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const CleaveInput = forwardRef(({ ...props }: any, ref: Ref<any>) => {
  const { options, inputRef, ...other } = props

  return <Cleave {...other} ref={inputRef} options={options} />
})

const TabAccount = () => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [userInput, setUserInput] = useState<string>('yes')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })

  const { user, setUser } = useAuth()

  const defaultValues: Data = {
    id: user?.id,
    title: user?.title,
    city: user?.city,
    phone: user?.phone,
    lastName: user?.lastName,
    firstName: user?.firstName,
    email: user?.email,
    middleName: user?.middleName,
    university: user?.university,
    course: user?.course,
    graduationDate: user?.graduationDate,
    level: user?.level
  }

  const {
    control: control2,
    reset: reset,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 }
  } = useForm({ defaultValues: defaultValues, resolver: yupResolver(schema) })

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  const onSubmit = () => setOpen(true)

  const handleConfirmation = (value: string) => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const handleImageUpload = async (file: ChangeEvent) => {
    try {
      const { files } = file.target as HTMLInputElement
      if (files && files.length !== 0) {
        const formData = new FormData()
        formData.append('image', files[0])
        useAxios
          .patch('/scholar/update/image', formData)
          .then(res => {
            setUser({
              ...res.data.data.scholar,
              imageUrl: `${res.data.data.scholar.imageUrl}?time${new Date().getTime()}`
            })
            toast.success(res.data.message)
          })
          .catch(function (err) {
            if (!!err.response?.data?.reason) {
              toast.error(err.response.data.reason)
            }
          })
      }
    } catch (error) {
      toast.error('Error with picture upload, please try again.')
    }
  }
  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/images/avatars/1.png')
  }

  function onSubmitUpdate(formData: Data) {
    auth.update(formData)
  }

  return (
    <Grid container spacing={6}>
      {/* Account Details Card */}
      <Grid item xs={12}>
        <Card>
          <form onSubmit={handleSubmit2(onSubmitUpdate)}>
            <CardContent sx={{ pb: theme => `${theme.spacing(10)}` }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={user?.imageUrl !== null ? user?.imageUrl : imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      accept='image/png, image/jpeg'
                      onChange={handleImageUpload}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                    Reset
                  </ResetButtonStyled>
                  <Typography variant='caption' sx={{ mt: 4, display: 'block', color: 'text.disabled' }}>
                    Allowed PNG or JPEG. Max size of 800K.
                  </Typography>
                </div>
              </Box>
            </CardContent>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='firstName'
                      control={control2}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          fullWidth
                          label='First Name'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors2.firstName)}
                          placeholder='John'
                        />
                      )}
                    />
                    {errors2.firstName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors2.firstName.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='lastName'
                      control={control2}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          fullWidth
                          label='Last Name'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors2.lastName)}
                          placeholder='Doe'
                        />
                      )}
                    />
                    {errors2.middleName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors2.middleName.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='middleName'
                      control={control2}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          fullWidth
                          label='Middle Name'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors2.middleName)}
                          placeholder='Michael'
                        />
                      )}
                    />
                    {errors2.middleName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors2.middleName.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='email'
                      control={control2}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          fullWidth
                          label='Email'
                          type='email'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors2.email)}
                          placeholder='john.doe@example.com'
                        />
                      )}
                    />
                    {errors2.email && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors2.email.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='course'
                      control={control2}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          fullWidth
                          label='Course'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors2.course)}
                          placeholder='Medicine'
                        />
                      )}
                    />
                    {errors2.course && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors2.course.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='level'
                      control={control2}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          fullWidth
                          label='Level'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors2.university)}
                          placeholder='6th Semester'
                        />
                      )}
                    />
                    {errors2.level && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors2.level.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='university'
                      control={control2}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          fullWidth
                          label='University'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors2.university)}
                          placeholder='University of Budapest...'
                        />
                      )}
                    />
                    {errors2.university && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors2.university.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='graduationDate'
                      control={control2}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          fullWidth
                          label='Graduation date on award letter'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors2.university)}
                          placeholder='20th July 2025'
                        />
                      )}
                    />
                    {errors2.graduationDate && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors2.graduationDate.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='phone'
                      control={control2}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          fullWidth
                          label='Phone number'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors2.phone)}
                          placeholder='20 555 0111'
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>HU (+36)</InputAdornment>,
                            inputComponent: CleaveInput
                          }}
                          inputProps={{
                            options: {
                              blocks: [2, 3, 4],
                              uppercase: true
                            }
                          }}
                        />
                      )}
                    />
                    {errors2.phone && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors2.phone.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='city'
                      control={control2}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          fullWidth
                          label='City'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors2.city)}
                          placeholder='Budapest'
                        />
                      )}
                    />
                    {errors2.city && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors2.city.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                    Save Changes
                  </Button>
                  <Button type='reset' variant='outlined' color='secondary' onClick={() => reset(defaultValues)}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>

      {/* Delete Account Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Delete Account' />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <FormControl>
                  <Controller
                    name='checkbox'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormControlLabel
                        label='I confirm my account deletion'
                        sx={errors.checkbox ? { '& .MuiTypography-root': { color: 'error.main' } } : null}
                        control={
                          <Checkbox
                            {...field}
                            size='small'
                            name='validation-basic-checkbox'
                            sx={errors.checkbox ? { color: 'error.main' } : null}
                          />
                        }
                      />
                    )}
                  />
                  {errors.checkbox && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-checkbox'>
                      Please confirm you want to delete account
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Button variant='contained' color='error' type='submit' disabled={errors.checkbox !== undefined}>
                Delete Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Delete Account Dialogs */}
      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(6)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 6, color: 'warning.main' }
            }}
          >
            <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
            <Typography>Are you sure you would like to delete your account?</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleConfirmation('yes')}>
            Yes
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth maxWidth='xs' open={secondDialogOpen} onClose={handleSecondDialogClose}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(6)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 8,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon
              fontSize='5.5rem'
              icon={userInput === 'yes' ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
            />
            <Typography variant='h4' sx={{ mb: 5 }}>
              {userInput === 'yes' ? 'Deleted!' : 'Cancelled'}
            </Typography>
            <Typography>
              {userInput === 'yes' ? 'Your account has been deleted successfully.' : 'Deletion cancelled!!'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default TabAccount
