

export function splitStringIntoArray(input) {

  // Dividir el string en un arreglo usando el punto como delimitador
  const parts = input?.split('.');

  // Filtrar partes vacías para evitar elementos vacíos en el arreglo final
  const nonEmptyParts = parts.filter(part => part.trim() !== '');

  return nonEmptyParts;
}

export function formatearFecha(fechaStr) {
  // Crear un objeto Date a partir de la cadena recibida
  const fecha = new Date(fechaStr);

  // Opciones para formatear el día de la semana y el mes
  const opciones = { weekday: 'long', day: 'numeric', month: 'long' };

  // Obtener la fecha formateada en español
  const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

  // Capitalizar la primera letra del día
  return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
}

// Ejemplo de uso
// const inputString = "Esto es un ejemplo. Y esta es la segunda parte. Aquí hay una tercera parte.";
// const result = splitStringIntoArray(inputString);

// console.log(result);
// Output: ["Esto es un ejemplo", "Y esta es la segunda parte", "Aquí hay una tercera parte"]