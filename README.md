<h1 align="center">Docusaurus SlashID Theme</h1>

<div align="center">

SlashID theme to add authentication to Docusaurus.


[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/slashid/docusaurus-slashid-login/blob/HEAD/LICENSE) [![npm latest package](https://img.shields.io/npm/v/docusaurus-theme-openapi-docs/latest.svg)](https://www.npmjs.com/package/docusaurus-theme-slashid) [![npm downloads](https://img.shields.io/npm/dm/docusaurus-theme-openapi-docs.svg)](https://www.npmjs.com/package/docusaurus-theme-slashid) [![npm canary package](https://img.shields.io/npm/v/docusaurus-theme-openapi-docs/canary.svg)](https://www.npmjs.com/package/docusaurus-theme-openapi-docs)
<br/>
[![build](https://github.com/slashid/docusaurus-slashid-login/actions/workflows/validate.yaml/badge.svg)](https://github.com/slashid/docusaurus-slashid-login/actions/workflows/validate.yaml) [![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/) [![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/slashid/docusaurus-slashid-login/blob/HEAD/CONTRIBUTING.md#pull-requests)
<br />

</div>

<p align="center">

</p>

---

## Overview

The `docusaurus-theme-slashid` package extends Docusaurus to add authentication to docusaurus. The theme can be combined with [docusaurus openapi docs](https://github.com/slashid/docusaurus-slashid-login) to preload API keys and API parameters directly through SlashID attributes. 

Key Features:

- **Compatible:** Supports Magic Links, Passkeys, OTP via sms and SSO.
- **Personalization:** Allows to load per-user configuration data into docusaurus. 

## Installation


Theme:

```bash
yarn add docusaurus-theme-slashid
```

## Configuring `docusaurus.config.js`

Add the following `themes` to `docusaurus.config.js` to add `docusaurus-theme-slashid`.

```js
// docusaurus.config.js

{
  ...

  themes: ["docusaurus-theme-slashid"], 
}
```


## Theme Configuration Options

The `docusaurus-theme-slashid` theme can be configured with the following options:

| Name           | Type     | Default | Description                                                                                                                                          |
| -------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `orgID`           | `string` | `null`  | A SlashID org id.                                                                                                                                |
| `docsPluginId` | `string` | `null`  | The ID associated with the `plugin-content-docs` or `preset` instance used to render the OpenAPI docs (e.g. "your-plugin-id", "classic", "default"). |

### config

`config` can be configured with the following options:

| Name             | Type     | Default | Description                                                                                                                 |
| ---------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `specPath`       | `string` | `null`  | Designated URL or path to the source of an OpenAPI specification file or directory of multiple OpenAPI specification files. |
| `ouputDir`       | `string` | `null`  | Desired output path for generated MDX files.                                                                                |
| `template`       | `string` | `null`  | _Optional:_ Customize MDX content with a desired template.                                                                  |
| `sidebarOptions` | `object` | `null`  | _Optional:_ Set of options for sidebar configuration. See below for a list of supported options.                            |
| `version`        | `string` | `null`  | _Optional:_ Version assigned to single or micro-spec API specified in `specPath`.                                           |
| `label`          | `string` | `null`  | _Optional:_ Version label used when generating version selector dropdown menu.                                              |
| `baseUrl`        | `string` | `null`  | _Optional:_ Version base URL used when generating version selector dropdown menu.                                           |
| `versions`       | `object` | `null`  | _Optional:_ Set of options for versioning configuration. See below for a list of supported options.                         |

`sidebarOptions` can be configured with the following options:

| Name                 | Type      | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `groupPathsBy`       | `string`  | `null`  | Organize and group sidebar slice by specified option. Note: Currently, `groupPathsBy` only contains support for grouping by `tag`.                                                                                                                                                                                                                                                                                                                   |
| `categoryLinkSource` | `string`  | `null`  | Defines what source to use for rendering category link pages when grouping paths by tag. <br/><br/>The supported options are as follows: <br/><br/> `tag`: Sets the category link config type to `generated-index` and uses the tag description as the link config description. <br/><br/>`info`: Sets the category link config type to `doc` and renders the `info` section as the category link (recommended only for multi/micro-spec scenarios). |
| `sidebarCollapsible` | `boolean` | `true`  | Whether sidebar categories are collapsible by default.                                                                                                                                                                                                                                                                                                                                                                                               |
| `sidebarCollapsed`   | `boolean` | `true`  | Whether sidebar categories are collapsed by default.                                                                                                                                                                                                                                                                                                                                                                                                 |
| `customProps`        | `object`  | `null`  | Additional props for customizing a sidebar item.                                                                                                                                                                                                                                                                                                                                                                                                     |

> You may optionally configure a `sidebarOptions`. In doing so, an individual `sidebar.js` slice with the configured options will be generated within the respective `outputDir`.

`versions` can be configured with the following options:

| Name       | Type     | Default | Description                                                                                                              |
| ---------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `specPath` | `string` | `null`  | Designated URL or path to the source of an OpenAPI specification file or directory of micro OpenAPI specification files. |
| `ouputDir` | `string` | `null`  | Desired output path for versioned, generated MDX files.                                                                  |
| `label`    | `string` | `null`  | _Optional:_ Version label used when generating version selector dropdown menu.                                           |
| `baseUrl`  | `string` | `null`  | _Optional:_ Version base URL used when generating version selector dropdown menu.                                        |

> All versions will automatically inherit `sidebarOptions` from the parent/base config.



## Contributors

<a href="https://github.com/slashid/docusaurus-slashid-login/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=slashid/docusaurus-slashid-login" />
</a>

## Support

Please read [SUPPORT.md](https://github.com/slashid/docusaurus-slashid-login/blob/main/SUPPORT.md) for details on how to get support for this project.
