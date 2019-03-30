import Button from 'components/Button';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { MDCTextField } from '@material/textfield/index';

const loginPage = () => {
  React.useEffect(() => {
    const textFields = document.querySelectorAll('.mdc-text-field');
    // @ts-ignore
    for (const textField of textFields) {
      MDCTextField.attachTo(textField);
    }
  },              []);

  const forwardArrow = () => {
    return (
      <React.Fragment>
        <NavLink to={'/register'}>
      <span className="register-toolbar-actions">
        <div className="register__logo">
          <span className="product-logo-text">Register</span>
        </div>
          <Button
            type="button"
            name="arrow_forward"
            classes="mdc-icon-button material-icons"
            aria_label="Go back to login page"
          />
      </span>
        </NavLink>
      </React.Fragment>
    );
  };

  const backArrow = () => {
    return (
      <React.Fragment>
        <NavLink to={'/'}>
          <span className="register-toolbar-actions">
            <Button
              type="button"
              name="arrow_back"
              classes="mdc-icon-button material-icons"
              aria_label="Go back to home page"
            />
            <div className="register__logo">
              <span className="product-logo-text">Home</span>
            </div>
          </span>
        </NavLink>
      </React.Fragment>
    );
  };

  return (
    <div>
      <div className="register">
        <header>
          {backArrow()}
          <div className="mini-account-menu">
            <div className="mini-account-menu--desktop">
              {forwardArrow()}
            </div>
            <div className="mini-account-menu--mobile">
              {forwardArrow()}
            </div>
          </div>
        </header>
        <div className="mdc-layout-grid">
          <div className="mdc-layout-grid__inner">
            <div
              className="mdc-layout-grid__cell grid-start-5 mdc-layout-grid__cell--span-4-desktop-hd
                        mdc-layout-grid__cell--span-6-tablet mdc-layout-grid__cell--span-7-desktop
                        mdc-layout-grid__cell--align-middle">
              <h1 className="headline-2">Login into account</h1>
            </div>
            <div
              className="mdc-layout-grid__cell register__section grid-start-5
                        mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-4-desktop
                        mdc-layout-grid__cell--align-middle">
              <div className="form-grid">
                <div className="form-cell">
                  <div className="mdc-text-field mdc-text-field--outlined mdc-text-field--fullwidth
                                mdc-text-field--with-leading-icon">
                    <i className="material-icons mdc-text-field__icon">alternate_email</i>
                    <input id="1" placeholder="" aria-controls="1-helper-text"
                           aria-describedby="1-helper-text" required={true}
                           type="text" className="mdc-text-field__input"/>
                    <div className="mdc-notched-outline mdc-notched-outline--upgraded">
                      <div className="mdc-notched-outline__leading"/>
                      <div className="mdc-notched-outline__notch"><label
                        htmlFor="1" className="mdc-floating-label">Username</label></div>
                      <div className="mdc-notched-outline__trailing"/>
                    </div>
                  </div>
                  <p id="1-helper-text" aria-hidden="true"
                     className="mdc-text-field-helper-text
                                   mdc-text-field-helper-text--validation-msg">
                    Username is required</p>
                </div>

                <div className="form-cell">
                  <div>
                    <div className="mdc-text-field mdc-text-field--outlined
                                        mdc-text-field--fullwidth
                                        mdc-text-field--with-leading-icon">
                      <i className="material-icons mdc-text-field__icon">remove_red_eye</i>
                      <input id="3" placeholder="" aria-controls="3-helper-text"
                             aria-describedby="2-helper-text" required={true}
                             type="password" className="mdc-text-field__input"/>
                      <div className="mdc-notched-outline mdc-notched-outline--upgraded">
                        <div className="mdc-notched-outline__leading"/>
                        <div className="mdc-notched-outline__notch"><label
                          htmlFor="3" className="mdc-floating-label">Password</label>
                        </div>
                        <div className="mdc-notched-outline__trailing"/>
                      </div>
                    </div>
                    <p id="3-helper-text" aria-hidden="true"
                       className="mdc-text-field-helper-text
                                       mdc-text-field-helper-text--validation-msg">
                      Password is required</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mdc-layout-grid__cell register__section grid-start-5
                        mdc-layout-grid__cell--span-5-tablet mdc-layout-grid__cell--span-4-desktop
                        mdc-layout-grid__cell--align-middle">
              <div className="form-grid">
                <div className="">
                  <Button
                    type="button"
                    name="Login"
                    id="cc-register"
                    classes="mdc-button big-round-corner-button mdc-button--raised"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
