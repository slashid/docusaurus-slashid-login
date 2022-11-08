/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { createContext, useMemo } from "react";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextState {
  showLogin: boolean;
  setShowLogin: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextState>({
  showLogin: false,
  setShowLogin: () => null,
});
AuthContext.displayName = "AuthContext";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [showLogin, setShowLogin] = React.useState(false);

  const contextValue = useMemo(
    () => ({ showLogin, setShowLogin }),
    [showLogin]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
