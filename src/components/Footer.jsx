import React from 'react';

export const Footer = () => {
  return (
    <div className="mt-6 bg-[#788d1c] text-center">
      <div className="w-full p-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex justify-center items-center gap-3">
          <p className="text-white text-lg flex items-center mb-2 md:mb-0">
            <a 
              href="/factura-ERN/assets/pdf/Aviso-de-Privacidad-BINTE.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-gray-200"
              >
              Aviso de Privacidad
            </a>
          </p>
          <p className="text-gray-400">V. 1.0.1</p>
        </div>
        <p className="text-white text-lg flex items-center">
          Desarrollado por:
          <a
            href="https://binteconsulting.com/" 
            target="_blank" 
          >
            <img 
              src="/factura-ERN/assets/img/Binte-Logo.png" 
              alt="logo empresa" 
              className="w-24 ml-2"
            />
          </a>
        </p>
      </div>
    </div>
  );
};
