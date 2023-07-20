/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useContext } from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { SlashIDProvider, useSlashID } from "@slashid/react";
import { OAuthProvider } from "@slashid/slashid";

import { ThemeConfig } from "../../types";

import "./reset.css";
import "./globals.css";
import { AuthContext, AuthProvider } from "./auth-context";
import { SlashID } from "./slashid";

interface AuthCheckProps {
  forceLogin?: boolean;
  oidcClientID?: string;
  oidcProvider?: OAuthProvider;
  children: React.ReactNode;
}
const AuthCheck: React.FC<AuthCheckProps> = ({
  forceLogin = false,
  oidcClientID,
  oidcProvider,
  children,
}) => {
  const { user } = useSlashID();
  const { showLogin } = useContext(AuthContext);
  const isBrowser = useIsBrowser();

  // TODO figure out where the reference to window is
  if (!isBrowser) {
    return null;
  }

  // if login is configured to be mandatory
  if (forceLogin) {
    return user ? (
      <>{children}</>
    ) : (
      <SlashID oidcClientID={oidcClientID} oidcProvider={oidcProvider} />
    );
  }

  return showLogin ? (
    <SlashID oidcClientID={oidcClientID} oidcProvider={oidcProvider} />
  ) : (
    <>{children}</>
  );
};

// Default implementation, that you can customize
export default function Root({ children }: any) {
  const { siteConfig } = useDocusaurusContext();
  const themeConfig = siteConfig.themeConfig as ThemeConfig;
  const options = themeConfig.slashID;

  return (
    <SlashIDProvider oid={options?.orgID!}>
      <AuthProvider>
        <AuthCheck
          forceLogin={options?.forceLogin}
          oidcClientID={options?.oidcClientID}
          oidcProvider={options?.oidcProvider}
        >
          {children}
        </AuthCheck>
      </AuthProvider>
    </SlashIDProvider>
  );
}
