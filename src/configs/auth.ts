export default {
  meEndpoint: '/scholar/profile',
  loginEndpoint: '/scholar/login',
  registerEndpoint: '/scholar/register',
  verifyCodeEndpoint: '/scholar/verify/code',
  updateProfile: '/scholar/update',
  updatePasswordEndpoint: '/scholar/update/password',
  refreshTokenEndpoint: '/scholar/refresh/token',
  updateMandateEndpoint: '/mandate/update',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
