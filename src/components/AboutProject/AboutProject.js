import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about">
            <h2 className="about__header">О проекте</h2>
            <div className="about__cont">
                <div className="about__text">
                    <p className="about__text_header">
                        Дипломный проект включал 5 этапов
                    </p>
                    <p className="about__text-description">
                        Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about__text">
                    <p className="about__text_header">
                        На выполнение диплома ушло 5 недель
                    </p>
                    <p className="about__text-description">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>

            <div className="about__week">
                <div className="about__week-one">1 неделя</div>
                <div className="about__week-four">4 недели</div>
            </div>

            <div className="about__backfront">
                <div className="about__back">Back-end</div>
                <div className="about__front">Front-end</div>
            </div>

        </section>
    )
}

export default AboutProject;