// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
  title: string
  post: string
  username: string
  userImageUrl: string
  likes: number
}

const PostCard = (props: Props) => {
  return (
    <Card sx={{ border: 0, boxShadow: 0 }}>
      <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography variant='h6' sx={{ display: 'flex', mb: 2.75, alignItems: 'center', '& svg': { mr: 2.5 } }}>
          <Icon icon='maki:post' />
          {props.title}
        </Typography>
        <Typography variant='body2' sx={{ mb: 3 }} style={{ wordWrap: 'break-word' }}>
          {props.post}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar alt='Eugene Clarke' src={props.userImageUrl} sx={{ width: 34, height: 34, mr: 2.75 }} />
            <Typography variant='body2'>{props.username}</Typography>
          </Box>
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, '& svg': { mr: 1.25 } }}>
              <Icon icon='mdi:heart' />
              <Typography variant='body2' sx={{ color: 'common.white' }}>
                {props.likes}
              </Typography>
            </Box>
          </Box> */}
        </Box>
      </CardContent>
    </Card>
  )
}

export default PostCard
