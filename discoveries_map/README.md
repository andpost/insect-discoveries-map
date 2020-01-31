# Example project for creating an angular page with routing and leaflet map

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Initially load all modules

After checkout, run `npm install` to initially load all node modules.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Checking / fixing vulnerabilities
Run `npm audit` for details, `npm audit fix` to fix them.

## Adding Leaflet Maps

See documentation at https://codehandbook.org/use-leaflet-in-angular/

## Adding Observable support

Run 'npm install rxjs-compat --save' inside project folder.

## Adding Ngx-Lightbox

```
npm install --save ngx-lightbox
```
See also https://www.npmjs.com/package/ngx-lightbox

## Adding Font Awesome

Download Font Awesome Free package at https://fontawesome.com/v4.7.0/get-started/

Version 4 is recommended, version 5 didn't worked at all places.

Unpack to /src/assets/

## Demo data

There are two demo data files under /src/assets/ (*_sample.json). Remove the '_sample' from the name to use them to show some data.

## Carousel on top of navigation

Currently the carousel (see app.component) displays 8 pictures. The amount is configured in the code in the constructor of the component (see amountCarouselPictures). You can use as many pictures you like. Just change this number to the needed value.

Then places these pictures in /assets/images/01_base_images/ and name them carousel_[num].jpg where num is a value from 0 to amountCarouselPictures-1.

**TODO** number must be put to some property file.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).