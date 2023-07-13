import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
    return (
        <section className="portfolio">
        <h2 className="portfolio__header">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__list-item">
            <a
              className="portfolio__link"
              rel="noreferrer"
              href="https://deedenn.github.io/how-to-learn/"
              target="_blank">
              Статичный сайт
              <img className="portfolio__arrow" alt="Стрелка" src={arrow}/>
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              className="portfolio__link"
              rel="noreferrer"
              href="https://deedenn.github.io/russian-travel/index.html"
              target="_blank">
              Адаптивный сайт
              <img className="portfolio__arrow" alt="Стрелка" src={arrow} />
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              className="portfolio__link"
              rel="noreferrer"
              href="https://deedenn.github.io/mesto/"
              target="_blank">
              Одностраничное приложение
              <img className="portfolio__arrow" alt="Стрелка"  src={arrow}/>
            </a>
          </li>
        </ul>
      </section>
    )
}

export default Portfolio;