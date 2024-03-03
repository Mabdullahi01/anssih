// ** React Imports
import { useState, useEffect, useCallback, FormEvent } from 'react'

// ** Next Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import VerifiedIcon from '@mui/icons-material/Verified'
import LockIcon from '@mui/icons-material/Lock'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/apps/scholars'

// ** Third Party Components

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/scholar/list/TableHeader'
import { Alert, AlertTitle, Button, Dialog, DialogContent, DialogTitle, FormGroup, TextField } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { useAxios } from 'src/hooks/useAxios'
import toast from 'react-hot-toast'

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: UsersType
}

const userStatusObj: UserStatusType = {
  Active: 'success',
  Graduated: 'warning',
  Inactive: 'secondary'
}

// ** renders client column
const renderClient = (row: UsersType) => {
  if (row.imageUrl.length) {
    return <CustomAvatar src={row.imageUrl} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
      >
        {getInitials(row.firstName)}
      </CustomAvatar>
    )
  }
}

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 300,
    field: 'Scholar',
    headerName: 'Scholar',
    renderCell: ({ row }: CellType) => {
      const { firstName, lastName, verified, notLocked } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap variant='body2'>
              {lastName + ' ' + firstName}
            </Typography>
            {verified ? <VerifiedIcon sx={{ fontSize: 15 }} color='success' /> : null}
            {notLocked === false ? <LockIcon sx={{ fontSize: 15 }} color='primary' /> : null}
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 300,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 400,
    field: 'university',
    headerName: 'University',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.university}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'city',
    headerName: 'City',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.city}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'course',
    headerName: 'Course',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.course}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'level',
    headerName: 'Level',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.level}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'graduation',
    headerName: 'Graduation',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.graduationDate}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.status}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  }
]

const UserList = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [rows, setRows] = useState<UsersType[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [locked, setLocked] = useState<string>(' ')
  const [verified, setVerified] = useState<string>(' ')
  const [email, setEmail] = useState<string>('')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useAuth()
  const store = useSelector((state: RootState) => state.scholars)

  useEffect(() => {
    dispatch(fetchData())
      .unwrap()
      .then(res => {
        setRows(res.allScholars)
      })
      .catch(function (err) {
        if (!!err.response?.data?.reason) {
          toast.error(err.response.data.reason)
        } else {
          toast.error('An error occurred please contact Admin')
        }
      })
  }, [dispatch])

  const fetchTableData = useCallback(
    async (role: string, q: string, status: string, city: string) => {
      const queryLowered = q.toLowerCase()

      const filteredScholars = store.allScholars.filter(
        (user: UsersType) =>
          ((user.lastName + ' ' + user.firstName).toLowerCase().includes(queryLowered) ||
            user.role?.toLowerCase().includes(queryLowered) ||
            user.email?.toLowerCase().includes(queryLowered) ||
            user.university?.toLowerCase().includes(queryLowered)) &&
          user.role === (role || user.role) &&
          user.city === (city || user.city) &&
          user.status === (status || user.status)
      )

      setRows(filteredScholars)
    },
    [store.allScholars]
  )

  useEffect(() => {
    fetchTableData(role, value, status, city)
  }, [fetchTableData, role, value, status, city])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value)
  }, [])

  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setCity(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const handleEdit = (email: string, locked: boolean, verified: boolean) => {
    setLocked(locked ? 'true' : 'false')
    setVerified(verified ? 'true' : 'false')
    setEmail(email)
    setEditDialogOpen(true)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const verify = verified === 'true' ? true : false
    const lock = locked === 'true' ? true : false

    useAxios
      .patch('/scholar/update/settings', { email, verify, lock })
      .then(res => {
        toast.success(res.data.message)
      })
      .catch(function (err) {
        if (!!err.response?.data?.reason) {
          toast.error(err.response.data.reason)
        }
      })

    setEditDialogOpen(false)
    e.preventDefault()
  }

  const allColumns: GridColDef[] = [
    ...columns,
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            disabled={user?.role !== 'Admin' ? true : false}
            onClick={() => handleEdit(row.email, row.enabled, row.verified)}
          >
            <Icon icon='mdi:pencil-outline' fontSize={20} />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    onChange={handleRoleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='Admin'>Admin</MenuItem>
                    <MenuItem value='Author'>Author</MenuItem>
                    <MenuItem value='Editor'>Editor</MenuItem>
                    <MenuItem value='Maintainer'>Maintainer</MenuItem>
                    <MenuItem value='Scholar'>Scholar</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select City</InputLabel>
                  <Select
                    fullWidth
                    value={city}
                    id='select-city'
                    label='Select City'
                    labelId='city-select'
                    onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Select City' }}
                  >
                    <MenuItem value=''>Select City</MenuItem>
                    <MenuItem value='Budapest'>Budapest</MenuItem>
                    <MenuItem value='Debrecen'>Debrecen</MenuItem>
                    <MenuItem value='Pecs'>Pecs</MenuItem>
                    <MenuItem value='Gyor'>Gyor</MenuItem>
                    <MenuItem value='Miskolc'>Miskolc</MenuItem>
                    <MenuItem value='Godollo'>Godollo</MenuItem>
                    <MenuItem value='Szeged'>Szeged</MenuItem>
                    <MenuItem value='Sopron'>Sopron</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='Active'>Active</MenuItem>
                    <MenuItem value='Graduated'>Graduated</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            rows={rows}
            columns={allColumns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <Dialog maxWidth='sm' fullWidth onClose={handleDialogToggle} open={editDialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Verify/Lock scholar
          </Typography>
          <Typography variant='body2'>Only Admins can perform this action</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Alert severity='warning' sx={{ maxWidth: '500px' }}>
            <AlertTitle>Warning!</AlertTitle>
            Please only verify scholars when their documents has been checked because only verified scholars can
            register for payment. Graduated scholars should not be verified. Locked accounts will lose access to the web
            application.
          </Alert>

          <Box component='form' sx={{ mt: 8 }} onSubmit={onSubmit}>
            <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'column', flexWrap: ['wrap', 'nowrap'] }}>
              <TextField
                fullWidth
                size='medium'
                disabled
                value={email}
                label='Scholar email'
                sx={{ mr: [0, 4], mb: [3, 5] }}
                placeholder='Enter scholar email'
                inputProps={{ readOnly: true }}
                onChange={e => setEmail(e.target.value)}
              />
              <FormControl fullWidth sx={{ mr: [0, 4], mb: [3, 5] }}>
                <InputLabel id='verify'>Verify scholar ?</InputLabel>
                <Select
                  fullWidth
                  value={verified}
                  id='select-verify'
                  label='Verify scholar ?'
                  labelId='verify-select'
                  onChange={e => setVerified(e.target.value)}
                  inputProps={{ placeholder: 'Verify account ?' }}
                >
                  <MenuItem value='true'>True</MenuItem>
                  <MenuItem value='false'>False</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mr: [0, 4], mb: [3, 5] }}>
                <InputLabel id='enable'>Lock scholar ?</InputLabel>
                <Select
                  fullWidth
                  value={locked}
                  id='select-lock'
                  label='Lock scholar ?'
                  labelId='lock-select'
                  onChange={e => setLocked(e.target.value)}
                  inputProps={{ placeholder: 'Enable account ?' }}
                >
                  <MenuItem value='true'>True</MenuItem>
                  <MenuItem value='false'>False</MenuItem>
                </Select>
              </FormControl>

              <Button type='submit' variant='contained'>
                Update
              </Button>
            </FormGroup>
          </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default UserList
