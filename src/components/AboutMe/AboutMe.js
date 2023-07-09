import React from 'react';
import './Aboutme.css';
import student from '../../images/vitaly.svg';

function AboutMe() {
    return (
        <section className="aboutme">
            <h2 className="aboutme__header">Студент</h2>
            <div className="aboutme__container">
                <div className="aboutme__text">
                    <h3 className="aboutme__name">Виталий</h3>
                    <p className="aboutme__profession">Фронтенд-разработчик, 30 лет</p>
                    <p className="aboutme__description">
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a
                        className="aboutme__githublink"
                        rel="noreferrer"
                        href="https://github.com/deedenn"
                        target="_blank">
                        Github
                    </a>
                </div>
                <img className="aboutme__image" alt='Аватар студента' src={student}></img>
            </div>

        </section>
    )
}

export default AboutMe;