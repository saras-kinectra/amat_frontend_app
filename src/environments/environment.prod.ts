export const environment = {
  production: true,
  apiUrl: 'https://ec2-34-229-95-172.compute-1.amazonaws.com/amatg3mapper/api/',
  baseHref : '/amatg3mapper/app/',
  issuer_uri: 'https://myloginqa.amat.com:8080',
  client_id: 'G3Mobile_Dev',
  redirect_uri: 'https://ec2-34-229-95-172.compute-1.amazonaws.com/amatg3mapper/app/callback',
  scope:'openid profile',
  extras: {
    'access_type': 'offline'
  }
};
