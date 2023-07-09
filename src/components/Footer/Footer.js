import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
  
        <div className="footer__copy">
          <span className="footer__date">&#169;2023</span>
          <ul className="footer__links">
            <li className="footer__item">
              <a
                className="footer__link"
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__item">
              <a
                className="footer__link"
                href="https://github.com/deedenn"
                target="_blank"
                rel="noreferrer">
                Github
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
}

export default Footer;
