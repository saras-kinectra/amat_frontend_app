export const environment = {
  production: true,
  apiUrl: 'https://g3mapper.amat.com/api/',
  baseHref : '/app/',
  issuer_uri: 'https://mylogin.amat.com:8080',
  client_id: 'G3Mobile',
  redirect_uri: 'https://g3mapper.amat.com/app/callback',
  scope:'openid profile',
  extras: {
    'access_type': 'offline'
  }
};
