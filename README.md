# Introduction
This Repository represents the structure for common d365 Avantic Project for in the cloud

# Generate Xrm-Definately-Types (frontend model for typescript)

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

# Frontend


