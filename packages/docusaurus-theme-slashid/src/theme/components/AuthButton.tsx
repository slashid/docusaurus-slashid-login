/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import Button from "../Root/Button";

export default function AuthButton() {
  const handleClick = React.useCallback(async () => {
    console.log("Clicked auth button");
  }, []);

  return <Button isSmall isSecondary onClick={handleClick} label={"Log in"} />;
}
