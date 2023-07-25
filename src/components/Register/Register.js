import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import { validateEmail, validateName } from '../../utils/validation';
import { useFormValidation } from '../../hooks/useFormValidation';

function Register(props) {

  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormValidation();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(values);
  };

  React.useEffect(() => {
    if (props.loggedIn) {
      navigate('/movies');
    }
  }, [props.loggedIn, navigate]);

  return (
    <section className="register">
      <div className="register__zone">
        <Link to="/" className="register__logo-link">
          <img className="register__logo" alt="Лого" src={logo} />
        </Link>
        <h2 className="register__header">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name" className="register__input-header">
            Имя
          </label>
          <input
            className="register__form-input"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
            id="name"
            autoComplete="off"
            type="name"
            minLength="2"
            maxLength="70"
            required
          />
          <span
            className={`register__input-error ${isValid ? '' : 'register__input-error_active'
              }`}>
            {validateName(values.name).error}
          </span>
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
            className={`register__api-error ${props.serverError ? '' : 'register__api-error_disabled'
              }`}>
            {props.serverError?.error}
          </span>


          <button
            className={`register__button ${isValid &&
              validateEmail(values.email).activeButton &&
              validateName(values.name).activeButton
              ? ''
              : 'register__button_disabled'
              }`}
            type="submit">
            Зарегистрироваться
          </button>
          <p className="register__registration">
            Уже зарегистрированы?
            <Link to="/signin" className="register__enter">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
export default Register;