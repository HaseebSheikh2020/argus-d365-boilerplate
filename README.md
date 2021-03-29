# Introduction
This Repository represents the structure for common d365 Frontend Projects in the cloud. It uses typescript and webpack as development tools. In order to use XRM Typings it make use of XrmDefinitelyTyped Generator. In the following is the setup for this repository.

## Prerequisites
- NodeJs
    - https://nodejs.org
- VSCode 
    - https://code.visualstudio.com/
- Yarn
    - `npm install -g yarn`

## Setup Frontend
1. Install Prerequisites
1. Open Terminal and navigate to ./frontend/web-resources
3. Run yarn  `yarn` in order to install required node_modules
4. Generate Xrm-Definately-Types as described below
5. Run `yarn dev` in order to build javascript. The scripts are defined in package.json

## Generate Xrm-Definately-Types (frontend model for typescript)

This Tool can be used to generate typing. For more detailed information please refer to https://github.com/delegateas/XrmDefinitelyTyped/wiki/Tool-usage

1. open `\tools\XRM-DefinatelyTyped-Generator\XrmDefinitelyTyped\XrmDefinitelyTyped.exe.config`
2. Use following if connection string is client/secret:
    - url: orgService Url (svc)
    - mfaAppId: `<ClientId>` of ApplicationUser
    - mfaClientSecret: `<Secret>` of Application user
    - method: `ClientSecret`

   Use following params if authentication should be over connectionstring:     
    - method: `ConnectionString`
    - connectionString: `<Crm ConnectionString>`
3. Change `crmVersion` to older e.g. 8.2 if needed. The domain model for Unified Interface (>9.1) has been drastically change so be aware of
4. provide your comma seperated entity names in the parameter `entities` for which you want the typings to be generated.
5. save the config
6. run `Run.ps1`
7. Typings and Scripts are created in following Folders:
    - `frontend\web-resources\scripts`
    - `frontend\web-resources\src\typings\xrm`

## Useful Links
- Tool for webresoruce Deployment
    - https://github.com/derekfinlinson/powerapps-tools
- Prettier Code Formatter
    - https://prettier.io/
    - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- Eslint (Javascript Linter)
    - https://eslint.org/
    - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- Webpack JS Bundler
    - https://webpack.js.org/
- UI Lib 
    - https://developer.microsoft.com/de-de/fluentui#/