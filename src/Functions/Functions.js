import moment from "moment";

export const parcelType = (parcel_type) => {
  if (parcel_type === "animal") {
    return "ສັດລ້ຽງ";
  } else if (parcel_type === "fruit") {
    return "ຜັກ - ໝາກໄມ້";
  } else if (parcel_type === "special") {
    return "ພິເສດ";
  } else {
    return "ທົ່ວໄປ";
  }
};

export const formatDate = (date) => {
  return moment(date).format("H:m:s - DD/MM/YYYY");
};
export const dateSearch = (date) => {
  return moment(date).format("DD/MM/YYYY H:m:s");
};

export const formatFloat = (number) => {
  let result = parseFloat(number).toFixed(2);
  result = Number(result).toLocaleString();
  return result;
};

export const paymentType = (payment) => {
  if (payment === "pay_start") {
    return "ຈ່າຍຕົ້ນທາງ";
  } else {
    return "ຈ່າຍປາຍທາງ";
  }
};

export const userType = (role_sub_branch) => {
  if (role_sub_branch === "branch") {
    return "ຜູ້ຈັດການສາຂາ";
  }
  if (role_sub_branch === "warehouse") {
    return "ຜູ້ຈັດການສາງ";
  }
  if (role_sub_branch === "counter") {
    return "ພະນັກງານ Counter";
  }
  if (role_sub_branch === "rider") {
    return "ພະນັກງານ ຈັດສົ່ງ (Rider)";
  }
  if (role_sub_branch === "truck") {
    return "ພະນັກງານ ສາຍສົ່ງ (Truck)";
  }
};

export const currencyCOD = (currency_cod) => {
  if (currency_cod === "lak") {
    return " ກີບ";
  } else if (currency_cod === "thb") {
    return " ບາດ";
  } else if (currency_cod === "usd") {
    return " ໂດລາ";
  } else {
    return "-";
  }
};

export const disableClickRight = (el) => {
  !el && document.addEventListener("contextmenu", (e) => e.preventDefault());
};
