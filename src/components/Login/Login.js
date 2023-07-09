import React from 'react';
import { Link } from 'react-router-dom';
import '../Register/Register.css';
import logo from '../../images/logo.svg';
function Login(props) {
  return (
    <section className="register">
      <div className="register__zone">
        <img className="register__logo" alt="Лого" src={logo} />
        <h2 className="register__header">Рады видеть!</h2>
        <form className="register__form" noValidate>
          <label htmlFor="email" className="register__input-header">
            E-mail
          </label>
          <input
            className="register__form-input"
            name="email"
            id="email"
            autoComplete="off"
            type="email"
            minLength="2"
            maxLength="70"
            required
          />
          <span className="register__input-error">Какая-то ошибка...</span>
          <label htmlFor="password" className="register__input-header">
            Пароль
          </label>
          <input
            className="register__form-input"
            name="password"
            id="password"
            autoComplete="off"
            type="password"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="register__input-error">Ошибка....</span>
          <button className="register__button register__button_login" type="submit">
            Войти
          </button>
          <p className="register__registration">
            Ещё не зарегистрированы?{' '}
            <Link to="/registerup" className="register__enter">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
export default Login;