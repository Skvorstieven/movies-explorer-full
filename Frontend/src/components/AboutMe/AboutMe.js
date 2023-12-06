import React from 'react';

import aboutMeImagePath from '../../images/me.jpg';
import SectionTitle from '../SectionTitle/SectionTitle';

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__wrapper">
        <SectionTitle title="Студент" />
        <div className="about-me__info-wrapper">
          <div className="about-me__info">
            <h3 className="about-me__title">Степан</h3>
            <p className="about-me__subtitle">Фронтенд-разработчик, 28 лет</p>
            <p className="about-me__text">Я&nbsp;родился и&nbsp;вырос в&nbsp;Москве, учился в&nbsp;Московском государственном университете геодезии и&nbsp;картографии. В&nbsp;данный момент работаю по&nbsp;профилю и&nbsp;учусь на&nbsp;Яндекс Практикуме с&nbsp;целью перехода в&nbsp;новую рабочую область. Увлекаюсь музыкой и&nbsp;путешествиями. </p>
            <a className="about-me__link" href="https://github.com/Skvorstieven" target="_blank" rel="noreferrer">Github</a>
          </div>
          <img className="about-me__image" src={aboutMeImagePath} alt="Студент" />
        </div>
      </div>
    </section>
  );
}
