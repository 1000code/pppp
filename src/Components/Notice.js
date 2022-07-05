import Swal from "sweetalert2";

export const Notice = (icon, title) => {
  Swal.fire({
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const ErrorNotice = (title) => {
  Swal.fire({
    icon: "warning",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};
