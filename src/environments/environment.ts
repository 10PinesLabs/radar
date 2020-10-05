// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: "http://localhost:3000",
  logins: [
    {
      label: "Entrar con Backoffice",
      name: "backoffice",
      logo: "assets/images/logo-backoffice.png",
    },
    {
      label: "Entrar con Google",
      name: "google",
      logo: "assets/images/logo-google.png"
    }
  ],
};
