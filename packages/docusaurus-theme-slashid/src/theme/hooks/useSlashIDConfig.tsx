/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { useMemo } from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import { ThemeConfig } from "../../domain";

const DEFAULT_CONFIG = {
  orgID: "",
  forceLogin: false,
  baseURL: "https://api.slashid.com",
  sdkURL: "https://cdn.slashid.com/sdk.html",
  privateRedirectPath: "/",
};

export const useSlashIDConfig = () => {
  const { siteConfig } = useDocusaurusContext();
  const { slashID } = siteConfig.themeConfig as ThemeConfig;

  const safeOptions = useMemo(() => {
    return { ...DEFAULT_CONFIG, ...slashID };
  }, [slashID]);

  return safeOptions;
};
