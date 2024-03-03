// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { useAuth } from 'src/hooks/useAuth'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 13,
  bottom: 0,
  height: 200,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    height: 165,
    position: 'static'
  }
}))

const CardWelcomeBack = () => {
  const { user } = useAuth()

  return (
    <Card sx={{ position: 'relative', overflow: 'visible', mt: { xs: 0, sm: 14.4, md: 0 } }}>
      <CardContent sx={{ p: theme => theme.spacing(7.25, 7.5, 7.75, 7.5) }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' sx={{ mb: 6.5 }}>
              Welcome back{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {user?.firstName}
              </Box>
              ! 🥳
            </Typography>
            <Typography variant='body2'>Welcome to your payment portal</Typography>
            <Typography variant='body2'>Please update your profile and the Admins will verify your account.</Typography>
          </Grid>
          <StyledGrid item xs={12} sm={6}>
            <Img alt='Welcome back John' src='/images/cards/illustration-john.png' />
          </StyledGrid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardWelcomeBack
