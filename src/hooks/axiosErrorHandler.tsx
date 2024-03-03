import { useEffect } from 'react'
import { useAuth } from './useAuth'
import { useAxios } from './useAxios'
import auth from 'src/configs/auth'

// ** Axios interceptor to intercept requests and responses, attaching token for requests and retrying if token expired on responses

const AxiosErrorHandler = ({ children }: any): any => {
  const { token, setToken } = useAuth()
  useEffect(() => {
    const requestIntercept = useAxios.interceptors.request.use(
      config => {
        config.headers = config.headers ?? {}
        if (config.url?.includes('scholar/update/image')) {
          config.headers['Content-Type'] = 'multi-part/formdata'
        }
        if (
          config.url === auth.loginEndpoint ||
          config.url === auth.registerEndpoint ||
          config.url === auth.verifyCodeEndpoint ||
          config.url === auth.refreshTokenEndpoint ||
          config.url?.includes('scholar/verify/code') ||
          config.url?.includes('scholar/new/password')
        ) {
          return config
        }
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
      },
      error => Promise.reject(error)
    )

    const responseIntercept = useAxios.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config
        if (
          error?.response?.data?.statusCode === 401 ||
          (error?.response?.data?.reason.includes('Token has expired') &&
            !prevRequest?.sent &&
            prevRequest.url !== auth.refreshTokenEndpoint &&
            prevRequest.url !== auth.loginEndpoint &&
            prevRequest.url !== auth.registerEndpoint &&
            prevRequest.url !== auth.verifyCodeEndpoint)
        ) {
          prevRequest.sent = true

          return await useAxios
            .get(auth.refreshTokenEndpoint)
            .then(async res => {
              if (res.status === 201) {
                const newAccessToken = res.data.data.access_token
                setToken(newAccessToken)
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

                // eslint-disable-next-line react-hooks/rules-of-hooks
                return Promise.resolve(useAxios(prevRequest))
              }
            })
            .catch(error => {
              Promise.reject(error)
            })
        }

        return Promise.reject(error)
      }
    )

    return () => {
      useAxios.interceptors.request.eject(requestIntercept)
      useAxios.interceptors.response.eject(responseIntercept)
    }
  }, [token, setToken])

  return children
}

export default AxiosErrorHandler
