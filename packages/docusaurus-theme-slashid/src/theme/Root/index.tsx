/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useIsBrowser from "@docusaurus/useIsBrowser";

import { ThemeConfig } from "../../types";
import { Auth } from "./auth";
import { SlashIDProvider, useSlashId } from "./auth-context";

import "./reset.css";
import "./globals.css";

interface AuthCheckProps {
  oid: string;
  children: React.ReactNode;
}
const AuthCheck: React.FC<AuthCheckProps> = ({ oid, children }) => {
  const { user } = useSlashId();
  const isBrowser = useIsBrowser();

  if (!isBrowser) {
    return null;
  }

  return user ? <>{children}</> : <Auth oid={oid} />;
};

// Default implementation, that you can customize
export default function Root({ children }: any) {
  const { siteConfig } = useDocusaurusContext();
  const themeConfig = siteConfig.themeConfig as ThemeConfig;
  const options = themeConfig.slashID;

  return (
    <SlashIDProvider oid={options?.orgID!}>
      <AuthCheck oid={options?.orgID!}>{children}</AuthCheck>
    </SlashIDProvider>
  );
}
