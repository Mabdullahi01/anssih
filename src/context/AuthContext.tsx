// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

// ** Axios
import { useAxios } from 'src/hooks/useAxios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  RegisterParams,
  VerifyParams,
  UpdateParams,
  UpdatePasswordParams,
  MandateDataType
} from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  token: '',
  mandate: null,
  setMandate: () => null,
  setUser: () => null,
  setToken: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  verifyCode: () => Promise.resolve(),
  update: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [mandate, setMandate] = useState<MandateDataType | null>(defaultProvider.mandate)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [token, setToken] = useState<string>(defaultProvider.token)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await useAxios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: 'Bearer ' + storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setToken(response.data.data.access_token)
            setMandate(response.data.data.mandate)
            setUser(response.data.data.scholar)
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, rememberMe: boolean, errorCallback?: ErrCallbackType) => {
    useAxios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.data.access_token) : null
        const returnUrl = router.query.returnUrl

        setUser(response.data.data.scholar)
        setToken(response.data.data.access_token)
        setMandate(response.data.data.mandate)
        rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.data.scholar)) : null
        if (response.data?.data?.scholar?.usingMfa) {
          router.push('/two-steps')
        } else {
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL as string)
        }
        toast.success(response.data.message)
      })

      .catch(err => {
        if (!!err.response?.data?.reason) {
          toast.error(err.response?.data?.reason)
        } else {
          toast.error('Server down please contact support')
        }
        if (errorCallback) errorCallback(err)
      })
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    useAxios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        toast.success('Registration Successful')
        router.push('/verify-email')
        setUser({ ...res.data.data.scholar })
      })
      .catch(function (err) {
        if ((err.response.statusCode = 500)) {
          toast.error('Server down, please try again later.')
        } else {
          toast.error(err.response.data.reason)
        }
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setMandate(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    toast.success("You're now Logged out")
    router.push('/login')
  }

  const handleCodeVerification = (params: VerifyParams, errorCallback?: ErrCallbackType) => {
    const { email, code } = params
    useAxios
      .get(authConfig.verifyCodeEndpoint + '/' + email + '/' + code)
      .then(res => {
        toast.success(res.data.message)
        setUser(res.data.data.scholar)
        setMandate(res.data.data.mandate)
        setToken(res.data.data.access_token)
        router.push('/home')
      })
      .catch(function (err) {
        toast.error(err.response.data.reason)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleProfileUpdate = (params: UpdateParams, errorCallback?: ErrCallbackType) => {
    useAxios
      .patch(authConfig.updateProfile, params)
      .then(res => {
        toast.success(res.data.message)
        setUser(res.data.data.scholar)
      })
      .catch(function (err) {
        if (!!err.response?.data?.reason) {
          toast.error(err.response.data.reason)
        }
        if (errorCallback) errorCallback(err)
      })
  }

  const handlePasswordUpdate = (params: UpdatePasswordParams, errorCallback?: ErrCallbackType) => {
    useAxios
      .patch(authConfig.updatePasswordEndpoint, params)
      .then(res => {
        toast.success(res.data.message)
      })
      .catch(function (err) {
        if (!!err.response?.data?.reason) {
          toast.error(err.response.data.reason)
        }
        if (errorCallback) errorCallback(err)
      })
  }

  const values = {
    user,
    mandate,
    loading,
    token,
    setUser,
    setMandate,
    setToken,
    setLoading,
    login: handleLogin,
    verifyCode: handleCodeVerification,
    update: handleProfileUpdate,
    logout: handleLogout,
    updatePassword: handlePasswordUpdate,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
