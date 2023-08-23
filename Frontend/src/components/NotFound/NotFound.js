import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  // Get navigate
  const navigate = useNavigate();

  // Go back
  function goBack() {
    navigate(-1);
  }

  return (
    <main className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button type="button" className="not-found__button" onClick={goBack}>Назад</button>
    </main>
  );
}
