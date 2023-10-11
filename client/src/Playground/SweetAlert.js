import Swal from 'sweetalert2';

const SweetAlert = ({ icon, title, message }) => {
  Swal.fire({
    icon,
    title,
    text: message,
  });
};

export default SweetAlert;
