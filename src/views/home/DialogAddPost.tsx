// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import { CardActions } from '@mui/material'
import toast from 'react-hot-toast'
import { useAxios } from 'src/hooks/useAxios'
import endpoints from 'src/configs/endpoints'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogAddPost = () => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [post, setPost] = useState<string>('')

  const onSubmit = () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('post', post)

    useAxios
      .post(endpoints.createPost, formData)
      .then(res => {
        toast.success(res.data.message)
      })
      .catch(function (err) {
        if (!!err.response?.data?.reason) {
          toast.error(err.response.data.reason)
        }
      })

    setShow(false)
  }

  return (
    <>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant='contained' sx={{ bottom: 0 }} onClick={() => setShow(true)}>
          Make a Post
        </Button>
      </CardActions>

      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Add a new post
            </Typography>
            <Typography variant='body2'>Posts should not be too long and title should be brief</Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Title'
                placeholder='Enter title of post'
                size='medium'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={2}
                fullWidth
                label='Post'
                placeholder='Enter the post'
                size='medium'
                value={post}
                onChange={e => setPost(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 1 }} onClick={onSubmit}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogAddPost
