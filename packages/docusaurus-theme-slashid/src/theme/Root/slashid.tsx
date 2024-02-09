/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useCallback } from "react";

import useIsBrowser from "@docusaurus/useIsBrowser";
import { ConfigurationProvider, Form } from "@slashid/react";
import { User } from "@slashid/slashid";

import { SlashIDConfigurationProviderConfig } from "../../domain";
import { AuthContext } from "./auth-context";
import styles from "./slashid.module.css";

type Props = {
  configuration: SlashIDConfigurationProviderConfig;
};

// SlashID docs depend on this
export const STORAGE_KEY = "MY_USER_TOKEN";

export function SlashID({ configuration }: Props) {
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

  return (
    <ConfigurationProvider factors={configuration.factors} storeLastHandle>
      <main className={styles.slashid}>
        <Form className={styles.form} onSuccess={handleSuccess} />
      </main>
    </ConfigurationProvider>
  );
}
