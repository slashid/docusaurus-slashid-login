<h1 align="center">Docusaurus SlashID Theme</h1>

<div align="center">

SlashID theme to add authentication to Docusaurus.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/slashid/docusaurus-slashid-login/blob/HEAD/LICENSE) [![npm latest package](https://img.shields.io/npm/v/@slashid/docusaurus-theme-slashid/latest.svg)](https://www.npmjs.com/package/@slashid/docusaurus-theme-slashid) [![npm downloads](https://img.shields.io/npm/dm/@slashid/docusaurus-theme-slashid.svg)](https://www.npmjs.com/package/@slashid/docusaurus-theme-slashid)
<br/>
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/slashid/docusaurus-slashid-login/blob/HEAD/CONTRIBUTING.md#pull-requests)
<br />

</div>

<p align="center">

</p>

---

## Overview

The `@slashid/docusaurus-theme-slashid` package extends Docusaurus to add authentication to docusaurus. The theme can be combined with [docusaurus openapi docs](https://github.com/slashid/docusaurus-slashid-login) to preload API keys and API parameters directly through SlashID attributes.

Key Features:

- **Compatible:** Supports Magic Links, Passkeys, OTP via sms and SSO.
- **Personalization:** Allows to load per-user configuration data into docusaurus.

## Installation

Theme:

```bash
yarn add @slashid/docusaurus-theme-slashid
```

## Configuring `docusaurus.config.js`

Add the following `themes` to `docusaurus.config.js` to add `docusaurus-theme-slashid`.

```js
// docusaurus.config.js

{
  ...

   themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      ...
      slashID: {
        orgID: "your slash id org id"
      },

  themes: ["docusaurus-theme-slashid"],
}
```

## Theme Configuration Options

The `docusaurus-theme-slashid` theme can be configured with the following options:

| Name            | Type     | Default | Description                  |
| --------------- | -------- | ------- | ---------------------------- |
| `slashID.orgID` | `string` | `null`  | The SlashID organization ID. |

## Contributors

<a href="https://github.com/slashid/docusaurus-slashid-login/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=slashid/docusaurus-slashid-login" />
</a>

## Support

Please read [SUPPORT.md](https://github.com/slashid/docusaurus-slashid-login/blob/main/SUPPORT.md) for details on how to get support for this project.
