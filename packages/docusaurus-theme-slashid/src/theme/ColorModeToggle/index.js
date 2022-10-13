/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from 'react';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

//import ColorModeToggle from '@theme-original/ColorModeToggle';

const logout = () => {
    if (ExecutionEnvironment.canUseDOM) {
        window.localStorage.removeItem('MY_USER_TOKEN');
        window.location.reload()
    }
};

//WARNING: we are abusing the theme here to add a logout button
export default function ColorModeToggleWrapper(props) {

  //      <ColorModeToggle {...props} />
  return (
    <>
      <a style={{marginRight: 15, cursor: "pointer", color: '#222222'}} onClick={() => logout()}>
        Logout
      </a>
    </>
  );
}

