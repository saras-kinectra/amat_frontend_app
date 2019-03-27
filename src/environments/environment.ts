// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    apiUrl: 'http://ec2-34-229-95-172.compute-1.amazonaws.com/amatg3mapper/api/',
    baseHref : '/amatg3mapper/app/',
    apiBasicAuthUsername : '9ae0f32f664d5f18ab211fa659dc2367',
    apiBasicAuthPassword  : '86e6ecc075cb6fab7441868cd8fe9e2c',
    issuer_uri: 'https://myloginqa.amat.com:8080',
    client_id: 'G3Mobile_Dev',
    redirect_uri: 'http://localhost:4200/callback',
    extras: {
      'prompt': 'consent',
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
