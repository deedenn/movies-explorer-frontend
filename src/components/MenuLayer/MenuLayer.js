import React from 'react';
import { Link } from 'react-router-dom';

import './MenuLayer.css';

function MenuLayer({ onCloseDrawer }) {
  return (
    <div className={`menu-layer`}>
      <div className="menu-layer__container">
        <button
          type="button"
          className="menu-layer__close"
          onClick={onCloseDrawer}></button>
        <nav className="menu-layer__menu">
          <ul className="menu-layer__list">
            <Link to="/" className="menu-layer__point">
              Главная
            </Link>
            <Link to="/movies" className="menu-layer__point">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="menu-layer__point">
              Сохранённые фильмы
            </Link>
          </ul>
        </nav>

        <button className="menu-layer__button" type="button">
          <Link to="/profile" className="menu-layer__span">
            Аккаунт
          </Link>
          <img
            className="menu-layer__profile"
            alt="Лого аккаунта"
          />
        </button>
      </div>
    </div>
  );
}

export default MenuLayer;