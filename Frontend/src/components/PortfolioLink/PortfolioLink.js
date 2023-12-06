import React from 'react';

export default function PortfolioLink(props) {
  const { path, name } = props;
  return (
    <a className="portfolio-link" href={path} target="_blank" rel="noreferrer">
      {name}
      <span className="portfolio-link__arrow">↗</span>
    </a>
  );
}
