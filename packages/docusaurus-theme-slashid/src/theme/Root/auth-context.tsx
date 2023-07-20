/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { createContext, useMemo, useState } from "react";

export type AuthContextValue = {
  showLogin: boolean;
  setShowLogin: (b: boolean) => void;
};

export const AuthContext = createContext<AuthContextValue>({
  showLogin: false,
  setShowLogin: (b) => undefined,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [showLogin, setShowLogin] = useState(false);

  const value = useMemo(() => ({ showLogin, setShowLogin }), [showLogin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = "SlashIDContext";
