/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { FC } from 'react';

import css from './modal.module.css';

interface Props {
  children: React.ReactNode;
  title: string;
}

const Modal: FC<Props> = ({ children, title }) => {
  return (
    <div className={css.host}>
      <p className={css.title}>{title}</p>
      {children}
    </div>
  );
};

export default Modal;
