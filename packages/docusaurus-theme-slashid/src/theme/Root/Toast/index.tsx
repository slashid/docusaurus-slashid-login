/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { FC } from 'react';

import css from './toast.module.css';

interface Props {
  message: string;
}

const Toast: FC<Props> = ({ message }) => (
  <div className={css.host}>
    <span className={css.message}>{message}</span>
  </div>
);

export default Toast;
