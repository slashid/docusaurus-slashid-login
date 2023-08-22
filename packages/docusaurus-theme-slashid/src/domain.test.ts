/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { shouldPathRender } from "./domain";

const TEST_USER = { getGroups: () => [] };

describe("domain", () => {
  describe("shouldPathRender", () => {
    test("should return true if no privatePaths", () => {
      expect(shouldPathRender("/foo", undefined, undefined)).toBe(true);
    });

    test("should return true if no path", () => {
      expect(shouldPathRender(undefined, [{ path: "/foo" }], undefined)).toBe(
        true
      );
    });

    test("should return false if no user and the path matches", () => {
      expect(shouldPathRender("/foo", [{ path: "/foo" }], undefined)).toBe(
        false
      );
    });

    test("should return true if a user is present and no groups are required", () => {
      // @ts-expect-error cannot import User for some reason
      expect(shouldPathRender("/foo", [{ path: "/foo" }], TEST_USER)).toBe(
        true
      );
    });

    test("should return true if a user is present and the user has the required groups", () => {
      expect(
        // @ts-expect-error cannot import User for some reason
        shouldPathRender("/foo", [{ path: "/foo", groups: ["bar"] }], {
          getGroups: () => ["bar"],
        })
      ).toBe(true);
    });

    test("should return false if a user is present and the user does not have the required groups", () => {
      expect(
        // @ts-expect-error cannot import User for some reason
        shouldPathRender("/foo", [{ path: "/foo", groups: ["bar"] }], {
          getGroups: () => [],
        })
      ).toBe(false);
    });

    test("should return false if a user is not present and the provided regex matches", () => {
      expect(
        shouldPathRender("/foo/bar", [{ path: /^\/foo/ }], undefined)
      ).toBe(false);
    });
  });
});
