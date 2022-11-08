/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import useIsBrowser from "@docusaurus/useIsBrowser";
import { SlashID, User } from "@slashid/slashid";

export interface SlashIDProviderProps {
  oid: string;
  oidcClientID?: string;
  oidcProvider?: string;
  children: React.ReactNode;
}

export interface ISlashIDContext {
  sid: SlashID | undefined;
  user: User | undefined;
  showLogin: boolean;
  setShowLogin: (b: boolean) => void;
  logout: () => void;
  login: (args: any) => Promise<User | null>;
  sso: () => Promise<User | null>;
  validateToken: (token: string) => Promise<boolean>;
}

export const SlashIDContext = createContext<ISlashIDContext>({
  sid: undefined,
  user: undefined,
  showLogin: false,
  setShowLogin: (b) => undefined,
  logout: () => undefined,
  login: () => Promise.reject("NYI"),
  sso: () => Promise.reject("NYI"),
  validateToken: (t) => Promise.resolve(false),
});
SlashIDContext.displayName = "SlashIDContext";

const STORAGE_KEY = "MY_USER_TOKEN";
export const STORAGE_IDENTIFIER_KEY = "USER_IDENTIFIER";

export const SlashIDProvider: React.FC<SlashIDProviderProps> = ({
  oid,
  oidcClientID,
  oidcProvider,
  children,
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const isBrowser = useIsBrowser();
  const [sid, setSid] = useState<SlashID | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  const storeUser = React.useCallback(
    (newUser: User) => {
      if (isBrowser) {
        window.localStorage.setItem(STORAGE_KEY, newUser.token);
        const event = new CustomEvent("slashId:login", {
          detail: { token: newUser.token },
        });
        window.dispatchEvent(event);
        setUser(newUser);
      }
    },
    [isBrowser]
  );

  const logout = useCallback(() => {
    if (isBrowser) {
      setUser(undefined);
      setShowLogin(false);
      const event = new Event("slashId:logout");
      window.dispatchEvent(event);
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [isBrowser]);

  const login = useCallback(
    async ({ factor, options }: { factor: unknown; options: unknown }) => {
      if (sid && isBrowser) {
        // @ts-ignore
        const user = await sid.id(oid, factor, options);

        storeUser(user);
        // @ts-ignore
        window.localStorage.setItem(STORAGE_IDENTIFIER_KEY, factor.value);

        setShowLogin(false);
        return user;
      } else {
        return null;
      }
    },
    [sid, isBrowser, oid, storeUser]
  );

  const sso = useCallback(async () => {
    if (isBrowser && sid && oidcClientID && oidcProvider) {
      // @ts-expect-error TODO identifier should be nullable
      const user = await sid.id(oid, null, {
        method: "oidc",
        options: {
          client_id: oidcClientID,
          provider: oidcProvider,
          ux_mode: "popup",
        },
      });

      storeUser(user);
      setShowLogin(false);
      return user;
    } else {
      return null;
    }
  }, [isBrowser, oid, oidcClientID, oidcProvider, sid, storeUser]);

  const validateToken = useCallback(
    async (token: string): Promise<boolean> => {
      if (isBrowser) {
        let tempUser = new User(token);
        let ret = await tempUser.validateToken();
        if (ret.valid) {
          storeUser(tempUser);
          return true;
        }
        window.localStorage.removeItem(STORAGE_KEY);
        return false;
      }
      return false;
    },
    [isBrowser, storeUser]
  );

  useEffect(() => {
    if (isBrowser) {
      const slashId = new SlashID();
      setSid(slashId);
    }
  }, [isBrowser]);

  useEffect(() => {
    if (sid && isBrowser) {
      const loginDirectIdIfPresent = async () => {
        try {
          const tempUser = await sid.getUserFromURL();
          if (tempUser) {
            storeUser(tempUser);
          }
        } catch (e) {
          console.log(e);
          return;
        }
      };

      const loginStoredToken = async (): Promise<boolean> => {
        const storedToken = window.localStorage.getItem(STORAGE_KEY);
        if (storedToken) {
          return await validateToken(storedToken);
        } else {
          return false;
        }
      };

      const tryImmediateLogin = async () => {
        const loggedInStoredUser = await loginStoredToken();
        if (!loggedInStoredUser) {
          await loginDirectIdIfPresent();
        }
      };

      tryImmediateLogin();
    }
  }, [isBrowser, logout, sid, storeUser, validateToken]);

  const contextValue = useMemo(
    () => ({
      sid,
      user,
      showLogin,
      setShowLogin,
      logout,
      login,
      sso,
      validateToken,
    }),
    [sid, user, showLogin, logout, sso, login, validateToken]
  );

  return (
    <SlashIDContext.Provider value={contextValue}>
      {children}
    </SlashIDContext.Provider>
  );
};

export function useSlashId() {
  const contextValue = React.useContext(SlashIDContext);

  return contextValue;
}
