import React, { useState, useEffect, useCallback } from 'react';
import { ItemsTable } from './ItemsTable';
import { Summary } from './Summary';
import axios from 'axios';
import { Loader } from './Loader';
import { UsoCFDI } from './UsoCFDI';
import { handleSubmit, handleGenerateFactura, handleSendInvoiceEmail, initializeCfdi } from '../helpers/helpers';


export const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    sucursal: '',
    folio: '',
    folioSucursal: '',
    correo: '',
    razonSocial: '',
    rfc: '',
    regimenFiscal: '',
    cp: '',
    metodoPago: '', 
    metodoPago2: 'PUE', 
    metodoPagoDescripcion: '',
    metodoPagoDescripcion2: 'PAGO EN UNA SOLA EXHIBICIÓN',
    Produccion: "NO",
    type: "tasa16",
    id_invoice: "", 
    rutaCSD: "", // SE AGREGA VACIO
    rutaKEY: "", // SE AGREGA VACIO
    password: '',
    rutaXML: "",
    rutaPDF: "",
    rutaLogotipo: "",
    is_return_paths: true,
    
    // Datos de facturación
    serie: "",
    metodo_pago: "PUE",
    forma_pago: "03",
    tipo_comprobante: "I",  
    moneda: "MXN",
    tipo_cambio: "1",
    fecha_expedicion: "",  // SE AGREGA VACIO
    lugar_expedicion: "",
    subtotal: "",
    total: "",
    exportacion: "01",

    // Datos del Emisor - Sucursal
    rfc_emisor: "",
    razonSocial_emisor: "", 
    regimenFiscal_emisor: "",
    address_emisor: "Calle Ejemplo, 123567",  // PENDIENTE

    // Datos del Receptor - Cliente
    rfc_receptor: "",
    razonSocial_receptor: "",
    // !
    codigoCFDI: '',
    cfdi: '',
    cfdiCode: '',
    cfdiDescription: '',
    usoCFDI: '',
    usoCfdi: '',
    domicilioFiscal_receptor: "",
    address_receptor: "",
    regimenFiscal_receptor: "",

    // Datos del Banco - Tabla MiBanco
    bank: "",
    num_acount: "",
    clabe: "",

    // Conceptos
    conceptos: [
      {
        clave_sat: "",
        clave_prod: "",
        cantidad: "",
        unidad_sat: "",
        descripcion: "",
        valor_unitario: "", // 657.93
        importe: "", // 2631.72
        base: "",
        importe_iva_concepto: '',
        Importe: '',
        objeto_imp: "02",
        impuesto: "002",
        tasaOcuota: "0.160000",
        tipoFactor: "Tasa",
      },
    ],

    newConcepts: [], // SE CAMBIO EL NOMBRE

    // Impuestos
    Base_iva: "",
    impuesto_iva: "002",
    impuesto_ieps: "001",
    importe_iva: "",
    importe_ieps: "0.00",
    tasaOcuota_iva: "0.160000", // SE CAMBIO NOMBRE DE VARIABLE
    tipoFactor_iva: "Tasa", // SE CAMBIO NOMBRE DE VARIABLE

    // Otros datos
    days: 0,
    date: null,
    reference: "",
    refpago: "",
    cliente: '',
    correo_cliente: '',
    correo_sucursal: '',
  });

  const [isValidated, setIsValidated] = useState(false);
  const [sucursales, setSucursales] = useState([]);
  const [salidas, setSalidas] = useState([]);
  const [venta, setVenta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvoiceGenerated, setIsInvoiceGenerated] = useState(false);
  const [pdfUrl, setPdf] = useState(false);
  const [xmlUrl, setXml] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [codigoCFDI, setCodigoCFDI] = useState('');

  const resetForm = () => {
    setFormData({
      // Inicializa todos los valores al estado inicial
      sucursal: '',
      folio: '',
      folioSucursal: '',
      correo: '',
      razonSocial: '',
      rfc: '',
      regimenFiscal: '',
      cp: '',
      metodoPago: '',
      metodoPago2: 'PUE',
      metodoPagoDescripcion: '',
      metodoPagoDescripcion2: 'PAGO EN UNA SOLA EXHIBICIÓN',
      Produccion: "NO",
      type: "tasa16",
      id_invoice: "",
      rutaCSD: "",
      rutaKEY: "",
      password: '',
      rutaXML: "",
      rutaPDF: "",
      rutaLogotipo: "",
      is_return_paths: true,
      serie: "",
      metodo_pago: "PUE",
      forma_pago: "03",
      tipo_comprobante: "I",  
      moneda: "MXN",
      tipo_cambio: "1",
      fecha_expedicion: "",  // SE AGREGA VACIO
      lugar_expedicion: "",
      subtotal: "",
      total: "",
      exportacion: "01",

      // Datos del Emisor - Sucursal
      rfc_emisor: "",
      razonSocial_emisor: "", 
      regimenFiscal_emisor: "",
      address_emisor: "Calle Ejemplo, 123567",  // PENDIENTE

      // Datos del Receptor - Cliente
      rfc_receptor: "",
      razonSocial_receptor: "",
      // !
      codigoCFDI: '',
      cfdi: '',
      cfdiCode: '',
      cfdiDescription: '',
      usoCFDI: '',
      usoCfdi: '',
      domicilioFiscal_receptor: "",
      address_receptor: "",
      regimenFiscal_receptor: "",

      // Datos del Banco - Tabla MiBanco
      bank: "",
      num_acount: "",
      clabe: "",

      // Conceptos
      conceptos: [
        {
          clave_sat: "",
          clave_prod: "",
          cantidad: "",
          unidad_sat: "",
          descripcion: "",
          valor_unitario: "", // 657.93
          importe: "", // 2631.72
          base: "",
          importe_iva_concepto: '',
          Importe: '',
          objeto_imp: "02",
          impuesto: "002",
          tasaOcuota: "0.160000",
          tipoFactor: "Tasa",
        },
      ],

      newConcepts: [], // SE CAMBIO EL NOMBRE

      // Impuestos
      Base_iva: "",
      impuesto_iva: "002",
      impuesto_ieps: "001",
      importe_iva: "",
      importe_ieps: "0.00",
      tasaOcuota_iva: "0.160000", // SE CAMBIO NOMBRE DE VARIABLE
      tipoFactor_iva: "Tasa", // SE CAMBIO NOMBRE DE VARIABLE

      // Otros datos
      days: 0,
      date: null,
      reference: "",
      refpago: "",
      cliente: '',
      correo_cliente: '',
      correo_sucursal: '',
      // Resto de los campos...
    });
  };
  useEffect(() => {
    setIsLoading(true);
    const obtenerSucursales = async () => {
      try {
        // Obtén la URL actual
        const currentUrl = window.location.href;
        // Extrae la primera palabra después del dominio
        const pathSegment = currentUrl.split('/')[2]; // Índice 3 después de "https://"
  
        // Construye la URL de la petición
        const requestUrl = `https://binteapi.com:8095/api/sucursales/${pathSegment}`;
        // const requestUrl = `https://binteapi.com:8095/api/sucursales/melpromelaminas.com`;
  
        // Realiza la petición
        const response = await axios.get(requestUrl);
        setSucursales(response.data);
      } catch (error) {
        console.error('Error al cargar las sucursales:', error);
      } finally {
        setIsLoading(false); // Detener el loader
      }
    };
  
    obtenerSucursales();
  }, []);

  
  // https://binteapi.com:8095/api/sucursales/http://localhost:5173/factura-ERN/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCodigoCFDIUpdate = (nuevoCodigoCFDI) => {
    setCodigoCFDI(nuevoCodigoCFDI);
  };

  // useEffect(() => {
  //   if (formData.codigoCFDI && formData.codigoCFDI !== formData.cfdiCode) {
  //     setFormData(prevState => ({
  //       ...prevState,
  //       cfdiCode: formData.codigoCFDI,
  //       usoCFDI: formData.codigoCFDI,
  //       usoCfdi: formData.codigoCFDI,
  //     }));
  //   }
  // }, [formData.codigoCFDI]);

  useEffect(() => {
    setFormData(prevData => ({ ...prevData, folio: '' }));
  }, []);

  useEffect(() => {
    // Limpiar el campo de folio cuando se genera la factura
    if (isInvoiceGenerated) {
      setFormData(prevData => ({ ...prevData, folio: '' }));
    }
  }, [isInvoiceGenerated]);

  const handleIconClick = (src) => {
    setImageSrc(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  

  return (
    <form onSubmit={(e) => handleSubmit(e, formData, setIsLoading, setIsValidated, setFormData, setSalidas, setVenta, initializeCfdi)}>
      {/* Mostrar el loader */}
      {isLoading && <div className=" flex justify-center items-center"><Loader /></div>}

      {/* Validación de Folio */}
      <div className="md:grid md:grid-cols-3 gap-4 mb-1">
        <div>
          <label className="block text-sm font-medium text-gray-700">Selecciona la sucursal:</label>
          <select
            name="sucursal"
            value={formData.sucursal}
            onChange={handleChange}
            className="bg-gray-300 mt-1 block w-full border border-gray-300 rounded-md p-1"
          >
            <option value="">Selecciona una sucursal</option>
            {sucursales.map((sucursal) => (
              <option key={sucursal.id} value={sucursal.nombre_ciudad}>{sucursal.nombre_ciudad}</option>
            ))}
          </select>
        </div>
        {/* Seleccionar Folio */}
        <div className='flex gap-2 w-full'>
          <div className='w-full'>
            <label className="block text-sm font-medium text-gray-700">Ingresa folio de ticket:</label>
            <input
              type="text"
              name="folio"
              onChange={handleChange}
              className="bg-gray-300 mt-1 block w-full border border-gray-300 rounded-md p-1"
            />
          </div>
          {/* Círculo de ayuda */}
          <div className="relative flex items-center justify-center mt-4">
            {/* Tooltip */}
            <div className="absolute bg-gray-700 text-white text-xs rounded px-2 py-1 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Encuentra el Folio
            </div>
            {/* Icono para abrir el modal */}
            <button
              type="button"
              onClick={() => handleIconClick('/factura-ERN/assets/img/Informacio_image.jpeg')}
              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-400 focus:outline-none group"
            >
              <span className="text-white text-xl">?</span>
            </button>
          </div>
        </div>
        <div className="md:mt-0 mt-3 flex justify-center items-center text-sm font-medium">
          <button
            type="submit"
            className="text-white bg-[#365326] shadow-lg p-2 pl-5 pr-5 rounded-3xl text-[12px] uppercase hover:bg-[#3e662a]"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Validar'}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
          <div className="bg-white p-4 rounded-md relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-[-12px] right-[-12px] text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-2">
              X
            </button>
            <img src={imageSrc} alt="Modal" className="w-full" />
          </div>
        </div>
      )}

      {/* Mostrar los otros campos solo si la validación fue exitosa */}
      <div>
        {!isInvoiceGenerated && isValidated && (
          <div>
            <div className="w-full md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Razón Social:</label>
              <input
                type="text"
                name="razonSocial"
                value={formData.razonSocial}
                onChange={handleChange}
                className="bg-gray-300 mt-1 block w-full border border-gray-300 rounded-md p-1"
              />
            </div>
          
            <div className="parent grid grid-cols-1 md:grid-cols-7 gap-x-1 gap-y-0">
              <div className="w-full md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">RFC:</label>
                <input
                  type="text"
                  name="rfc_receptor"
                  value={formData.rfc_receptor}
                  onChange={handleChange}
                  className="bg-gray-300 mt-1 block w-full border border-gray-300 rounded-md p-1"
                />
              </div>
              
              <div className="w-full md:col-start-3 md:col-end-4">
                <label className="block text-sm font-medium text-gray-700">R. Fiscal:</label>
                <input
                  type="number"
                  name="regimenFiscal"
                  value={formData.regimenFiscal}
                  onChange={handleChange}
                  className="bg-gray-300 mt-1 block w-full border border-gray-300 rounded-md p-1"
                />
              </div>

              <div className="w-full md:col-start-4 md:col-end-5">
                <label className="block text-sm font-medium text-gray-700">C.P.:</label>
                <input
                  type="number"
                  name="cp"
                  value={formData.cp}
                  onChange={handleChange}
                  className="bg-gray-300 mt-1 block w-full border border-gray-300 rounded-md p-1"
                />
              </div>
            
              <UsoCFDI 
                codigoCFDI={formData.codigoCFDI}
                usoCFDI={formData.usoCFDI}
                cfdi={formData.cfdi}
                setFormData={setFormData}
                onUpdateCodigoCFDI={handleCodigoCFDIUpdate}
              />


            </div>

            <div className="parent grid grid-cols-1 md:grid-cols-7 gap-x-1 gap-y-0">
              <div className="w-full md:col-span-1 hidden md:block">
                <label className="block text-sm font-medium text-gray-700 mt-7"></label>
                <input
                  type="text"
                  name="metodoPago"
                  defaultValue={formData.refpago}
                  className="campo_sin_editar"
                  readOnly
                />
              </div>
              <div className="w-full md:col-start-2 md:col-end-5">
                <label className="text-sm font-medium text-gray-700">Método de Pago:</label>
                <input
                  name="metodoPagoDescripcion"
                  defaultValue={formData.metodoPagoDescripcion}
                  className="campo_sin_editar"
                  readOnly
                />
              </div>
              <div className="w-full md:col-start-5 md:col-end-6  hidden md:block">
                <label className="block text-sm font-medium text-gray-700 mt-1">Pago:</label>
                <input
                  defaultValue={formData.metodoPago2}
                  type="text"
                  className="campo_sin_editar"
                  readOnly
                />
              </div>
              <div className="w-full md:col-start-6 md:col-span-2 mt-6">
                <label className="text-sm font-medium text-gray-700"></label>
                <input
                  defaultValue={formData.metodoPagoDescripcion2}
                  type="text"
                  className="campo_sin_editar"
                  readOnly
                />
              </div>
            </div>
          
            <div className="grid w-full col-span-6 gap-4 mb-2">
              <div className="w-full md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Correo:</label>
                <input
                  type="text"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="bg-gray-300 mt-1 block w-full border border-gray-300 rounded-md p-1"
                />
              </div>
            </div>

            {/* Tabla */}
            <ItemsTable salidas={salidas} />
            <Summary venta={venta}/>

            <button 
              className="w-full bg-[#365326] text-white px-4 py-2 mt-4 hover:bg-[#3e662a] rounded-3xl uppercase"
              type="button"
              onClick={() => handleGenerateFactura(
                formData, 
                setIsLoading, 
                setFormData, 
                setPdf, 
                setXml, 
                setIsInvoiceGenerated
              )}
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Generar Factura'}
            </button>
          </div>
        )}
        <div>
          {isInvoiceGenerated && (
            <>
              <div className='flex justify-center items-center p-10'>
                <h2 className='text-2xl uppercase text-[#3e662a] font-bold'>La factura fué generada Exitosamente</h2>
              </div>
              <div>
                <button 
                  className="w-full bg-[#365326] text-white px-4 py-2 mt-4 hover:bg-[#3e662a] rounded-3xl uppercase"
                  type="button"
                  onClick={() => handleSendInvoiceEmail(
                    formData, 
                    pdfUrl, 
                    xmlUrl, 
                    setIsLoading
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar por Correo'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

