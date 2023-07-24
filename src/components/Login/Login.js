import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Register/Register.css';
import logo from '../../images/logo.svg';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validateEmail } from '../../utils/validation';


function Login(props) {

  const { values, handleChange, errors, isValid } = useFormValidation();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }
    props.onLogin(values);
  };

  return (
    <section className="register">
      <div className="register__zone">
        <img className="register__logo" alt="Лого" src={logo} />
        <h2 className="register__header">Рады видеть!</h2>
        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className="register__input-header">
            E-mail
          </label>
          <input
            className="register__form-input"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            id="email"
            autoComplete="off"
            type="email"
            minLength="2"
            maxLength="70"
            required
          />
          <span
            className={`register__input-error ${isValid ? '' : 'register__input-error_active'
              }`}>
            {validateEmail(values.email).error}
          </span>
          <label htmlFor="password" className="register__input-header">
            Пароль
          </label>
          <input
            className="register__form-input"
            name="password"
            value={values.password || ''}
            onChange={handleChange}
            id="password"
            autoComplete="off"
            type="password"
            minLength="2"
            maxLength="40"
            required
          />
          <span
            className={`register__input-error ${isValid ? '' : 'register__input-error_active'
              }`}>
            {errors.password}
          </span>
          <button

            className={`register__button register__button_login ${isValid && validateEmail(values.email).activeButton
              ? ''
              : 'register__button_disabled'
              }`}
            type="submit">
            Войти
          </button>
          <p className="register__registration">
            Ещё не зарегистрированы?{' '}
            <Link to="/signup" className="register__enter">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
export default Login;