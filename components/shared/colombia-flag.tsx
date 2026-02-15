import React from 'react';

const ColombiaFlag: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="24"
    viewBox="0 0 32 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Bandera de Colombia"
  >
    {/* Amarillo: mitad superior */}
    <rect width="32" height="12" y="0" fill="#FFD600" />
    {/* Azul: un cuarto inferior */}
    <rect width="32" height="6" y="12" fill="#003893" />
    {/* Rojo: un cuarto inferior */}
    <rect width="32" height="6" y="18" fill="#CE1126" />
  </svg>
);

export default ColombiaFlag;
