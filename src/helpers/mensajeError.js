import Swal from 'sweetalert2';

const swalTemporizadoBad = (message, timer = 5000) => {
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  
    toast.fire({
      icon: 'error',
      title: message
    });
};

export default swalTemporizadoBad;
