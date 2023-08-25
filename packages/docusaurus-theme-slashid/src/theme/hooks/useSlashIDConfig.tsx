/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { useMemo } from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import { ThemeConfig, convertGlobToRegex } from "../../domain";

const DEFAULT_CONFIG = {
  orgID: "",
  forceLogin: false,
  baseURL: "https://api.slashid.com",
  sdkURL: "https://cdn.slashid.com/sdk.html",
  privateRedirectPath: "/",
};

export const useSlashIDConfig = (): ThemeConfig["slashID"] => {
  const { siteConfig } = useDocusaurusContext();
  const { slashID } = siteConfig.themeConfig as unknown as ThemeConfig;

  const safeOptions = useMemo(() => {
    const optionsWithDefaults: ThemeConfig["slashID"] = {
      ...DEFAULT_CONFIG,
      ...slashID,
    };
    return convertGlobToRegex(optionsWithDefaults);
  }, [slashID]);

  return safeOptions;
};
