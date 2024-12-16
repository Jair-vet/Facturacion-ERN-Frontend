import React from 'react';

export const ItemsTable = ({ salidas }) => {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-400 text-white uppercase">
          <tr>
            <th className="border border-gray-300 p-2">N° Parte</th>
            <th className="border border-gray-300 p-2">Descripción</th>
            <th className="border border-gray-300 p-2">Cantidad</th>
            <th className="border border-gray-300 p-2">Precio</th>
            <th className="border border-gray-300 p-2">Importe</th>
          </tr>
        </thead>
        <tbody>
          {salidas.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{item.numparte}</td>
              <td className="border border-gray-300 p-2">{item.descripcion}</td>
              <td className="border border-gray-300 p-2 text-center">{item.cantidad}</td>
              <td className="border border-gray-300 p-2 text-right">${item.precio.toFixed(2)}</td>
              <td className="border border-gray-300 p-2 text-right">${item.importe.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
