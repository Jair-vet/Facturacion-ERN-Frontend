import React, { useEffect, useState } from 'react';

export const UsoCFDI = ({ cfdi, setFormData, onUpdateCodigoCFDI }) => {
  const [codigoCFDI, setCodigoCFDI] = useState('');

  // Arreglo de CFDIs disponibles
  const arregloCDFI = [
    { codigoCFDI: 'G01', cfdi: 'ADQUISICIÓN DE MERCANCIAS' },
    { codigoCFDI: 'G03', cfdi: 'GASTOS EN GENERAL' },
    { codigoCFDI: 'I01', cfdi: 'CONSTRUCCIONES' },
    { codigoCFDI: 'I02', cfdi: 'MOBILIARIO Y EQUIPO DE OFICINA POR INVERSIONES' },
    { codigoCFDI: 'I03', cfdi: 'EQUIPO DE TRANSPORTE' },
    { codigoCFDI: 'I04', cfdi: 'EQUIPO DE COMPUTO Y ACCESORIOS' },
    { codigoCFDI: 'I05', cfdi: 'DADOS, TOQUELES, MOLDES, MATRICES Y HERRAMENTAL' },
    { codigoCFDI: 'I08', cfdi: 'OTRA MAQUINARIA Y EQUIPO' },
  ];

  // Efecto para cuando cambia el prop `cfdi`
  useEffect(() => {
    // Encuentra el CFDI seleccionado en el arreglo
    const selectedItem = arregloCDFI.find(item => item.cfdi === cfdi);

    if (selectedItem) {
      setCodigoCFDI(selectedItem.codigoCFDI); // Actualiza el código CFDI
    } else {
      setCodigoCFDI('');
    }
  }, [cfdi]);

  // Función para manejar el cambio del CFDI en el select
  const handleCfdiChange = (event) => {
    const selectedCfdi = event.target.value;
    
    // Encuentra el CFDI seleccionado en el arreglo
    const selectedItem = arregloCDFI.find(item => item.cfdi === selectedCfdi);
    
    if (selectedItem) {
      // Actualiza el formData con el código CFDI y el nombre del CFDI seleccionado
      setFormData({
        usoCFDI: selectedItem.codigoCFDI,  // Asigna el código CFDI
        usoCfdi: selectedItem.codigoCFDI,  // Lo mismo para usoCfdi
        cfdi: selectedItem.codigoCFDI === '00' ? '' : selectedItem.cfdi, // Si es '00', dejamos vacío
        codigoCFDI: selectedItem.codigoCFDI, // Código CFDI
        cfdiCode: selectedItem.codigoCFDI, // Lo mismo para cfdiCode
      });
      
      onUpdateCodigoCFDI(selectedItem.codigoCFDI);
    } else {
      // Restablece los valores si no se selecciona un CFDI válido
      setFormData({
        usoCFDI: '',
        usoCfdi: '',
        cfdi: '',
        codigoCFDI: '',
        cfdiCode: '',
      });
    }
  };

  return (
    <>
      <div className="w-full md:col-start-5 md:col-end-6">
        <label className="block text-sm font-medium text-gray-700">Código CFDI:</label>
        <input
          type="text"
          name="usoCFDI"
          value={codigoCFDI} // Código CFDI seleccionado
          readOnly
          className="bg-gray-300 mt-1 block w-full border border-gray-300 rounded-md p-1"
        />
      </div>

      <div className="w-full md:col-span-2 md:col-start-6">
        <label className="block text-sm font-medium text-gray-700">Selecciona el CFDI:</label>
        <select
          name="cfdi"
          value={cfdi}
          onChange={handleCfdiChange}
          className="bg-gray-300 mt-1 block w-full border border-gray-300 rounded-md p-1"
        >
          <option value="">Seleccionar...</option>
          {arregloCDFI.map((item) => (
            <option key={item.codigoCFDI} value={item.cfdi}>
              {item.cfdi}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
