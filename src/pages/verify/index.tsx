import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Error500 from '../500'

const Verify = () => {
  return <Error500 />
}

Verify.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Verify.guestGuard = true

export default Verify
