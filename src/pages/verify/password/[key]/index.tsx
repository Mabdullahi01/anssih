import { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useAxios } from 'src/hooks/useAxios'
import { useRouter } from 'next/router'
import endpoints from 'src/configs/endpoints'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import Icon from 'src/@core/components/icon'

const Password = () => {
  const router = useRouter()
  const { isReady, query } = router
  const [success, setSuccess] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (!isReady) {
      return
    }
    useAxios
      .get(endpoints.verifyPasswordUrl + `/${query.key}`)
      .then(res => {
        setSuccess(true)
        setId(res.data.data.scholar.id)
        toast.success(res.data.message)
        setMessage(res.data.message)
      })
      .catch(function (err) {
        setSuccess(false)
        if (!!err.response?.data?.reason) {
          setMessage(err.response.data.reason)
        } else {
          setMessage('Verification failed please try again')
        }
      })
  }, [isReady, query.key])

  return (
    <>
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
        {success ? <Typography sx={{ mb: 3 }}>Verification successful</Typography> : null}
        <Typography sx={{ mb: 3 }}>{message}</Typography>
        {success ? (
          <Link
            href={{
              pathname: '/reset-password',
              query: {
                id: id
              }
            }}
          >
            <Button sx={{ mb: 8 }} color='success' variant='contained'>
              Click here to enter a new password
            </Button>
          </Link>
        ) : null}
      </Box>
    </>
  )
}

Password.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Password.guestGuard = true

export default Password
