import React from 'react';

import SectionTitle from '../SectionTitle/SectionTitle';

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__wrapper">
        <SectionTitle title="О проекте" />
        <ul className="about-project__text-wrapper">
          <li className="about-project__textblock">
            <h3 className="about-project__text-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
          </li>
          <li className="about-project__textblock">
            <h3 className="about-project__text-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__text">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className="about-project__timeline">
          <span className="about-project__timeline-backend">1 неделя</span>
          <span className="about-project__timeline-frontend">4 недели</span>
          <span className="about-project__timeline-text">Back-end</span>
          <span className="about-project__timeline-text">Front-end</span>
        </div>
      </div>
    </section>
  );
}
