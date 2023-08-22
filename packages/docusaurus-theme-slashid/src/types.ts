/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { OAuthProvider } from "@slashid/slashid";

export interface PrivatePath {
  path: string | RegExp;
  groups?: string[];
}
export interface ThemeConfig {
  slashID?: {
    orgID: string;
    oidcClientID?: string;
    oidcProvider?: OAuthProvider;
    forceLogin?: boolean;
    baseURL?: string;
    sdkURL?: string;
    privatePaths?: PrivatePath[];
    privateRedirectPath?: string;
  };
}
