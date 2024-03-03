// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
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

const DialogAddFaq = () => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [category, setCategory] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  const handleCategoryChange = useCallback((e: SelectChangeEvent) => {
    setCategory(e.target.value)
  }, [])

  const onSubmit = () => {
    const formData = new FormData()
    formData.append('question', question)
    formData.append('answer', answer)

    useAxios
      .post(endpoints.addFaqUrl + '/' + category, formData)
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
          Add FAQ
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
              Add New FAQ
            </Typography>
            <Typography variant='body2'>Please add the FAQ to the appropriate category.</Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='category-select'>Category</InputLabel>
                <Select
                  fullWidth
                  value={category}
                  placeholder='Payment'
                  label='Payment'
                  labelId='category-select'
                  defaultValue='Select Category'
                  onChange={handleCategoryChange}
                >
                  <MenuItem value='Other'>Select Category</MenuItem>
                  <MenuItem value='Payment'>Payment</MenuItem>
                  <MenuItem value='Tax Card'>Tax Card</MenuItem>
                  <MenuItem value='Health Insurance'>Health Insurance</MenuItem>
                  <MenuItem value='Passport'>Passport</MenuItem>
                  <MenuItem value='Residence Permit'>Residence Permit</MenuItem>
                  <MenuItem value='Mandate'>Mandate</MenuItem>
                  <MenuItem value='Graduation'>Graduation</MenuItem>
                  <MenuItem value='Life in Hungary'>Life in Hungary</MenuItem>
                  <MenuItem value='Job Opportunities'>Job opportunities</MenuItem>
                  <MenuItem value='Others'>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Question'
                placeholder='Enter question'
                size='medium'
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={2}
                fullWidth
                label='Answer'
                placeholder='Enter answer'
                size='medium'
                value={answer}
                onChange={e => setAnswer(e.target.value)}
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

export default DialogAddFaq
