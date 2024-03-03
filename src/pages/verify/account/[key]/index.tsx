import { ReactNode, useEffect, useState } from 'react'

import { useAxios } from 'src/hooks/useAxios'
import { useRouter } from 'next/router'
import endpoints from 'src/configs/endpoints'
import Box from '@mui/material/Box'
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import Icon from 'src/@core/components/icon'
import { Button, Typography } from '@mui/material'

const Account = () => {
  const router = useRouter()
  const { isReady, query } = router
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (!isReady) {
      return
    }
    useAxios
      .get(endpoints.verifyAccountUrl + `/${query.key}`)
      .then(res => {
        setSuccess(true)
        setMessage(res.data.message)
      })
      .catch(function (err) {
        setSuccess(false)
        if (!!err.response?.data?.reason) {
          setMessage(err.response.data.reason)
        } else {
          setMessage('Verification failed please click on the link again')
        }
      })
  }, [isReady, query.key])

  return (
    <Box
      sx={{
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        marginTop: 10,
        '& svg': { mb: 2 }
      }}
    >
      <Icon icon={success ? 'mdi:check-circle-outline' : 'mdi:close'} fontSize='2rem' />
      <Typography sx={{ mb: 4, fontWeight: 600 }}>{success ? 'Success' : 'Error'}</Typography>
      <Typography sx={{ mb: 3 }}>{message}</Typography>
      {success ? (
        <Button sx={{ mb: 8 }} color='success' variant='contained' onClick={() => router.push('/login')}>
          Log in
        </Button>
      ) : null}
    </Box>
  )
}

Account.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

Account.guestGuard = true

export default Account
