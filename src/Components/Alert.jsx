import Swal from "sweetalert2";

const Alert = (icon, title) => {
  Swal.fire({
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

export default Alert;
