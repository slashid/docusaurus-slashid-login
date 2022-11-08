/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { useSlashId, STORAGE_IDENTIFIER_KEY } from "../Root/auth-context";
import Button from "../Root/Button";
import css from "./auth-button.module.css";

export default function AuthButton() {
  const { user, setShowLogin, logout } = useSlashId();
  const identifier = window.localStorage.getItem(STORAGE_IDENTIFIER_KEY) || "";

  const handleClick = React.useCallback(async () => {
    const isLoggedIn = Boolean(user);

    if (isLoggedIn) {
      await logout();
    } else {
      setShowLogin(true);
    }
  }, [logout, setShowLogin, user]);

  return (
    <div className={css.host}>
      <p>{user && identifier ? identifier : null}</p>
      <Button
        isSmall
        isSecondary
        onClick={handleClick}
        label={!user ? "Log in" : "Log out"}
      />
    </div>
  );
}
