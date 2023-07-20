/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { useSlashID } from "@slashid/react";

import { AuthContext } from "../Root/auth-context";
import { STORAGE_KEY } from "../Root/slashid";
import css from "./auth-button.module.css";

export default function AuthButton() {
  const { user, logOut } = useSlashID();
  const { setShowLogin } = React.useContext(AuthContext);

  const handleClick = React.useCallback(async () => {
    const isLoggedIn = Boolean(user);

    if (isLoggedIn) {
      await logOut();
      window.localStorage.removeItem(STORAGE_KEY);
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [logOut, setShowLogin, user]);

  return (
    <div className={css.host}>
      <button className={css.button} type="button" onClick={handleClick}>
        {!user ? "Log in" : "Log out"}
      </button>
    </div>
  );
}
