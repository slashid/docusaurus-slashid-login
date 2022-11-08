/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import ComponentTypes from "@theme-init/NavbarItem/ComponentTypes";

import AuthButton from "../components/AuthButton";

const newTypes = Object.assign({}, ComponentTypes, {
  "custom-AuthButton": AuthButton,
});

export default newTypes;
