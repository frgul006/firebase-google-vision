// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hmr: false,
  firebase: {
    apiKey: 'AIzaSyCPB5N1tYkHYdK4_LDNI3g1iYvYzJsjcqk',
    authDomain: 'frgul006-test.firebaseapp.com',
    databaseURL: 'https://frgul006-test.firebaseio.com',
    projectId: 'frgul006-test',
    storageBucket: 'frgul006-test.appspot.com',
    messagingSenderId: '458571537811'
  }
};
