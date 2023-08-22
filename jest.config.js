/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/packages/docusaurus-theme-slashid/src"],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  moduleDirectories: ["node_modules"],
  transformIgnorePatterns: ["^.+\\.js$"],
};
