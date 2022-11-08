/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { useSlashId } from "../Root/auth-context";
import Button from "../Root/Button";

export default function AuthButton() {
  const { user, logout } = useSlashId();

  const handleClick = React.useCallback(async () => {
    const isLoggedIn = Boolean(user);

    if (isLoggedIn) {
      await logout();
      console.log("logged out");
    } else {
      console.log("Clicked");
    }
  }, [logout, user]);

  return (
    <Button
      isSmall
      isSecondary
      onClick={handleClick}
      label={!user ? "Log in" : "Log out"}
    />
  );
}
