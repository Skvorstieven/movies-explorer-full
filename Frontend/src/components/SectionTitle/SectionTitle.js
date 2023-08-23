import React from 'react';

export default function SectionTitle(props) {
  const { title } = props;
  return (
    <h2 className="section-title">{title}</h2>
  );
}
