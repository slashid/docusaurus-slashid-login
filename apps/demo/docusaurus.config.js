/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const lightCodeTheme = require("prism-react-renderer/themes/github");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Docusaurus",
  tagline: "Control access to your Docusaurus website with SlashID",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "slashid", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("@slashid/react/style.css"),
          ],
        },
      }),
    ],
  ],

  themes: ["@slashid/docusaurus-theme-slashid"],

  themeConfig:
    /** @type {import('@slashid/docusaurus-theme-slashid').ThemeConfig} */
    ({
      slashID: {
        // orgID used for code examples
        orgID: "a6b69fd8-cd7a-f516-2705-d531d709acf8",
        forceLogin: false,
        // UX when a non-logged in user tries to access a private page (render form in a modal or redirect to the page specified by privateRedirectPath)
        uxMode: "modal",
        formConfiguration: {
          factors: [{ method: "email_link" }],
          logo: "https://logodix.com/logo/1931244.jpg",
          text: {
            "initial.title": "/id Docusaurus login theme",
          },
        },
        // uses the production API
        baseURL: "https://api.slashid.com",
        sdkURL: "https://cdn.slashid.com/sdk.html",
        // example: granular access based on paths
        privatePaths: [
          {
            path: "/docs/category/tutorial---basics/*",
          },
          {
            // custom page - not docs based
            path: "/markdown-page",
          },
          {
            path: "/docs/category/tutorial---basics",
          },
        ],
      },
      navbar: {
        title: "Docusaurus",
        logo: {
          alt: "My Site Logo",
          src: "img/slashid_logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Tutorial",
          },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/markdown-page", label: "Custom page", position: "left" },
          {
            href: "https://github.com/facebook/docusaurus",
            label: "GitHub",
            position: "right",
          },
          {
            type: "custom-AuthButton",
            position: "right",
            className: "button button--secondary button--lg",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
