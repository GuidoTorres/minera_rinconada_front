import Swal from "sweetalert2";

const alertaError = () => {
  return Swal.fire({
    icon: "error",
    // title: "Error...",
    text: "Campos incompletos!",
  });
};
const alertaErrorCrear = (text) => {
  return Swal.fire({
    icon: "error",
    // title: "Error...",
    text: text,
  });
};
const alertaExito = (text, status) => {
  return Swal.fire({
    icon: status === 200 ? "success" : "error",
    // title: "Error...",
    text: `${text}`,
  });
};
const alertaEditarExito = (text, status) => {
  return Swal.fire({
    icon: status === 200 ? "success" : "error",
    // title: "Error...",
    text: `${text}`,
  });
};

const alertaEliminarExito = (text) => {
  return Swal.fire({
    title: `¿Estás seguro de eliminar este ${text}?`,
    text: "No podras deshacerlo",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Eliminar",
  });
};

export { alertaError, alertaExito, alertaEliminarExito, alertaEditarExito, alertaErrorCrear };
