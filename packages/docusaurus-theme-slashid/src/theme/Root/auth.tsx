/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import useIsBrowser from "@docusaurus/useIsBrowser";
import { useSlashID } from "@slashid/react";
import { PersonHandleType } from "@slashid/slashid";
import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "./auth-context";
import Button from "./Button";
import Dropdown from "./Dropdown";
import ChevronLeft from "./Icons/ChevronLeft";
import Logo from "./Icons/Logo";
import Input from "./Input";
import css from "./login.module.css";
import PhoneNumberInput from "./PhoneNumberInput";
import Spinner, { SpinnerColorType } from "./Spinner";
import Toast from "./Toast";
import {
  filterOutOptions,
  getMethodText,
  getErrorMessage,
  useValidateEmail,
  useValidateNumber,
} from "./utils";

// TODO we could expose the constant or provide a getter in the SDK
const STORAGE_IDENTIFIER_KEY = "@slashid/IDENTIFIERS";

export const Auth: React.FC = () => {
  const { sid, logIn, user } = useSlashID();
  const { showLogin, setShowLogin } = useAuth();
  const isBrowser = useIsBrowser();
  const [inputValue, setInputValue] = React.useState("");
  const [isLoadingDropdownOptions, setIsLoadingDropdownOptions] =
    React.useState(false);
  const [isVerificationStep, setIsVerificationStep] = React.useState(false);
  const [isLoginLoading, setIsLoginLoading] = React.useState(false);
  const [chosenOption, setChosenOption] = React.useState<undefined | string>(
    undefined
  );
  const [identifierType, setIdentifierType] = React.useState<PersonHandleType>(
    PersonHandleType.EmailAddress
  );
  const identifierOptions = ["phone_number", "email_address"];
  const [dropdownOptions, setDropdownOptions] = React.useState<
    undefined | string[]
  >(undefined);
  const [otpInputValue, setOtpInputValue] = React.useState("");
  const [canResendEmail, setCanResendEmail] = React.useState(true);

  const { validateEmail } = useValidateEmail();
  const { validateNumber } = useValidateNumber();

  console.log("Auth rendered", { sid, showLogin, user });

  const showErrorToast = (message: string, duration: number | undefined) => {
    toast.custom(() => <Toast message={message} />, {
      duration: duration ? duration : 3000,
    });
  };

  const getAvailableMethods = React.useCallback(
    async (identifier: PersonHandleType) => {
      if (!isBrowser || !sid) {
        return;
      }

      // @ts-ignore
      const methods = await sid.getAvailableAuthenticationMethods(identifier);

      // @ts-ignore
      setDropdownOptions(methods);

      console.log("Window in getAvailableMethods");
      const existingIdentifier = window.localStorage.getItem(
        STORAGE_IDENTIFIER_KEY
      );
      if (existingIdentifier) {
        console.log("Window after existingIdentifier");
        setInputValue(
          window.localStorage.getItem(STORAGE_IDENTIFIER_KEY) as string
        );
      }

      setIsLoadingDropdownOptions(false);
    },
    [isBrowser, sid]
  );

  React.useEffect(() => {
    if (!isBrowser || !sid) {
      return;
    }

    getAvailableMethods(identifierType);
  }, [identifierType, sid, isBrowser, getAvailableMethods]);

  if (!sid) {
    return null;
  }

  const getOtp = async () => {
    return new Promise((resolve) => {
      (document.getElementById("otp") as HTMLElement).onclick = () => {
        resolve(
          (document.getElementById("otp_value") as HTMLInputElement).value
        );
      };
    });
  };

  const resetValues = () => {
    setIdentifierType(PersonHandleType.EmailAddress);
    setChosenOption(undefined);
    setInputValue("");
    setDropdownOptions(undefined);
    setIsLoginLoading(false);
  };

  const triggerIdentifierChange = (e: PersonHandleType) => {
    setIdentifierType(e);
    getAvailableMethods(e);
    setChosenOption(undefined);
  };

  const triggerLogin = async () => {
    console.log("Window in triggerLogin");
    if (window) {
      setIsLoginLoading(true);

      try {
        setIsVerificationStep(true);

        await logIn({
          handle: {
            type: identifierType,
            value: inputValue,
          },
          factor: {
            // @ts-expect-error TODO better type support
            method: chosenOption,
            options: {
              // @ts-expect-error TODO better type support
              getOTP: getOtp, // only needed for "otp_via_sms", ignored otherwise
              attachment: "platform", //only needed for "webauthn"
            },
          },
        });
        setShowLogin(false);

        resetValues();
      } catch (error: any) {
        setIsLoginLoading(false);
        showErrorToast(getErrorMessage(error.statusText), 3000);
      }
    }
    return;
  };

  const checkIfButtonShouldBeDisabled = () => {
    if (inputValue !== "") {
      if (
        ((inputValue.includes("@") && validateEmail(inputValue)) ||
          (inputValue.includes("+") && validateNumber(inputValue))) &&
        chosenOption !== undefined
      ) {
        return false;
      } else {
        return true;
      }
    }

    return true;
  };

  return (
    <div className={css.host} id="login_container">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerStyle={{ bottom: 24 }}
      />
      <div className={css.content}>
        <div className={css.header}>
          <i className={css.logo}>
            <Logo />
          </i>
          {isVerificationStep && (
            <button
              onClick={() => {
                setIsVerificationStep(false);
                setIsLoginLoading(false);
              }}
              className={css.goBackButton}
            >
              <i className={css.chevroLeft}>
                <ChevronLeft />
              </i>
              Go back
            </button>
          )}
        </div>

        {isVerificationStep ? (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner color={SpinnerColorType.Blue} isBig size={48} />
            </div>

            <div style={{ width: "100%", paddingBottom: "48px" }} />

            <p className={css.title}>Credentials confirmation</p>
            <p className={css.description}>{getMethodText(chosenOption!)}</p>
            <p className={css.description}>
              After interacting with the confirmation, please come back to this
              screen to proceed.
            </p>
            {chosenOption === "otp_via_sms" && (
              <>
                <div style={{ width: "100%", paddingBottom: "24px" }} />
                <div className={css.otpButtonContainer}>
                  <Input
                    id="otp_value"
                    placeholder="Insert your OTP here"
                    value={otpInputValue}
                    onChange={(e) => setOtpInputValue(e.target.value)}
                    autoFocus={true}
                  />
                  <Button
                    isDisabled={otpInputValue === ""}
                    label="Submit OTP"
                    id="otp"
                  />
                </div>
              </>
            )}

            <div className={css.divider} />
            <p className={css.verificationInfo}>
              Confirmation not received?{" "}
              <button
                onClick={() => {
                  setCanResendEmail(false);
                  triggerLogin();
                  setTimeout(() => setCanResendEmail(true), 10000);
                }}
                className={canResendEmail ? css.resendButton : css.disabled}
              >
                Send again.
              </button>
            </p>
          </>
        ) : (
          <>
            <h1 className={css.title}>Welcome to /id</h1>

            <Dropdown
              changeChosenOption={(e) => triggerIdentifierChange(e)}
              chosenOption={identifierType.toString()}
              options={identifierOptions}
              label="Identifier type"
              optionPlaceholder="Select an identifier type"
            />

            <div style={{ width: "100%", paddingTop: "24px" }} />

            {identifierType === PersonHandleType.EmailAddress && (
              <Input
                label="Email address"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Insert your email address"
                value={inputValue}
              />
            )}

            {identifierType === PersonHandleType.PhoneNumber && (
              <PhoneNumberInput
                label="Phone number"
                onChange={setInputValue}
                placeholder="Insert your phone number"
                value={inputValue}
              />
            )}

            <div style={{ width: "100%", paddingTop: "24px" }} />

            <Dropdown
              changeChosenOption={setChosenOption}
              chosenOption={chosenOption}
              options={filterOutOptions(
                identifierType.toString(),
                dropdownOptions
              )}
              label=" Authentication method"
              optionPlaceholder={
                isLoadingDropdownOptions
                  ? "Loading authentication methods"
                  : "Select an authentication method"
              }
            />

            <div style={{ width: "100%", paddingTop: "32px" }} />

            <Button
              isLoading={isLoginLoading}
              label="Log in"
              isDisabled={checkIfButtonShouldBeDisabled()}
              onClick={triggerLogin}
            />

            <div style={{ width: "100%", paddingTop: "16px" }} />

            <Button
              label="Cancel"
              isSecondary
              isSmall
              onClick={() => setShowLogin(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};
