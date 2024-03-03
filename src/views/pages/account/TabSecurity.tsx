// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'

// ** Demo Components
import ChangePasswordCard from 'src/views/pages/account/security/ChangePasswordCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useEffect } from 'react'
import { fetchData } from 'src/store/apps/events'
import { ThemeColor } from 'src/@core/layouts/types'

interface RecentDeviceDataType {
  id: number
  type: string
  createdAt: string
  device: string
  ipAddress: string
  browser: string
  description: string
}

interface browserProps {
  device: string
  browser: string
}

interface ActivityType {
  [key: string]: ThemeColor
}

const activityObj: ActivityType = {
  PROFILE_PICTURE_UPDATE: 'success',
  LOGIN_ATTEMPT_SUCCESS: 'success',
  LOGIN_ATTEMPT: 'warning',
  LOGIN_ATTEMPT_FAILURE: 'error',
  MFA_UPDATE: 'success',
  ACCOUNT_SETTINGS_UPDATE: 'success',
  PASSWORD_UPDATE: 'secondary',
  ROLE_UPDATE: 'success',
  PROFILE_UPDATE: 'success'
}

const browserIcon = (props: browserProps) => {
  if (props?.browser?.includes('Mac OS')) {
    return (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'success.main' } }}>
        <Icon icon='mdi:apple' fontSize={20} />
      </Box>
    )
  } else if (props?.browser?.includes('Windows') || props.device.includes('Windows')) {
    return (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'success.main' } }}>
        <Icon icon='mdi:microsoft-windows' fontSize={20} />
      </Box>
    )
  } else if (props?.browser?.includes('Android') || props.device.includes('Android')) {
    return (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'success.main' } }}>
        <Icon icon='mdi:android' fontSize={20} />
      </Box>
    )
  } else if (props?.browser?.includes('iPhone') || props.device.includes('iPhone')) {
    return (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'success.main' } }}>
        <Icon icon='mdi:cellphone' fontSize={20} />
      </Box>
    )
  } else {
    return (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'success.main' } }}>
        <Icon icon='mdi:cellphone' fontSize={20} />
      </Box>
    )
  }
}

const TabSecurity = () => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.events)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const events: RecentDeviceDataType[] = store.events

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ChangePasswordCard />
      </Grid>
      {/* <Grid item xs={12}>
        {user?.usingMfa ? <DisableTwoFactorAuthentication /> : <TwoFactorAuthentication />}
      </Grid> */}

      {/* Recent Devices Card*/}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Recent Devices' />
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: 'customColors.tableHeaderBg' }}>
                <TableRow>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Browser</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Device</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>IP Address</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Time</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Activity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {browserIcon({ browser: row.browser, device: row.device })}
                        <Typography sx={{ whiteSpace: 'nowrap' }}>{row.browser}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }}>
                        {row.device}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }}>
                        {row.ipAddress}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }}>
                        {row.createdAt}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }}>
                        <CustomChip
                          skin='light'
                          size='small'
                          label={row.type.replace(/_/g, ' ')}
                          color={activityObj[row.type]}
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}
export default TabSecurity
