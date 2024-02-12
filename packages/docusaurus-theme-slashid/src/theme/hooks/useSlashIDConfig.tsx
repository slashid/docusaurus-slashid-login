/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { useMemo } from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import {
  LegacyThemeConfig,
  NewThemeConfig,
  ThemeConfig,
  convertGlobToRegex,
} from "../../domain";

function isLegacyConfig(
  config: NewThemeConfig | LegacyThemeConfig
): config is LegacyThemeConfig {
  if (
    config.hasOwnProperty("oidcClientID") &&
    config.hasOwnProperty("oidcProvider")
  ) {
    return true;
  }

  return false;
}

const DEFAULT_CONFIG: NewThemeConfig = {
  orgID: "",
  forceLogin: false,
  baseURL: "https://api.slashid.com",
  sdkURL: "https://cdn.slashid.com/sdk.html",
  privateRedirectPath: "/",
  formConfiguration: {
    storeLastHandle: true,
    factors: [
      {
        method: "email_link",
      },
    ],
  },
};

export const useSlashIDConfig = (): NewThemeConfig => {
  const { siteConfig } = useDocusaurusContext();
  const { slashID } = siteConfig.themeConfig as unknown as ThemeConfig;

  const safeOptions = useMemo(() => {
    // handle the legacy theme config
    if (
      isLegacyConfig(slashID) &&
      slashID.oidcClientID &&
      slashID.oidcProvider
    ) {
      const {
        orgID,
        forceLogin,
        baseURL,
        sdkURL,
        privatePaths,
        privateRedirectPath,
      } = slashID;
      const options: NewThemeConfig = {
        orgID,
        forceLogin,
        baseURL,
        sdkURL,
        privatePaths,
        privateRedirectPath,
        formConfiguration: {
          factors: [
            {
              method: "email_link",
            },
            {
              method: "oidc",
              options: {
                client_id: slashID.oidcClientID,
                provider: slashID.oidcProvider,
                ux_mode: "popup",
              },
            },
          ],
        },
      };
      return convertGlobToRegex({ ...DEFAULT_CONFIG, ...options });
    }

    const optionsWithDefaults: NewThemeConfig = {
      ...DEFAULT_CONFIG,
      ...slashID,
    };

    return convertGlobToRegex(optionsWithDefaults);
  }, [slashID]);

  return safeOptions;
};
