// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import endpoints from 'src/configs/endpoints'
import { useAxios } from 'src/hooks/useAxios'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'
import { Announcement } from 'src/@core/components/types'
import DialogAddAnnouncement from 'src/views/announcement/DialogAddAnnoucement'
import { useAuth } from 'src/hooks/useAuth'

const Announcement = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const announcements: Announcement[] = apiData || []

  const { user } = useAuth()

  return (
    <>
      <Grid container spacing={6}>
        {announcements.map(annoucement => {
          return (
            <Grid item xs={12} key={annoucement.id}>
              <Card>
                <CardHeader title={annoucement.title}></CardHeader>
                <CardContent>
                  <Typography>{annoucement.announcement}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
      {user?.role === 'Admin' || user?.role === 'Editor' || user?.role === 'Author' ? (
        <Grid item>
          <DialogAddAnnouncement />
        </Grid>
      ) : null}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await useAxios.get(endpoints.allAnnouncement)
  const apiData: Announcement[] = res?.data?.data?.announcements?.content

  if (!res || !apiData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      apiData
    },
    revalidate: 150
  }
}

export default Announcement
