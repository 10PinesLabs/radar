# RubenRadarWeb

## Requerimientos

* `node -v` > 8.x
* Angular cli: `npm install -g @angular/cli`

## Configurar el ambiente

* `npm install`

## Posibles problemas

* Cannot find module '@angular-devkit/core'

Esto quiere decir que la versión utilizada del cli es menor a la requerida por el `package.json`. 
En tal caso `npm update -g @angular/cli` y `npm update` deberia alcanzar.

## Ejecutar la aplicación

* `ng serve`

