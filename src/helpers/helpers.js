import Swal from 'sweetalert2';
import axios from 'axios';


export const initializeCfdi = (clienteCfdi, setFormData) => {
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
  
    // const selectedItem = arregloCDFI.find(item => item.cfdi === clienteCfdi);
    const selectedItem = arregloCDFI.find(item => item.cfdi === clienteCfdi) || { codigoCFDI: '00', cfdi: '',};
    // console.log('selectedItem:', selectedItem);
    
    if (selectedItem) {
      setFormData(prevFormData => ({
        ...prevFormData,
        codigoCFDI: selectedItem.codigoCFDI,
        usoCFDI: selectedItem.codigoCFDI,
        usoCfdi: selectedItem.codigoCFDI,
        cfdi: selectedItem.cfdi,
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        cfdi: '',
        codigoCFDI: '00',
        usoCFDI: '00',
        usoCfdi: '00',
      }));
    }
};

  

export const handleSubmit = async ( e, formData, setIsLoading, setIsValidated, setFormData, setSalidas, setVenta,initializeCfdi
  ) => {
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
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setIsLoading(true);  // Mostrar el loader
    
    // Validación inicial para verificar si los campos son válidos
    if (!formData.sucursal || !formData.folio) {
      Swal.fire({
        title: 'WARNING',
        text: 'Por favor, selecciona una sucursal e ingresa un folio',
        icon: 'warning',
        iconColor: '#4782f6', // Color azul para el icono
        confirmButtonColor: '#007bff', // Color azul para el botón de confirmación
      });
      setIsLoading(false); // Detener el loader en caso de error
      return; // Salir de la función si la validación falla
    }
  
    const url = `${import.meta.env.VITE_API_URL}/ventas/${formData.sucursal}/${formData.folio}/`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = await response.json();
      if (response.ok) {
        
        const validaCFDI = result.cliente.cfdi && arregloCDFI.includes(result.cliente.cfdi) ? result.cliente.cfdi : 'G01';
  
        // Validación de la respuesta y actualización del estado
        setIsValidated(true);
        setFormData({
            ...formData,  // Mantener los valores anteriores
            rutaXML: `https://sgp-web.nyc3.digitaloceanspaces.com/sgp-web/${result.rutas.url_carpeta_facturacion}`,
            rutaPDF: `https://sgp-web.nyc3.digitaloceanspaces.com/sgp-web/${result.rutas.url_carpeta_facturacion}`,
            password: result.empresa.contrasena_csd,
            rutaLogotipo: result.rutas.url_logo,
            lugar_expedicion: result.empresa.cp,
            subtotal: result.venta.subtotal,
            total: result.venta.total,
            rfc_emisor: result.empresa.rfc,
            rfc_receptor: result.cliente.rfc,
            razonSocial_emisor: result.empresa.razonsocial,
            razonSocial_receptor: result.cliente.empresa,
            regimenFiscal_emisor: result.empresa.regimenfiscal,
            regimenFiscal_receptor: result.cliente.regimenfiscal, 
            rfc: result.cliente.rfc,
            razonSocial: result.cliente.empresa,
            domicilioFiscal_receptor: result.cliente.cp,
            address_receptor: result.cliente.domicilio,
            bank: result.banco.banco,
            num_acount: result.banco.no_cuenta,
            clabe: result.banco.clabe_inter,
            serie: result.rutas.serie,
            folioSucursal: formData.folio,
            folio: result.factura.id,
            conceptos: result.salidas.map((salida) => ({
                clave_sat: salida.clave_sat,
                clave_prod: salida.numparte,
                cantidad: salida.cantidad,
                unidad_sat: salida.unidad_sat,
                descripcion: salida.descripcion,
                valor_unitario: salida.precio,
                importe: salida.importe,
                base: salida.importe,
                importe_iva_concepto: salida.iva_importe,
                Importe: salida.importe,
                objeto_imp: '02',
                impuesto: "002",
                tasaOcuota: "0.160000",
                tipoFactor: "Tasa",
            })),
            Base_iva: result.venta.subtotal,
            importe_iva: result.venta.iva,
            correo: result.cliente.correo,
            cp: result.cliente.cp,
            regimenFiscal: result.cliente.regimenfiscal,
            metodoPago: result.venta.formapago,
            importe_iva_concepto: result.salidas.iva_importe,
            refpago: result.venta.refpago,
            cfdi: result.cliente.cfdi,
            codigoCFDI: result.cliente.codigoCFDI || '', // Asignar el valor de código CFDI si está disponible
            usoCFDI: validaCFDI,
            usoCfdi: validaCFDI,
            cfdiCode: validaCFDI,
            cliente: result.cliente.empresa,
            correo_sucursal: result.rutas.email_envio_facturcion,
            metodoPagoDescripcion: result.venta.formapago,
            url_carpeta_facturacion: result.rutas.url_carpeta_facturacion,
            factura: result.factura.factura
        });
  
        // Guardar las salidas y la venta
        setSalidas(result.salidas);
        setVenta(result.venta);
        
        // Mensaje de éxito
        Swal.fire('Éxito', 'El folio es válido', 'success');
      } else {
        // En caso de error en la respuesta
        Swal.fire({
          title: 'WARNING',
          text: result.error || result.warning || 'El folio no es válido',
          icon: 'warning',
          iconColor: '#4782f6',
          confirmButtonColor: '#007bff',
        });
      }
    } catch (error) {
      // Manejo de errores
      Swal.fire({
        title: 'UPPPS!!',
        text: error.message || 'Error al conectar con el servidor',
        icon: 'warning',
        iconColor: '#4782f6',
        confirmButtonColor: '#007bff',
      });
    } finally {
      // Detener el loader en cualquier caso
      setIsLoading(false);
    }
};
  

export const resetStateAndCache = (setFormData, setSalidas, setVenta, setPdf, setXml, setIsInvoiceGenerated) => {
  // Limpiar el estado del formulario
  setFormData({
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
  });

  // Limpiar otros estados relacionados
  setSalidas([]);
  setVenta(null);
  setPdf(null);
  setXml(null);
  setIsInvoiceGenerated(false);

  // Limpiar caché del navegador si es necesario
  localStorage.clear(); // Limpia el almacenamiento local
  sessionStorage.clear(); // Limpia el almacenamiento de sesión

  // Opcional: Si hay un sistema de estado global como Redux, limpia allí también
};



export const handleGenerateFactura = async (
  formData, 
  setIsLoading, 
  setFormData, 
  setPdf, 
  setXml, 
  setIsInvoiceGenerated,
  setSalidas,
  setVenta
) => {
  setIsLoading(true);
  
  let baseUrl = `${import.meta.env.VITE_FACTURA_URL}/${formData.url_carpeta_facturacion}/${formData.factura}`
  try {
    const response = await axios.post('https://www.binteapi.com:8085/src/cfdi40.php', formData);
    
    if (response.status === 200) {
      Swal.fire('Factura Generada', 'La factura se ha generado correctamente', 'success')
        .then(async (result) => {
          if (result.isConfirmed) {
            // Extraer los paths para el PDF, XML y UUID de la respuesta
            const { path_pdf, path_xml, UUID } = response.data;
            // const baseUrl = 'https://sgp-web.nyc3.cdn.digitaloceanspaces.com/sgp-web/';
            const pdfUrl = `${baseUrl}.pdf`;
            const xmlUrl = `${baseUrl}.xml`;

            setPdf(pdfUrl);
            setXml(xmlUrl);
            // openFileInNewTab(pdfUrl);
            downloadFile(pdfUrl, 'factura.pdf');
            downloadFile(xmlUrl, 'factura.xml');
            setIsInvoiceGenerated(true);

            try {
              const sucursal = encodeURIComponent(formData.sucursal.trim());
              const folioTicket = encodeURIComponent(formData.folioSucursal.trim());
              const saveFacturaUrl = `${import.meta.env.VITE_API_URL}/factura/${sucursal}/${folioTicket}/`;

              const saveResponse = await axios.put(saveFacturaUrl, {
                path_pdf: `ern-melaminas/${path_pdf}`,
                path_xml: `ern-melaminas/${path_xml}`,
                UUID
              });

              if (saveResponse.status === 200 && saveResponse.data?.id) {
                Swal.fire('Factura Guardada', 'La factura ha sido guardada en la base de datos correctamente', 'success');
              } else {
                Swal.fire({
                  title: 'UPPPS!!',
                  text: saveResponse.data?.message || 'Error al guardar la factura en la base de datos',
                  icon: 'WARNING',
                  iconColor: '#4782f6', 
                  confirmButtonColor: '#007bff',
                });
              }
            } catch (saveError) {
              const saveErrorMessage = saveError.response?.data?.error || 'Error al guardar la factura en la base de datos';
              console.error('Error al guardar la factura:', saveErrorMessage);
              Swal.fire({
                title: 'UPPPS!!',
                text: saveErrorMessage,
                icon: 'WARNING',
                iconColor: '#4782f6', 
                confirmButtonColor: '#007bff',
              });
            }
            resetStateAndCache(setFormData, setSalidas, setVenta, setPdf, setXml, setIsInvoiceGenerated);
          }
        });
    } else {
      Swal.fire('Error', 'Hubo un problema al generar la factura', 'error');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error al generar la factura';
    console.error('Error en la generación de factura:', errorMessage);
    Swal.fire({
      title: 'UPPPS!!',
      text: errorMessage,
      icon: 'WARNING',
      iconColor: '#4782f6', 
      confirmButtonColor: '#007bff',
    });
  } finally {
    setIsLoading(false);
  }
};

const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const handleSendInvoiceEmail = async (
    formData, 
    pdfUrl, 
    xmlUrl, 
    setIsLoading
  ) => {
    setIsLoading(true);
  
    // Función para convertir un archivo en base64
    const convertToBase64 = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
  
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result.split(',')[1]); // Regresa solo la parte Base64
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };
  
    try {
      // Convertir el PDF y el XML a base64
      const pdfBase64 = await convertToBase64(pdfUrl);
      const xmlBase64 = await convertToBase64(xmlUrl);
  
      // Preparar los datos para la solicitud
      const emailData = {
        to_email: formData.correo, // correo del cliente
        to_name: formData.razonSocial, // razón social del cliente
        number_template: 4178982,
        from_email: formData.correo, // correo de la sucursal
        from_name: "Factura",
        vars_submit: {
          logo: formData.rutaLogotipo, // ruta del logotipo de la sucursal
          Cliente: formData.cliente, // razón social del cliente
          Emisor: formData.razonSocial_emisor, // razón social de la sucursal
          Serie: "F", // serie de la factura
          Folio: formData.folio, // folio de la factura
          correo: formData.correo, // correo de la sucursal
        },
        more_emails: [],
        with_copy_emails: [],
        with_copy_secret_emails: [],
        subject: "Factura",
        attachments_files: [
          {
            ContentType: "application/pdf",
            Filename: "factura.pdf",
            Base64Content: pdfBase64,
          },
          {
            ContentType: "application/xml",
            Filename: "factura.xml",
            Base64Content: xmlBase64,
          },
        ],
      };
  
      // Configurar el encabezado con el access_token
      const config = {
        headers: {
          Authorization: `Bearer iIxMDUxOjM5MSIsInZlciI6IjIuMCIs`, // Access token
        },
      };
  
      // Enviar los datos a la API
      const emailResponse = await axios.post(
        'https://developer.binteapi.com:8083/submit-email',
        emailData,
        config
      );
  
      if (emailResponse.status === 200) {
        Swal.fire('Correo Enviado', 'La factura ha sido enviada correctamente', 'success');
      } else {
        const errorMessage = emailResponse.response.Messages[0].Errors[0].ErrorMessage.replace(/\"\" /, '');
        Swal.fire({
          title: 'UPPPS!!',
          text: errorMessage, // Mensaje sin las comillas
          icon: 'warning',
          iconColor: '#4782f6',
          confirmButtonColor: '#007bff'
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al enviar el correo';
      Swal.fire({
        title: 'UPPPS!!',
        text: errorMessage,
        icon: 'warning',
        iconColor: '#4782f6',
        confirmButtonColor: '#007bff',
      });
    } finally {
      setIsLoading(false);
    }
};