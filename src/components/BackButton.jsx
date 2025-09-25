import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = ({ label = 'Back', className = '' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button type="button" className={`back-btn ${className}`} onClick={handleBack}>
      <span className="chevron" aria-hidden="true">←</span>
      {label}
    </button>
  );
};

export default BackButton;
