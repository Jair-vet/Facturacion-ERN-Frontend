import React from 'react'

export const Header = () => {
  return (
    <div className="flex flex-col items-center">
        {/* Logo */}
        <div className='w-full pr-10 pl-10 flex justify-between items-center'>
            <div>
                <img src="/factura-ERN/assets/img/La-Michoacana.png" alt="logo empresa"  className='w-64 h-18'/>
            </div>
            <div>
                <button 
                    className="text-white bg-[#365326] shadow-lg p-2 pl-5 pr-5 rounded-3xl text-[12px] uppercase hover:bg-[#3e662a]"
                    onClick={() => window.location.href = "https://lamichoacanamelaminas.com"}
                >
                    Regresar
                </button>
            </div>
        </div>
        <div className='bg-[#788d1c] w-full'>
            <h1 className="text-2xl text-white p-2 text-center font-semibold">Facturación</h1>
        </div>
    </div>
  )
}
