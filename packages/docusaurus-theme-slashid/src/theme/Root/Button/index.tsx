/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { FC } from "react";

import Spinner, { SpinnerColorType } from "../Spinner";
import css from "./button.module.css";
import GoogleSvg from "./google.svg";

interface Props {
  id?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSecondary?: boolean;
  isSmall?: boolean;
  isGoogle?: boolean;
  label: string;
  onClick?: () => void;
}

const Button: FC<Props> = ({
  id,
  isDisabled,
  isLoading,
  isSecondary,
  isSmall,
  isGoogle,
  label,
  onClick,
}) => {
  return (
    <button
      className={`${css.host} ${isSecondary ? css.secondary : ""} ${
        isLoading ? css.loading : ""
      } ${isSmall ? css.small : ""}`}
      disabled={isDisabled}
      id={id}
      onClick={onClick}
      tabIndex={1}
    >
      <span
        className={`${isLoading ? css.invisible : ""} ${
          isGoogle ? css.google : ""
        }`}
      >
        {isGoogle ? (
          <div>
            <GoogleSvg />
          </div>
        ) : null}
        {label}
      </span>
      {isLoading && (
        <div className={css.spinnerWrapper}>
          <Spinner color={SpinnerColorType.Light} size={16} />
        </div>
      )}
    </button>
  );
};

export default Button;
