import React from 'react';
import PortfolioLink from '../PortfolioLink/PortfolioLink';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__wrapper">
        <h2 className="portfolio__title">Портфолио</h2>
        <PortfolioLink name="Статичный сайт" path="https://github.com/Skvorstieven/how-to-learn" />
        <PortfolioLink name="Адаптивный сайт" path="https://github.com/Skvorstieven/russian-travel" />
        <PortfolioLink name="Одностраничное приложение" path="https://github.com/Skvorstieven/react-mesto-api-full-gha" />
      </div>
    </section>
  );
}
