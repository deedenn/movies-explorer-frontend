import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';

function Register(props) {
  return (
    <section className="register">
      <div className="register__zone">
        <img className="register__logo" alt="Лого" src={logo} />
        <h2 className="register__header">Добро пожаловать!</h2>
        <form className="register__form" noValidate>
          <label htmlFor="name" className="register__input-header">
            Имя
          </label>
          <input
            className="register__form-input"
            name="name"
            id="name"
            autoComplete="off"
            type="name"
            minLength="2"
            maxLength="70"
            required
          />
          <span className="register__input-error">Ошибка...</span>
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
          <span className="register__input-error">Ошибка...</span>
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
          <span className="register__input-error">Ошибка...</span>
        </form>
      </div>
      <button className="register__button" type="submit">
        Зарегистрироваться
      </button>
      <p className="register__registration">
        Уже зарегистрированы?
        <span className="register__enter"> Войти</span>
      </p>
    </section>
  );
}
export default Register;