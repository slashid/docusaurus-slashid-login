/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useCallback } from "react";

import useIsBrowser from "@docusaurus/useIsBrowser";
import { ConfigurationProvider, Form } from "@slashid/react";
import { Factor, OAuthProvider, User } from "@slashid/slashid";

import { AuthContext } from "./auth-context";
import styles from "./slashid.module.css";

type Props = {
  oidcClientID?: string;
  oidcProvider?: OAuthProvider;
};

// SlashID docs depend on this
export const STORAGE_KEY = "MY_USER_TOKEN";

export function SlashID({ oidcClientID, oidcProvider }: Props) {
  const { setShowLogin } = React.useContext(AuthContext);
  const isBrowser = useIsBrowser();
  const handleSuccess = useCallback(
    (user: User) => {
      setShowLogin(false);
      if (isBrowser) {
        window.localStorage.setItem(STORAGE_KEY, user.token);
      }
    },
    [isBrowser, setShowLogin]
  );

  let factors: Factor[] = [
    {
      method: "email_link",
    },
  ];

  const hasOidc = oidcClientID && oidcProvider;
  if (hasOidc) {
    const oidcFactor: Factor = {
      method: "oidc",
      options: {
        client_id: oidcClientID,
        provider: oidcProvider,
        ux_mode: "popup",
      },
    };
    factors = [...factors, oidcFactor];
  }

  return (
    <ConfigurationProvider factors={factors} storeLastHandle>
      <main className={styles.slashid}>
        <Form className={styles.form} onSuccess={handleSuccess} />
      </main>
    </ConfigurationProvider>
  );
}
