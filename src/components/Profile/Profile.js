import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validateEmail, validateName } from '../../utils/validation';

import './Profile.css';

function Profile({ onSignOut, onUpdateProfile, serverError, isOkRequest }) {

  const { values, handleChange, setValues } = useFormValidation();
  const currentUser = React.useContext(CurrentUserContext);
  const [showSaveBtn, setShowSaveBtn] = React.useState(false);
  const [showSuccessText, setShowSuccessText] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(values);
    setShowSaveBtn(false);
    setShowSuccessText(true);
  };

  const handleShowSaveButton = (e) => {
    e.preventDefault();
    setShowSaveBtn(true);
    setShowSuccessText(false);
  };

  React.useEffect(() => {
    if (currentUser?.data) {
      setValues(currentUser?.data);
    }
  }, [currentUser, setValues]);

  return (
    <>
      <section className="profile">
        <h2 className="profile__header">Привет, {currentUser?.data?.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <div className="profile__input-zone">
            <label htmlFor="name" className="profile__label">
              Имя
            </label>
            <input
              className="profile__input"
              name="name"
              id="name"
              autoComplete="off"
              type="name"
              minLength="2"
              maxLength="70"
              value={values.name || ''}
              onChange={handleChange}
              disabled={!showSaveBtn}
              required
            />
          </div>
          <span className="profile__input-error">{validateName(values.name).error}</span>

          <div className="profile__input-zone">
            <label htmlFor="email" className="profile__label">
              E-mail
            </label>
            <input
              className="profile__input"
              name="email"
              id="email"
              autoComplete="off"
              type="email"
              minLength="2"
              maxLength="40"
              value={values.email || ''}
              onChange={handleChange}
              disabled={!showSaveBtn}
              required
            />
          </div>
          <span className="profile__input-error">{validateEmail(values.email).error}</span>
       

        <div className="profile__btn-zone">

          {isOkRequest ? (
            <span
              className={`profile__success-text ${showSuccessText ? '' : 'profile__success-text_disabled'
                }`}>
              Обновление данных прошло успешно!
            </span>
          ) : (
            <span
              className={`profile__error-text ${serverError ? '' : 'profile__error-text_disabled'
                }`}>
              Произошла ошибка на стороне сервера. Пожалуйста, попробуйте
              позже ещё раз.
            </span>
          )}

          {showSaveBtn ? (
            <button
              type="submit"
              className={`profile__save ${(values.name === currentUser?.data?.name &&
                values.email === currentUser?.data?.email) ||
                !validateName(values.name).activeButton ||
                !validateEmail(values.email).activeButton
                ? 'profile__save_disabled'
                : ''
                }`}>
              Сохранить
            </button>
          ) : (
            <button
              type="button"
              className="profile__register"
              onClick={handleShowSaveButton}>
              Редактировать
            </button>
            
          )}
         
          <Link to="/" className="profile__exit" onClick={onSignOut}>
            Выйти из аккаунта
          </Link>

        </div>
        </form>
      </section>
    </>
  );
}

export default Profile;