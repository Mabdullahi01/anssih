// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'

const RolesComponent = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>All scholars with their respective roles</Typography>}
        subtitle={
          <Typography variant='body2'>
            We use these roles to guard the application, please check the permissions for what you're permitted to do
            and reach out to the admins if you need to change your role.
          </Typography>
        }
      />
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default RolesComponent
