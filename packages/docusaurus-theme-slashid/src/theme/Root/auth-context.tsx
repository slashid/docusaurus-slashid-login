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
  children: React.ReactNode;
}

export interface ISlashIDContext {
  sid: SlashID | undefined;
  user: User | undefined;
  logout: () => void;
  login: (args: any) => Promise<User | null>;
  validateToken: (token: string) => Promise<boolean>;
}

export const SlashIDContext = createContext<ISlashIDContext>({
  sid: undefined,
  user: undefined,
  logout: () => undefined,
  login: () => Promise.reject("NYI"),
  validateToken: (t) => Promise.resolve(false),
});
SlashIDContext.displayName = "SlashIDContext";

const STORAGE_KEY = "MY_USER_TOKEN";
export const STORAGE_IDENTIFIER_KEY = "USER_IDENTIFIER";

export const SlashIDProvider: React.FC<SlashIDProviderProps> = ({
  oid,
  children,
}) => {
  const isBrowser = useIsBrowser();
  const [sid, setSid] = useState<SlashID | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  const storeUser = (newUser: User) => {
    setUser(newUser);
    window.localStorage.setItem(STORAGE_KEY, newUser.token);
  };

  const logout = useCallback(() => {
    setUser(undefined);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    async ({ factor, options }: { factor: unknown; options: unknown }) => {
      if (sid) {
        // @ts-ignore
        const user = await sid.id(oid, factor, options);

        storeUser(user);
        // @ts-ignore
        window.localStorage.setItem(STORAGE_IDENTIFIER_KEY, factor.value);

        return user;
      } else {
        return null;
      }
    },
    [oid, sid]
  );

  const validateToken = useCallback(async (token: string): Promise<boolean> => {
    let tempUser = new User(token);
    let ret = await tempUser.validateToken();
    if (ret.valid) {
      const newUser = new User(token);
      setUser(newUser);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (isBrowser) {
      const slashId = new SlashID();
      setSid(slashId);
    }
  }, [isBrowser]);

  useEffect(() => {
    if (sid && window) {
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

      // listen for logout
      window.addEventListener("slashId:logout", logout);

      return () => window.removeEventListener("slashId:logout", logout);
    }

    return () => null;
  }, [logout, sid, validateToken]);

  const contextValue = useMemo(
    () => ({ sid, user, logout, login, validateToken }),
    [sid, user, logout, login, validateToken]
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
