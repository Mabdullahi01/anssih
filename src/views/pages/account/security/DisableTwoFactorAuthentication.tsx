// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useAxios } from 'src/hooks/useAxios'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'

const DisableTwoFactorAuthenticationCard = () => {
  const { setUser } = useAuth()

  const toggle2FADialog = () => {
    useAxios
      .patch('/scholar/disable/mfa')
      .then(res => {
        setUser(res.data.data.scholar)
        toast.success(res.data.message)
      })
      .catch(function (err) {
        if (!!err.response?.data?.reason) {
          toast.error(err.response.data.reason)
        }
      })
  }

  return (
    <>
      <Card>
        <CardHeader title='Two-steps verification' />
        <CardContent>
          <Typography sx={{ mb: 4, color: 'text.secondary' }}>
            Two factor authentication is enabled for this account.
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            Two-factor authentication adds an additional layer of security to your account by requiring more than just a
            password to log in.{' '}
            <Box
              href='/'
              component={'a'}
              onClick={e => e.preventDefault()}
              sx={{ textDecoration: 'none', color: 'primary.main' }}
            >
              Learn more.
            </Box>
          </Typography>
          <Button variant='contained' color='error' type='submit' onClick={toggle2FADialog}>
            Disable two-factor authentication
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default DisableTwoFactorAuthenticationCard
