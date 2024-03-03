// ** MUI Imports
//import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// import Typography from '@mui/material/Typography'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'
import { useAxios } from 'src/hooks/useAxios'
import endpoints from 'src/configs/endpoints'
import { Post } from 'src/@core/components/types'
import DialogAddPost from 'src/views/home/DialogAddPost'
import { useAuth } from 'src/hooks/useAuth'
import PostCard from 'src/views/home/PostCard'

const Home = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const posts: Post[] = apiData || []

  const { user } = useAuth()

  return (
    <>
      <Grid container spacing={6}>
        {/* {posts.map(post => {
        return (
          <Grid item xs={12} key={post.id}>
            <Card>
              <CardHeader title={post.title}></CardHeader>
              <CardContent>
                <Typography>{post.post}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      })} */}
        {posts.map(post => {
          return (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostCard
                title={post.title}
                userImageUrl={'/images/avatars/1.png'}
                post={post.post}
                username={post.username || 'Admin'}
                likes={post.likes || 0}
              />
            </Grid>
          )
        })}
      </Grid>
      {user?.role === 'Admin' || user?.role === 'Editor' || user?.role === 'Author' ? (
        <Grid item>
          <DialogAddPost />
        </Grid>
      ) : null}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await useAxios.get(endpoints.allPost)
  const apiData: Post[] = res?.data?.data?.Posts?.content

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

export default Home
