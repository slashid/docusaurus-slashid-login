/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import useIsBrowser from "@docusaurus/useIsBrowser";
import { useSlashID } from "@slashid/react";

import { AuthContext } from "../Root/auth-context";
import Button from "../Root/Button";

function BrowserImplementation() {
  const { user, logOut } = useSlashID();
  const { showLogin, setShowLogin } = React.useContext(AuthContext);

  console.log("Browser implementation", {
    user,
    showLogin,
  });

  const handleClick = React.useCallback(async () => {
    const isLoggedIn = Boolean(user);

    if (isLoggedIn) {
      await logOut();
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [logOut, setShowLogin, user]);

  return (
    <Button
      isSmall
      isSecondary
      onClick={handleClick}
      label={!user ? "Log in" : "Log out"}
    />
  );
}

function ServerImplementation() {
  console.log("Server implementation");

  return <Button isSmall isSecondary label={"Log in"} />;
}

export default function AuthButton() {
  const isBrowser = useIsBrowser();

  return isBrowser ? <BrowserImplementation /> : <ServerImplementation />;
}
