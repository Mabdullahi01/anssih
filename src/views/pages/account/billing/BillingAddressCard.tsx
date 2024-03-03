// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

//import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Config
import authConfig from 'src/configs/auth'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { useAuth } from 'src/hooks/useAuth'
import CardWelcomeBack from 'src/views/cards/CardWelcomeBack'
import { useAxios } from 'src/hooks/useAxios'
import toast from 'react-hot-toast'
import Cleave from 'cleave.js/react'
import { Ref, forwardRef } from 'react'

interface Data {
  id: number | undefined
  email: string | undefined
  bank: string | undefined
  amount: number | undefined
  course: string | undefined
  university: string | undefined
  fullName: string | undefined
  iban: string | undefined
  swiftCode: string | undefined
  graduation: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CleaveInput = forwardRef(({ ...props }: any, ref: Ref<any>) => {
  const { options, inputRef, ...other } = props

  return <Cleave {...other} ref={inputRef} options={options} />
})

const BillingAddressCard = () => {
  // ** Hooks
  const { user, mandate, setMandate } = useAuth()

  const defaultValues: Data = {
    id: mandate?.id,
    bank: mandate?.bank,
    course: mandate?.course,
    university: mandate?.university,
    fullName: mandate?.fullName,
    iban: mandate?.iban,
    email: mandate?.email,
    graduation: mandate?.graduation,
    swiftCode: mandate?.swiftCode,
    amount: mandate?.amount
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = (params: Data) => {
    useAxios
      .put(authConfig.updateMandateEndpoint, params)
      .then(res => {
        toast.success(res.data.message)
        setMandate(res.data.data.mandate)
      })
      .catch(function (err) {
        if (!!err.response?.data?.reason) {
          toast.error(err.response.data.reason)
        } else {
          toast.error('An error occurred please reach out to the Admins')
        }
      })
  }

  return (
    <>
      {user?.verified ? (
        <Card>
          <CardHeader title='Bank account information' />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='fullName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Full Name'
                          onChange={onChange}
                          placeholder='Arab Usman'
                          error={Boolean(errors.fullName)}
                        />
                      )}
                    />
                    {errors.fullName && (
                      <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      control={control}
                      name='email'
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          type='email'
                          value={value}
                          disabled
                          onChange={onChange}
                          label='Email'
                          inputProps={{ readOnly: true }}
                          placeholder='arab.usman@example.com'
                          error={Boolean(errors.email)}
                        />
                      )}
                    />
                    {errors.email && (
                      <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='bank'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Bank Name'
                          onChange={onChange}
                          placeholder='OTP Bank'
                          error={Boolean(errors.bank)}
                        />
                      )}
                    />
                    {errors.bank && (
                      <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='swiftCode'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Swift Code'
                          onChange={onChange}
                          placeholder='OTPVHHUHB'
                          error={Boolean(errors.swiftCode)}
                        />
                      )}
                    />
                    {errors.swiftCode && (
                      <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='iban'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='IBAN'
                          onChange={onChange}
                          placeholder='HUXXXXXXXXXXXXXXXXXXX'
                          error={Boolean(errors.iban)}
                          inputProps={{
                            options: {
                              blocks: [4, 4, 4, 4, 4, 4, 4],
                              uppercase: true
                            }
                          }}
                          InputProps={{
                            inputComponent: CleaveInput
                          }}
                        />
                      )}
                    />
                    {errors.iban && (
                      <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='course'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Course'
                          onChange={onChange}
                          placeholder='Engineering'
                          error={Boolean(errors.course)}
                        />
                      )}
                    />
                    {errors.course && (
                      <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='university'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='University'
                          onChange={onChange}
                          placeholder='Debrecen'
                          error={Boolean(errors.university)}
                        />
                      )}
                    />
                    {errors.university && (
                      <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='graduation'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          label='Graduation date on award letter'
                          onChange={onChange}
                          placeholder='20th July 2025'
                          error={Boolean(errors.graduation)}
                        />
                      )}
                    />
                    {errors.graduation && (
                      <FormHelperText sx={{ color: 'error.main' }}>This field is required</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                    Save Changes
                  </Button>
                  <Button variant='outlined' color='secondary' onClick={() => reset(defaultValues)}>
                    Discard
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Grid item xs={12} md={8} sx={{ alignSelf: 'flex-end' }}>
          <CardWelcomeBack />
        </Grid>
      )}
    </>
  )
}

export default BillingAddressCard
