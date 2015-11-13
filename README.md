# bank-test

## Used tools
- Single page client side application written using HTML, LESS, JavaScript. 
- AngularJS-1.4.7 for the SPA (+jQuery-2.1.4)
- Jasmine-2.3.4 for unit tests
- Bootstrap-3.3.5 and AngularStrap-2.3.5 for styles and animations

## Installation
- clone the repository
- enable CORS (firefox/iceweasel allows it by default, chromium requires startup switch --disable-web-security - at least on linux)
- requires working internet connection (3rd party libraries are obtained via cdn)

## Usage
- browser url: file:///DIRECTORY_YOU_CLONED_THE_APP/views/main.html
- for jasmine tests: file:///DIRECTORY_YOU_CLONED_THE_APP/jasmine/SpecRunner.html

## Comments
- server functionality is faked with a mock backend using angular.mocks` $httpBackend
- less compile will probably require an offline compiler, if you want to use less.js there might be problems with the CORS or local processing
- check mock/server.mock.js for user logins and passwords
- big thanks for people who develop vim plugins
- the whole application was created on a Raspberry Pi 2
