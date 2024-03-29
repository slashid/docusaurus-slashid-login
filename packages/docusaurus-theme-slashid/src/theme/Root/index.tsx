/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useContext } from "react";

import { Redirect, useLocation } from "@docusaurus/router";
import useIsBrowser from "@docusaurus/useIsBrowser";
import {
  SlashIDProvider,
  SlashIDLoaded,
  useSlashID,
  ServerThemeRoot,
} from "@slashid/react";

import "./reset.css";
import "./globals.css";
import { shouldPathRender } from "../../domain";
import { useSlashIDConfig } from "../hooks/useSlashIDConfig";
import { AuthContext, AuthProvider } from "./auth-context";
import { SlashID } from "./slashid";

interface AuthCheckProps {
  children: React.ReactNode;
}
const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const { user } = useSlashID();
  const { showLogin } = useContext(AuthContext);
  const isBrowser = useIsBrowser();
  const config = useSlashIDConfig();
  const location = useLocation();

  // TODO figure out where the reference to window is
  if (!isBrowser) {
    return null;
  }

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const shouldRenderByPath = shouldPathRender(
    location.pathname,
    config.privatePaths,
    user
  );

  if (!shouldRenderByPath && config.uxMode === "redirect") {
    return <Redirect to={config.privateRedirectPath ?? "/"} />;
  }

  const shouldShowLogin =
    (config.forceLogin && !user) || showLogin || !shouldRenderByPath;

  return shouldShowLogin ? (
    <SlashID configuration={config.formConfiguration!} />
  ) : (
    <>{children}</>
  );
};

// Default implementation, that you can customize
export default function Root({ children }: any) {
  const options = useSlashIDConfig();

  return (
    <SlashIDProvider
      oid={options.orgID}
      baseApiUrl={options.baseURL}
      sdkUrl={options.sdkURL}
      tokenStorage="localStorage"
    >
      <ServerThemeRoot>
        <AuthProvider>
          <SlashIDLoaded>
            <AuthCheck>{children}</AuthCheck>
          </SlashIDLoaded>
        </AuthProvider>
      </ServerThemeRoot>
    </SlashIDProvider>
  );
}
