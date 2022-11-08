/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { SlashIDProvider } from "@slashid/react";

import { ThemeConfig } from "../../types";
import { Auth } from "./auth";
import "./reset.css";
import "./globals.css";
import { AuthProvider, useAuth } from "./auth-context";

interface AuthCheckProps {
  oid: string;
  children: React.ReactNode;
}
const AuthCheck: React.FC<AuthCheckProps> = ({ oid, children }) => {
  const { showLogin } = useAuth();
  const isBrowser = useIsBrowser();

  console.log({ isBrowser });

  if (!isBrowser) {
    return null;
  }

  return showLogin ? <Auth /> : <>{children}</>;
};

// Default implementation, that you can customize
export default function Root({ children }: any) {
  const { siteConfig } = useDocusaurusContext();
  const themeConfig = siteConfig.themeConfig as ThemeConfig;
  const options = themeConfig.slashID;

  return (
    <SlashIDProvider oid={options?.orgID!} tokenStorage="localStorage">
      <AuthProvider>
        <AuthCheck oid={options?.orgID!}>{children}</AuthCheck>
      </AuthProvider>
    </SlashIDProvider>
  );
}
