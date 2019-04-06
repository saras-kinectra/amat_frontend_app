// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
