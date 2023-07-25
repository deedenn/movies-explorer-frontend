import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Register/Register.css';
import logo from '../../images/logo.svg';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validateEmail } from '../../utils/validation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <section className="register">
      <div className="register__zone">
        <Link to="/" className="register__logo-link">
          <img className="register__logo" alt="Лого" src={logo} />
        </Link>
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
          <span
            className={`register__api-error ${
              props.serverError ? '' : 'register__api-error_disabled'
            }`}>
            {props.serverError.error}
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