---
sidebar_position: 1
sidebar_custom_props:
  slashid:
    auth: false
---

# Tutorial Intro

Let's discover **Docusaurus with SlashID authentication in less than 5 minutes**.

## Authentication

This page is entirely public - users do not need to be authenticated to view it.

### Configuring granular access control

There are two ways to configure the access control for a page:

- using front matter
- using `docusaurus.config.js`

Please check the files in the `apps/demo/docs/tutorial-extras` folder for examples on how to use front matter.
Also check the `docusaurus.config.js` file for examples on how to use path based access control.

Try logging in to see the difference!

## Getting Started

This demo Docusaurus site comes with everything you need to get started quickly. It is pre-configured with SlashID authentication and a couple of sample pages.
This contains a minimal set of changes to the starting state of a Docusaurus site created with the `classic` template.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Start your site

Run the development server:

```bash
cd apps/demo
yarn start
```
