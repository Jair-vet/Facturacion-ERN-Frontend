import React from 'react';

export const Summary = ({ venta }) => {
  const { subtotal, iva, total } = venta;

  const subtotalPago = subtotal ?? 0;
  const ivaPago= iva ?? 0;
  const totalPago = total ?? 0;

  return (
    <div className="flex gap-4 mb-6">
      <div className='w-full'>
        <div className="flex flex-col md:items-end text-center">
          <p className="font-semibold">
            Subtotal: <span className=' text-gray-500 font-thin md:pl-10 ml-3'>${subtotalPago.toFixed(2)}</span>
          </p>
          <p className="font-semibold">
            IVA 16%:  <span className=' text-gray-500 font-thin md:pl-10 ml-5'>${ivaPago.toFixed(2)}</span>
          </p>
          <p className="font-semibold">
            Total:    <span className=' text-gray-500 font-thin md:pl-10 ml-10'>${totalPago.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
