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

The `@slashid/docusaurus-theme-slashid` package extends [@docusaurus/preset-classic](https://docusaurus.io/docs/using-plugins#docusauruspreset-classic) to add authentication to websites generated using Docusaurus.

Key Features:

- **Compatible:** Supports Magic Links, Passkeys, OTP via sms and SSO.
- **Personalization:** Allows to load per-user configuration data into docusaurus.

## Documentation

For detailed setup & usage instructions, please check the [documentation in our developer portal](https://developer.slashid.dev/docs/access/integrations/docusaurus-login). Below you'll find a short summary of steps required to get started quickly.

## Installation

Theme:

```bash
# npm
npm install @slashid/docusaurus-theme-slashid
# yarn
yarn add @slashid/docusaurus-theme-slashid
```

## Configuring `docusaurus.config.js`

After installing the app and [signing up with SlashID](https://console.slashid.dev/signup) go through the following steps in order.

### Adding the styles

Include the login form styles:

```js
// under presets

{
    theme: {
        customCss: [
            require.resolve("@slashid/react/style.css"), // add this line
        ],
    }
}
```

### Adding the Auth button

You can render a button in the navbar to allow customers to log in. To do so, add this item to the `navbar.items` field in the `themeConfig`:

```js
{
  // ...
  themeConfig: ({
    // ...
    navbar: {
      // ...
      items: [
        // ...
        {
          type: "custom-AuthButton",
          position: "right",
          className: "button button--secondary button--lg",
        },
      ],
    },
  });
}
```

### Configure the theme

Add the following to the `themeConfig` in `docusaurus.config.js`:

```js
// docusaurus.config.js

{
  ...

   themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
     ({
      ...
      slashID: {
        orgID: "your slash id org id",
        forceLogin: "boolean flag to determine if login is required",
        baseURL: "optional base API URL for the SDK, defaults to the production environment",
        sdkURL: "optional base SDK page URL for the SDK, defaults to the production environment",
        privatePaths: [
          {
            path: "a glob or a regex specifiying the path to protect",
            groups: ["optional list of groups that can access the path"],
          }
        ],
        formConfiguration: {
          // authentication methods presented to end users
          factors: [{ method: "email_link" }],
          // logo you want to display on the login form
          logo: "<YOUR_LOGO_URL>",
          // customisable text content
          text: {
            "initial.title": "/id Docusaurus login theme",
          },
        },
      },

    themes: ["@slashid/docusaurus-theme-slashid"],
  }
}
```

The configuration options are explained in the following section.

## Theme Configuration Options

The `docusaurus-theme-slashid` theme can be configured with the following options:

| Name                        | Type            | Default     | Description                                                            |
| --------------------------- | --------------- | ----------- | ---------------------------------------------------------------------- |
| `slashID.orgID`             | `string`        | `null`      | The SlashID organization ID.                                           |
| `slashID.forceLogin`        | `boolean`       | `false`     | Make login required.                                                   |
| `slashID.baseURL`           | `boolean`       | `false`     | Base API URL for the SDK, defaults to the production environment.      |
| `slashID.sdkURL`            | `boolean`       | `false`     | Base SDK page URL for the SDK, defaults to the production environment. |
| `slashID.privatePaths`      | `PrivatePath[]` | `undefined` | Optional set of private paths.                                         |
| `slashID.formConfiguration` | `object`        | `undefined` | Optional form configuration                                            |

### Form configuration

As mentioned in the above table, it is possible to customise the login form by passing in the `slashID.formConfiguration` object. The values sent here are the same ones that can be passed to the [`<ConfigurationProvider>`](https://developer.slashid.dev/docs/access/react-sdk/reference/components/react-sdk-reference-configurationprovider#props). This lets you specify the authentication methods displayed to your users, customise the UI by swapping the text constants and the logo.

### Interface: `PrivatePath`

A private path is a path that requires authentication to access. The `slashID.privatePaths` option is an array of `PrivatePath` objects.

```ts
interface PrivatePath {
  path: string; // a glob or a regex specifiying the path to protect
  groups?: string[]; // optional list of groups that can access the path
}
```

## Page level configuration

The theme can be configured at the page level using front matter to pass `sidebar_custom_props`.

```yaml
sidebar_custom_props:
  slashid:
    auth: true
    groups:
      - member
```

The above configuration will require the user to be authenticated and belong to the `member` group to view the page.
`groups` property is optional and if not specified, the user only needs to be authenticated to view the page.

## Support

Please read [SUPPORT.md](https://github.com/slashid/docusaurus-slashid-login/blob/main/SUPPORT.md) for details on how to get support for this project.
