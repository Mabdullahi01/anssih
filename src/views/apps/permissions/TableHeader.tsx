// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, handleFilter } = props

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search Permission'
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
    </>
  )
}

export default TableHeader
