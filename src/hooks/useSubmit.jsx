import React from 'react'
import { useState } from 'react';

const useSubmit = () => {
    const [form, setForm] = useState(config);

    // e.preventDefault();

    // if (!trabajador.dni) {
    //   alertaError();
    // } else if (dataToEdit === null) {
    //   createData(trabajador, route);
    //   alertaExito("Trabajador").then((res) => {
    //     closeModal();
    //     if (res.isConfirmed) {
    //       actualizarTabla();
    //     }
    //   });
    // }

    // if (dataToEdit) {
    //   updateData(trabajador, dataToEdit.id, route);
    //   alertaEditarExito("Trabajador").then((res) => {
    //     closeModal();
    //     if (res.isConfirmed) {
    //       actualizarTabla();
    //     }
    //   });
    // }
  
    return [form, handleChange];
}

export default useSubmit