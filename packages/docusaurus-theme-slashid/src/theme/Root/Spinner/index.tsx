/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { FC } from 'react';

import css from './spinner.module.css';

export enum SpinnerColorType {
  Light = 'light',
  Blue = 'blue',
}

interface Props {
  color: SpinnerColorType;
  isBig?: boolean;
  size: number;
}

const Spinner: FC<Props> = ({ color, isBig, size }) => {
  return (
    <div
      className={`${css.host} ${css[color]} ${isBig ? css.big : ''}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ width: `${size}px`, height: `${size}px` }} />
      ))}
    </div>
  );
};

export default Spinner;
