import Swal from 'sweetalert2';

const swalTemporizado = (message, timer = 3000) => {
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
    icon: 'success',
    title: message
  });
};


export default swalTemporizado;
