import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__wrapper">
        <SectionTitle title="Технологии" />
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__subtitle">На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
        <div className="techs__list-wrapper">
          <ul className="techs__list">
            <li className="techs__item">HTML</li>
            <li className="techs__item">CSS</li>
            <li className="techs__item">JS</li>
            <li className="techs__item">React</li>
            <li className="techs__item">Git</li>
            <li className="techs__item">Express.js</li>
            <li className="techs__item">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
