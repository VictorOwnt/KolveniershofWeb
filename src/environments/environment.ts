// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBj9quRT6YD3zd3-p82dRSGO3N1Tn6XXXo',
    authDomain: 'kolv02-hogent.firebaseapp.com',
    databaseURL: 'https://kolv02-hogent.firebaseio.com',
    projectId: 'kolv02-hogen',
    storageBucket: 'kolv02-hogent.appspot.com',
    messagingSenderId: '814577334484',
    appId: '1:814577334484:web:4ee0e4fd5f8ce261e62341'
  }
};

export const API_URL = 'https://kolv02-backend.herokuapp.com/API';
// export const API_URL = 'localhost:3000/API';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
