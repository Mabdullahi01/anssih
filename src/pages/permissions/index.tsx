// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/apps/permissions/TableHeader'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { RoleType } from 'src/types/apps/roleType'

// ** Actions Imports
import { fetchData } from 'src/store/apps/roles'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

interface Colors {
  [key: string]: ThemeColor
}

interface CellType {
  row: RoleType
}

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

// ** Vars
const userRoleObj: UserRoleType = {
  Admin: { icon: 'mdi:laptop', color: 'error.main' },
  Author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  Editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  Maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  Scholar: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const colorMapping: Colors = {
  'READ:SCHOLAR': 'info',
  'CREATE:SCHOLAR': 'success',
  'UPDATE:SCHOLAR': 'warning',
  'DELETE:SCHOLAR': 'error',
  'READ:POST': 'info',
  'CREATE:POST': 'success',
  'UPDATE:POST': 'warning',
  'DELETE:POST': 'error'
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.25,
    field: 'role',
    minWidth: 240,
    headerName: 'Role',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, color: userRoleObj[row.name].color } }}>
          <Icon icon={userRoleObj[row.name].icon} fontSize={20} />
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.name}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.35,
    minWidth: 280,
    field: 'permissions',
    headerName: 'Permissions',
    renderCell: ({ row }: CellType) => {
      return row.permission
        .split(',')
        .map((assignee: string, index: number) => (
          <CustomChip
            size='small'
            key={index}
            skin='light'
            color={colorMapping[assignee]}
            label={assignee.replace('-', ' ')}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, '&:not(:last-of-type)': { mr: 3 } }}
          />
        ))
    }
  }
]

const PermissionsTable = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.roles)

  useEffect(() => {
    dispatch(
      fetchData({
        q: value
      })
    )
  }, [dispatch, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Permissions List</Typography>}
            subtitle={
              <Typography variant='body2'>
                List of permissions assigned to each role, please reach out to the admins if you need to update your
                role/permission.
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleFilter={handleFilter} />
            <DataGrid
              autoHeight
              rows={store.filteredRoles}
              columns={defaultColumns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default PermissionsTable
