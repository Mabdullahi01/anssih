export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
}

export type VerifyParams = {
  email: string | undefined
  code: string
}

export type UpdatePasswordParams = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export type RegisterParams = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type UpdateParams = {
  id: number | undefined
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  phone: string | undefined
  middleName: string | undefined
  university: string | undefined
  city: string | undefined
  title: string | undefined
  course: string | undefined
  graduationDate: string | undefined
  level: string | undefined
}

export type UserDataType = {
  id: number
  role: string
  email: string
  firstName: string
  lastName: string
  middleName: string
  title: string
  password: string
  imageUrl: string
  city: string
  course: string
  graduationDate: string
  level: string
  phone: string
  awardUrl: string
  university: string
  permission: string
  verified: boolean
  active: boolean
  enabled: boolean
  notLocked: boolean
  usingMfa: boolean
  createdAt: Date
}

export type MandateDataType = {
  id: number | undefined
  email: string | undefined
  bank: string | undefined
  amount: number | undefined
  course: string | undefined
  university: string | undefined
  fullName: string | undefined
  iban: string | undefined
  swiftCode: string | undefined
  graduation: string | undefined
}

export type DataGridRowType = {
  id: number
  fullName: string
  email: string
  bank: string
  university: string
  course: string
  amount: number
  swiftCode: string
  iban: string
  graduation: Date
}

export type AuthValuesType = {
  loading: boolean
  token: string
  logout: () => void
  user: UserDataType | null
  mandate: MandateDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  setMandate: (value: MandateDataType | null) => void
  setToken: (value: string) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
  update: (params: UpdateParams, errorCallback?: ErrCallbackType) => void
  updatePassword: (params: UpdatePasswordParams, errorCallback?: ErrCallbackType) => void
  verifyCode: (params: VerifyParams, errorCallback?: ErrCallbackType) => void
  login: (params: LoginParams, rememberMe: boolean, errorCallback?: ErrCallbackType) => void
}
