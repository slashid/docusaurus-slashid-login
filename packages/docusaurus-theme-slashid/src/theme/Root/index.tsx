/* ============================================================================
 * Copyright (c) SlashID
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from 'react';

import * as slashid from '@slashid/slashid';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import Button from './Button';
import Dropdown from './Dropdown';
import ChevronLeft from './Icons/ChevronLeft';
import Logo from './Icons/Logo';
import Input from './Input';
import css from './login.module.css';
import PhoneNumberInput from './PhoneNumberInput';
import Spinner, { SpinnerColorType } from './Spinner';
import Toast from './Toast';
import {filterOutOptions, useValidateEmail, useValidateNumber, getErrorMessage, getMethodText} from './utils';
import './reset.css';
import './globals.css';
    
// Default implementation, that you can customize
export default function Root({children} : any) {

  const { validateEmail } = useValidateEmail();
  const { validateNumber } = useValidateNumber();

  const [identifierType, setIdentifierType] = React.useState<string>('email_address');
  const identifierOptions = ['phone_number', 'email_address'];


  const [inputValue, setInputValue] = React.useState('');
  const [dropdownOptions, setDropdownOptions] = React.useState<undefined | string[]>(
    undefined
  );

  const [isLoadingDropdownOptions, setIsLoadingDropdownOptions] =
    React.useState(false);
  const [chosenOption, setChosenOption] = React.useState<undefined | string>(
    undefined
  );

  const [isLoginLoading, setIsLoginLoading] = React.useState(false);

  const [isVerificationStep, setIsVerificationStep] = React.useState(false);
  const [otpInputValue, setOtpInputValue] = React.useState('');

  const [canResendEmail, setCanResendEmail] = React.useState(true);
  const [isAllow, setIsAllow] = React.useState(false);

  let user = undefined
  

  const getAvailableMethods = async (identifier: string) => {
    
        if (!window) {
            return;
        }
        
        const sid = new slashid.SlashID();

        // @ts-ignore
        const methods = await sid.getAvailableAuthenticationMethods(identifier);

        // @ts-ignore
        setDropdownOptions(methods);

        if (window.localStorage.getItem('USER_IDENTIFIER') !== '' && 
              window.localStorage.getItem('USER_IDENTIFIER') !== null) {
            setInputValue(window.localStorage.getItem('USER_IDENTIFIER') as string)
        }

        setIsLoadingDropdownOptions(false);
  };


  const getOtp = async () => {
    return new Promise((resolve) => {
      (document.getElementById('otp') as HTMLElement).onclick = () => {
        resolve(
          (document.getElementById('otp_value') as HTMLInputElement).value
        );
      };
    });
  };

  const resetValues = () => {
    setIdentifierType('email_address');
    setChosenOption(undefined);
    setInputValue('');
    setDropdownOptions(undefined);
    setIsLoginLoading(false);
  };

  const triggerIdentifierChange = (e: string) => {
    setIdentifierType(e);
    getAvailableMethods(e);
    setChosenOption(undefined);
  };

  const triggerLogin = async () => {
    if (window) {
        
        const sid = new slashid.SlashID();

        setIsLoginLoading(true);

        try {
            setIsVerificationStep(true);

            const user = await sid.id(
            'f978a6bd-3e45-bcda-cb4e-573d0bad155b',
            {
                // @ts-ignore
                type: identifierType,
                value: inputValue,
            },
            {
                method: chosenOption,
                options: {
                    getOTP: getOtp, // only needed for "otp_via_sms", ignored otherwise
                    attachment: "platform" //only needed for "webauthn"
                },
            }
            );

            window.localStorage.setItem('USER_IDENTIFIER', inputValue);

            resetValues();

            window.localStorage.setItem('MY_USER_TOKEN', user.token);
            setIsAllow(true);

        } catch (error: any) {
            setIsLoginLoading(false);
            showErrorToast(getErrorMessage(error.statusText), 3000);
        }
    }
    return;
  };

  const checkIfButtonShouldBeDisabled = () => {
    if (inputValue !== '') {
      if (
        ((inputValue.includes('@') && validateEmail(inputValue)) ||
          (inputValue.includes('+') && validateNumber(inputValue))) &&
        chosenOption !== undefined
      ) {
        return false;
      } else {
        return true;
      }
    }

    return true;

  };

  React.useEffect(() => {
    getAvailableMethods(identifierType);
  }, [identifierType]);

  const loginDirectIdIfPresent = async () => {
    const sid = new slashid.SlashID();
    let tempUser = undefined;

    try {
      tempUser = await sid.getUserFromURL();
    }catch(e) {
      return false; 
    }

    if (tempUser !== null && tempUser !== undefined) {
      user = tempUser;
      window.localStorage.setItem('MY_USER_TOKEN', user.token);
      setIsAllow(true);
      return true
    }
    return false
  }

  React.useEffect(() => {
    loginDirectIdIfPresent();
  }, [user])

  const validateToken = async (token: string) => {
    let tempUser = new slashid.User(token);
    let ret = await tempUser.validateToken(); 
    if(ret.valid) {
        user = new slashid.User(token);;
        setIsAllow(true);
        return true;
    }
    return false;
  }

  React.useEffect(() => {
    const isAllowed = () => {
        if (isAllow === true) {
            return true; 
        }

        if (window) {    
            const prevToken = window.localStorage.getItem("MY_USER_TOKEN");
            if (prevToken) { 
                return validateToken(prevToken);               
            } 
        }
        return false
    }
    isAllowed();
  }, [isAllow])

  const showToast = (message: string, duration: number | undefined) => {
    toast.custom(() => <Toast message={message} />, {
        duration: duration ? duration : 3000,
    });
    };

const showErrorToast = showToast;

return (
  <React.Fragment>
    {isAllow ? (
      <>{children}</>
    ) : (
      <div className={css.host} id="login_container">
      <Toaster
      position='bottom-center'
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spinner color={SpinnerColorType.Blue} isBig size={48} />
            </div>

            <div style={{ width: '100%', paddingBottom: '48px' }} />

            <p className={css.title}>Credentials confirmation</p>
            <p className={css.description}>{getMethodText(chosenOption!)}</p>
            <p className={css.description}>
              After interacting with the confirmation, please come back to this
              screen to proceed.
            </p>
            {chosenOption === 'otp_via_sms' && (
              <>
                <div style={{ width: '100%', paddingBottom: '24px' }} />
                <div className={css.otpButtonContainer}>
                  <Input
                    id='otp_value'
                    placeholder='Insert your OTP here'
                    value={otpInputValue}
                    onChange={(e) => setOtpInputValue(e.target.value)}
                    autoFocus={true}
                  />
                  <Button
                    isDisabled={otpInputValue === ''}
                    label='Submit OTP'
                    id='otp'
                  />
                </div>
              </>
            )}

            <div className={css.divider} />
            <p className={css.verificationInfo}>
              Confirmation not received?{' '}
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
              chosenOption={identifierType}
              options={identifierOptions}
              label='Identifier type'
              optionPlaceholder='Select an identifier type'
            />

            <div style={{ width: '100%', paddingTop: '24px' }} />

            {identifierType === 'email_address' && (
              <Input
                label='Email address'
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Insert your email address'
                value={inputValue}
              />
            )}

            {identifierType === 'phone_number' && (
              <PhoneNumberInput
                label='Phone number'
                onChange={setInputValue}
                placeholder='Insert your phone number'
                value={inputValue}
              />
            )}

            <div style={{ width: '100%', paddingTop: '24px' }} />

            <Dropdown
              changeChosenOption={setChosenOption}
              chosenOption={chosenOption}
              options={filterOutOptions(identifierType, dropdownOptions)}
              label=' Authentication method'
              optionPlaceholder={
                isLoadingDropdownOptions
                  ? 'Loading authentication methods'
                  : 'Select an authentication method'
              }
            />

            <div style={{ width: '100%', paddingTop: '32px' }} />

            <Button
              isLoading={isLoginLoading}
              label='Log in'
              isDisabled={checkIfButtonShouldBeDisabled()}
              onClick={triggerLogin}
            />
          </>
        )}
      </div>
    </div>
    )}
  </React.Fragment>
);
}