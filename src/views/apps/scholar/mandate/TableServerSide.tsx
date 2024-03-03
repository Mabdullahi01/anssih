// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import ServerSideToolbar from 'src/views/apps/scholar/mandate/ServerSideToolbar'

// ** Utils Import
import { DataGridRowType } from 'src/context/types'

import { AppDispatch, RootState } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/mandate'
import { ThemeColor } from 'src/@core/layouts/types'
import { getInitials } from 'src/@core/utils/get-initials'
import toast from 'react-hot-toast'

type SortType = 'asc' | 'desc' | undefined | null

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  return (
    <CustomAvatar
      skin='light'
      color={color as ThemeColor}
      sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
    >
      {getInitials(row.fullName ? row.fullName : 'John Doe')}
    </CustomAvatar>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 290,
    field: 'fullName',
    headerName: 'Name',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.fullName}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.125,
    field: 'email',
    minWidth: 300,
    headerName: 'Email',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.email}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'course',
    minWidth: 300,
    headerName: 'Course',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.course}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'university',
    minWidth: 500,
    headerName: 'University',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.university}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'iban',
    minWidth: 300,
    headerName: 'IBAN',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.iban}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 150,
    headerName: 'Bank',
    field: 'bank',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.bank}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'swiftCode',
    minWidth: 120,
    headerName: 'Swift code',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.swiftCode}
      </Typography>
    )
  },
  {
    flex: 0.175,
    type: 'date',
    minWidth: 150,
    headerName: 'Graduation',
    field: 'graduation',
    valueGetter: params => new Date(params.value),
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.graduation}
      </Typography>
    )
  }
]

const TableServerSide = () => {
  // ** States
  const [total, setTotal] = useState<number>(0)
  const [sort, setSort] = useState<SortType>('asc')
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('fullName')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const store = useSelector((state: RootState) => state.mandate)

  function loadServerRows(currentPage: number, data: DataGridRowType[]) {
    return data.slice(currentPage * paginationModel.pageSize, (currentPage + 1) * paginationModel.pageSize)
  }

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchData())
      .unwrap()
      .then(res => {
        setTotal(res.total)
        setRows(res.allData)
      })
      .catch(function (err) {
        if (!!err.response?.data?.reason) {
          toast.error(err.response.data.reason)
        }
      })
  }, [dispatch])

  const fetchTableData = useCallback(
    async (sort: SortType, q: string, column: string) => {
      const queryLowered = q.toLowerCase()

      // @ts-ignore
      const data = [...store.allData]
      const dataAsc = data.sort((a, b) => (a[column] < b[column] ? -1 : 1))

      const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()

      const filteredData = dataToFilter.filter(
        (item: DataGridRowType) =>
          item.id.toString().toLowerCase().includes(queryLowered) ||
          item.fullName?.toLowerCase().includes(queryLowered) ||
          item.iban?.toLowerCase().includes(queryLowered) ||
          item.email?.toLowerCase().includes(queryLowered) ||
          item.course?.toLowerCase().includes(queryLowered) ||
          item.bank?.toLowerCase().includes(queryLowered) ||
          item.university?.toLowerCase().includes(queryLowered) ||
          item.amount?.toString().toLowerCase().includes(queryLowered) ||
          item.graduation?.toString().toLowerCase().includes(queryLowered) ||
          item.swiftCode?.toLowerCase().includes(queryLowered)
      )

      setTotal(filteredData.length)
      setRows(loadServerRows(paginationModel.page, filteredData))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel]
  )

  useEffect(() => {
    fetchTableData(sort, searchValue, sortColumn)
  }, [fetchTableData, searchValue, sort, sortColumn])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('full_name')
    }
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    fetchTableData(sort, value, sortColumn)
  }

  return (
    <Card>
      <CardHeader title='Joy is coming' />
      <DataGrid
        autoHeight
        pagination
        rows={rows}
        rowCount={total}
        columns={columns}
        checkboxSelection
        sortingMode='server'
        paginationMode='server'
        pageSizeOptions={[7, 10, 25, 50, 100]}
        paginationModel={paginationModel}
        onSortModelChange={handleSortModel}
        slots={{ toolbar: ServerSideToolbar }}
        onPaginationModelChange={setPaginationModel}
        slotProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchValue,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

export default TableServerSide
