import { ThemeColor } from 'src/@core/layouts/types'

export type UsersType = {
  id: number
  role: string
  email: string
  firstName: string
  lastName: string
  middleName: string
  title: string
  password: string
  status: string
  imageUrl: string
  city: string
  phone: string
  awardUrl: string
  university: string
  permission: string
  course: string
  level: string
  graduationDate: string
  avatar?: string | null
  verified: boolean
  active: boolean
  enabled: boolean
  notLocked: boolean
  usingMfa: boolean
  createdAt: Date
  avatarColor?: ThemeColor
}
