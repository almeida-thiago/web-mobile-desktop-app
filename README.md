# MyApp

Boiierplate to create simultaneous apps for web, desktop and mobile, using React with TypeScript.

> **start:android** - *start android mobile app*
> **start:ios** - *start ios mobile app*
> **start:web** *start web app*
> **start:desktop** - *start desktop app*
> **build:android** - *build android mobile app*
> **build:ios** - *build ios mobile app*
> **build:web** - *build web app*
> **build:desktop** - *build desktop app*
> **test** - *run unit tests with jest*
> **lint** - *verify code*

### Environment variables
|**Variable**|**description**|
|--|--|
|NODE_ENV|application environment|
|API_URL|application api url|
|APP_STORAGE|application local storage id|

#### Output directory: `/dist/**/*`

## Technologies
- React JS
- React Native
- Electron

### Software architecture
##### Clean architecture based:
- adapters - `interfaces and communication`
- entities - `business domains`
- use_cases - `business rules`
- shared - `utilities used between apps`
- web - `React JS app`
- mobile - `React Native app`
- desktop - `Electron app`

##### Includes
- http adapter - Axios
- state store - Redux
- local storage - React Native Async Storage `(works with web and desktop)`
- routes and security - React Router

### Tests suite
- Jest `for all apps`

### Addons
- Lint
- Babel
- Webpack