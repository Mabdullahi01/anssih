// ** React Imports
import { useEffect, useCallback, useState, FormEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
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

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { UsersType } from 'src/types/apps/userTypes'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  TextField
} from '@mui/material'
import { useAxios } from 'src/hooks/useAxios'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

interface CellType {
  row: UsersType
}

// ** Vars
const userRoleObj: UserRoleType = {
  Admin: { icon: 'mdi:laptop', color: 'error.main' },
  Author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  Editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  Maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  Scholar: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const userStatusObj: UserStatusType = {
  Active: 'success',
  Pending: 'warning',
  Inactive: 'secondary'
}

// ** renders client column
const renderClient = (row: UsersType) => {
  if (row.imageUrl.length) {
    return <CustomAvatar src={row.imageUrl} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar skin='light' color={row.avatarColor} sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}>
        {getInitials(row.firstName ? row.firstName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'fullName',
    headerName: 'User',
    renderCell: ({ row }: CellType) => {
      const { firstName, lastName, verified, notLocked } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography
              noWrap
              variant='body2'
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                textDecoration: 'none'
              }}
            >
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
    minWidth: 250,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography variant='body2' noWrap>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 150,
    headerName: 'Role',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, color: userRoleObj[row.role].color } }}>
          <Icon icon={userRoleObj[row.role].icon} fontSize={20} />
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.role}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
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
  const [value, setValue] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [rows, setRows] = useState<UsersType[]>([])
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

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
        }
      })
  }, [dispatch])

  const fetchTableData = useCallback(
    async (q: string) => {
      const queryLowered = q.toLowerCase()

      const filteredScholars = store.allScholars.filter(
        (user: UsersType) =>
          (user.lastName + ' ' + user.firstName).toLowerCase().includes(queryLowered) ||
          user.role?.toLowerCase().includes(queryLowered) ||
          user.email?.toLowerCase().includes(queryLowered) ||
          user.status?.toLowerCase().includes(queryLowered)
      )

      setRows(filteredScholars)
    },
    [store.allScholars]
  )

  useEffect(() => {
    fetchTableData(value)
  }, [fetchTableData, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleEditPermission = (role: string, email: string) => {
    setRole(role)
    setEmail(email)
    setEditDialogOpen(true)
  }

  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    useAxios
      .patch('/scholar/update/role/' + email + '/' + role)
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
      flex: 0.15,
      minWidth: 115,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            disabled={user?.role !== 'Admin' ? true : false}
            onClick={() => handleEditPermission(row.role, row.email)}
          >
            <Icon icon='mdi:pencil-outline' fontSize={20} />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
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
            Edit Role
          </Typography>
          <Typography variant='body2'>Edit scholar role.</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Alert severity='warning' sx={{ maxWidth: '500px' }}>
            <AlertTitle>Warning!</AlertTitle>
            By editing the scholar role, you might break the system permissions functionality. Please ensure you're
            absolutely certain before proceeding.
          </Alert>

          <Box component='form' sx={{ mt: 8 }} onSubmit={onSubmit}>
            <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'column', flexWrap: ['wrap', 'nowrap'] }}>
              <TextField
                fullWidth
                size='medium'
                value={role}
                label='Role Name'
                sx={{ mr: [0, 4], mb: [3, 5] }}
                placeholder='Enter role Name'
                onChange={e => setRole(e.target.value)}
              />
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
              <Button type='submit' variant='contained'>
                Update
              </Button>
            </FormGroup>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UserList
