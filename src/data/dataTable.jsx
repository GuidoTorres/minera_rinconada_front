import { BsFillTrash2Fill } from "react-icons/bs";
import {
  AiFillEdit,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
  AiFillFileExcel,
} from "react-icons/ai";

//modulo administracion
export const usuario = (handleEdit, handleDelete) => {
  let usuario;
  return (usuario = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      id: "Nombre",
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      id: "Usuario",
      name: "Usuario",
      selector: (row) => row.usuario,
      sortable: true,
    },
    {
      id: "Contraseña",
      name: "Contraseña",
      selector: (row) => row.contrasenia,
      sortable: true,
      reorder: true,
    },
    {
      id: "Estado",
      name: "Estado",
      selector: (row) => (!row.estado ? "Inactivo" : "Activo"),
      sortable: true,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div
          style={{
            display: "flex",
            width: "40px",
            justifyContent: "space-between",
            fontSize: "18px",
          }}
        >
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </div>
      ),
    },
  ]);
};

export const rolLayout = (handleEdit, handleDelete) => {
  let rol;
  return (rol = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row.id,
    },
    {
      id: "Nombre",
      name: "Nombre",
      selector: (row) => row.nombre,
    },
    {
      id: "Usuario",
      name: "Usuario",
      selector: (row) => row.usuario,
    },
    {
      id: "Puesto",
      name: "Puesto",
      selector: (row) => row.cargo,
    },
    {
      id: "Rol",
      name: "Rol",
      selector: (row) => row.rol,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </>
      ),
    },
  ]);
};

export const campamentoLayout = (handleEdit, handleDelete) => {
  let campamento;
  return (campamento = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      id: "Nombre",
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },

    {
      id: "Dirección",
      name: "Dirección",
      selector: (row) => row.direccion,
      sortable: true,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div
          style={{
            display: "flex",
            width: "40px",
            justifyContent: "space-between",
            fontSize: "18px",
          }}
        >
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </div>
      ),
    },
  ]);
};
//modulo personal
export const historialEvaluacion = (handleEdit, handleDelete) => {
  let historialEvaluacion;
  return (historialEvaluacion = [
    {
      id: "Id Historial",
      name: "Id Historial",
      selector: (row, index) => row?.evaluacion_id,
      width: "120px",
    },
    {
      id: "Nombre",
      name: "Nombre",
      selector: (row) => row?.nombre,
      width: "250px",
    },
    {
      id: "Fecha de inicio",
      name: "Fecha de evaluación",
      selector: (row) =>
        row.fecha_evaluacion && row.fecha_evaluacion.split("T")[0],
    },
    {
      id: "Nota",
      name: "Nota",
      selector: (row) => row?.nota_contrato,
    },

    {
      id: "estado",
      name: "Estado",
      selector: (row) => (row?.finalizado ? "Finalizado" : "Pendiente"),
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e)} />
        </>
      ),
    },
  ]);
};

export const historialContrato = (handleEdit, handleDelete) => {
  let historialContrato;
  return (historialContrato = [
    {
      id: "Id contrato",
      name: "Id contrato",
      selector: (row) => row?.codigo_contrato,
    },
    {
      id: "Tipo de Contrato",
      name: "Tipo de Contrato",
      selector: (row) => row?.tipo_contrato,
    },
    {
      id: "Fecha de inicio",
      name: "Fecha de inicio",
      selector: (row) => row?.fecha_inicio?.split("T")[0],
    },
    {
      id: "Fecha de fin",
      name: "Fecha de fin",
      selector: (row) => row?.fecha_fin?.split("T")[0],
    },
    {
      id: "Estado",
      name: "Estado",
      selector: (row) => (row?.finalizado ? "Finalizado" : "Pendiente"),
    },
    {
      id: "Nota",
      name: "Nota",
      selector: (row) => row?.nota_contrato,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e)} />
        </>
      ),
    },
  ]);
};

export const personalLayout = (
  handleEvaluacion,
  handleContrato,
  deshabilitarTrabajador,
  handleEdit,
  handleDelete
) => {
  let personal;
  return (personal = [
    {
      id: "codigo",
      name: "Codigo",
      sortable: true,
      selector: (row) => row?.codigo_trabajador,
    },
    {
      id: "foto",
      name: "Foto",
      selector: (row) => (
        <div style={{ padding: "3px" }}>
          <img
            src={row?.foto || "https://via.placeholder.com/80"}
            style={{ height: "60px" }}
          ></img>
        </div>
      ),
    },
    {
      id: "Trabajador",
      name: "Trabajador",
      selector: (row) =>
        row?.nombre + " " + row?.apellido_paterno + " " + row?.apellido_materno,
      width: "300px",
      sortable: true,
    },
    {
      id: "Campamento",
      name: "Campamento",
      selector: (row) =>
        row && row?.campamento ? row.campamento : "Por asignar",
      sortable: true,
    },
    {
      id: "Dni",
      name: "Dni",
      selector: (row) => row?.dni,
      sortable: true,
    },
    {
      id: "telefono",
      name: "Telefono",
      selector: (row) => row?.telefono,
      sortable: true,
    },
    {
      id: "Evaluación",
      name: "Evaluación",
      selector: (row) => row.id,

      button: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handleEvaluacion(e)} />
          {e.fiscalizador === "si" &&
          e.control === "si" &&
          e.topico === "si" &&
          e.seguridad === "si" &&
          e.medio_ambiente === "si" &&
          e.recursos_humanos === "si" &&
          !e.evaluacion_finalizada ? (
            <AiOutlineCheck
              style={{ color: "green", fontWeigth: "bold", fontSize: "16px" }}
            />
          ) : e.evaluacion_id && !e.evaluacion_finalizada ? (
            <AiOutlineClose
              style={{ color: "red", fontWeigth: "bold", fontSize: "16px" }}
            />
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      id: "Contrato",
      name: "Contrato",
      button: true,
      cell: (e) => (
        <div
          disabled
          style={{
            width: "40px",
            display: "flex",
            justifyContent: "space-around",
            fontSize: "13px",
          }}
        >
          {e?.nota ? e.nota : "--"}
          <AiFillEye
            onClick={() => {
              handleContrato(e);
            }}
          />
        </div>
      ),
    },

    {
      id: "Deshabilitar",
      name: "Deshabilitar",
      button: true,
      cell: (e) => (
        <input
          type="checkbox"
          defaultChecked={e.deshabilitado}
          onChange={(a) => deshabilitarTrabajador(a, e)}
        />
      ),
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </>
      ),
    },
  ]);
};

export const asociacionLayout = (
  changeHandler,
  handleContrato,
  handleEdit,
  handleDelete
) => {
  let asociacion;
  return (asociacion = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      id: "Asociación",
      name: "Asociación",
      selector: (row) => row?.nombre,
      sortable: true,
    },
    {
      id: "tipo",
      name: "Tipo de Asociación",
      selector: (row) => row?.tipo,
      sortable: true,
    },
    {
      id: "Campamento",
      name: "Campamento",
      sortable: true,

      selector: (row) => (row?.campamento ? row.campamento : "Por asignar"),
    },
    {
      id: "Asignar Trabajadores",
      name: "Asignar Trabajadores",
      button: true,
      cell: (e) => (
        <>
          {" "}
          <AiFillFileExcel onClick={() => changeHandler(e)} />{" "}
        </>
      ),
      width: "200px",
    },
    {
      id: "Contrato",
      name: "Contrato",
      button: true,
      cell: (e) => (
        <div
          style={{
            width: "40px",
            display: "flex",
            justifyContent: "space-around",
            fontSize: "13px",
          }}
        >
          <AiFillEye onClick={() => handleContrato(e)} />
        </div>
      ),
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </>
      ),
    },
  ]);
};

export const socioLayout = (handleEdit, handleDelete) => {
  let personal;
  return (personal = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      id: "nombre",
      name: "Apellidos y nombres",
      selector: (row) => row?.nombre,
      sortable: true,
    },
    {
      id: "dni",
      name: "Dni",
      selector: (row) => row?.dni,
      sortable: true,
    },
    {
      id: "telefono",
      name: "Teléfono",
      sortable: true,

      selector: (row) => row?.telefono,
    },
    {
      id: "cooperativa",
      name: "Cooperativa",
      sortable: true,

      selector: (row) => row?.cooperativa,
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </>
      ),
    },
  ]);
};

//modulo planilla
export const listaAsistencia = (handleEdit, handleDelete) => {
  let listaAsistencia;
  return (listaAsistencia = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
    },
    {
      id: "fecha",
      name: "Fecha",
      sortable: true,

      selector: (row) => row?.fecha,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </>
      ),
    },
  ]);
};

export const crearAsistencia = (handleAsistencia) => {
  let crearAsistencia;

  return (crearAsistencia = [
    {
      id: "Nro",
      name: "Nro",
      width: "80px",
      selector: (row, index) => index + 1,
    },
    {
      id: "dni",
      name: "Dni",
      sortable: true,
      width: "20%",

      selector: (row) => row?.dni,
    },

    {
      id: "nombre",
      name: "Nombre",
      sortable: true,
      width: "30%",

      selector: (row) =>
        row?.nombre + " " + row?.apellido_paterno + " " + row?.apellido_materno,
    },

    {
      id: "asistencia",
      name: "Asistencia",
      sortable: true,
      width: "20%",

      cell: (e) => (
        <>
          <select
            defaultValue={e?.trabajador_asistencia?.map((item) => {
              return item.asistencia;
            })}
            onChange={(event) => handleAsistencia(event, e)}
          >
            <option value="-1">Seleccione</option>
            <option value="Asistio">Asistio</option>
            <option value="Falto">Falto</option>
            <option value="Permiso">Permiso</option>
            <option value="Dia Libre">Dia Libre</option>
            <option value="Comisión">Comisión</option>
          </select>
        </>
      ),
    },

    {
      id: "tipo",
      name: "Tipo de trabajador",
      button: true,
      width: "20%",

      selector: (row) =>
        row?.asociacion_id === null ? "Normal" : "Asociación",
    },
  ]);
};

export const controlPlanilla = (handleContrato) => {
  let control;
  return (control = [
    {
      id: "Nro",
      name: "Nro",
      width: "60px",
      selector: (row, index) => index + 1,
    },
    {
      id: "nombres",
      name: "Nombres y apellidos",
      selector: (row) => row?.nombre,

      sortable: true,
    },
    {
      id: "celular",
      name: "Celular",
      sortable: true,
      selector: (row) => (row?.telefono ? row.telefono : "---"),
      center: true,
    },
    {
      id: "fecha_inicio",
      name: "Fecha de inicio",
      selector: (row) => row?.fecha_inicio.slice(0, 10),
    },
    {
      id: "fecha_fin",
      name: "Fecha de fin",
      button: true,
      selector: (row) => row?.fecha_fin.slice(0, 10),
    },
    {
      id: "Dias",
      name: "Dias laborados",
      button: true,
      selector: (row) => (row?.asistencia ? row.asistencia : "--"),
    },
    {
      id: "volquete",
      name: "Volquete",
      selector: (row) =>
        row?.volquete === "" || row?.volquete === null ? 0 : row.volquete,

      center: true,
    },

    {
      id: "teletrans",
      name: "Teletrans",
      selector: (row) =>
        row?.teletran === "" || row?.teletran === null ? 0 : row.teletran,

      center: true,
    },
    {
      id: "saldo",
      name: "Saldo",
      button: true,
      selector: (row) => row?.saldo,

      center: true,
    },
    {
      id: "control",
      name: "Control",
      button: true,
      center: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handleContrato(e)} />
        </>
      ),
    },
  ]);
};

export const planillaControl = (handleValidacion, handlePagos) => {
  let control;

  return (control = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      id: "fecha_inicio",
      name: "Fecha de inicio",
      selector: (row) => row?.fecha_inicio?.split("T")[0],
      sortable: true,
    },

    {
      id: "fecha_pago",
      name: "Fecha de pago",
      sortable: true,
      selector: (row) => row?.fecha_fin?.split("T")[0],
    },

    {
      id: "estado",
      name: "Estado",
      button: true,
      selector: (row) => (row?.finalizado !== true ? "Pendiente" : "Pagado"),
    },

    {
      id: "validacion",
      name: "Validacion de pagos",
      button: true,
      center: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handleValidacion(e)} />
        </>
      ),
    },
    {
      id: "pagos",
      name: "Pagos",
      button: true,
      center: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handlePagos(e)} />
        </>
      ),
    },
  ]);
};

export const sumarTeletrans = (handleValidacion, handlePagos) => {
  let control;

  return (control = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      id: "nombres",
      name: "Nombres y apellidos",
      selector: (row) =>
        row?.nombre + " " + row?.apellido_paterno + " " + row?.apellido_materno,
      sortable: true,
      width: "200px",
    },

    {
      id: "celular",
      name: "Celular",
      sortable: true,
      selector: (row) => row?.telefono,
    },

    {
      id: "dias",
      name: "Dias laborados",
      selector: (row) => row?.dias_laborados,
    },

    {
      id: "volquete",
      name: "Volquete",
      selector: (row) => row?.volquete,
    },

    {
      id: "teletrans",
      name: "Teletrans",
      selector: (row) => row?.teletrans,
    },
    {
      id: "saldo",
      name: "Saldo",
      sortable: true,
      selector: (row) => row?.saldo,
    },

    // {
    //   id: "pagos",
    //   name: "Pagos",
    //   button: true,
    //   center: true,
    //   cell: (e) => (
    //     <>
    //       <AiFillEye onClick={() => handlePagos(e)} />
    //     </>
    //   ),
    // },
  ]);
};

export const validacionPagos = () => {
  let pagos;
  return (pagos = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
    },
    {
      id: "fecha",
      name: "Fecha",
      sortable: true,
      center: true,
      selector: (row) => row?.asistencium?.fecha,
    },
    {
      id: "Asistencia",
      name: "Asistencia",
      selector: (row) => row?.asistencia,
      sortable: true,
    },
    {
      id: "ingreso",
      name: "Hora ingreso",
      selector: (row) =>
        row?.hora_ingreso === "" || row?.hora_ingreso === null
          ? "--"
          : row.hora_ingreso,
      sortable: true,
    },
    {
      id: "tardanza",
      name: "Tardanza",
      selector: (row) =>
        row?.tarde === "Falto" || row?.tarde === null
          ? "--"
          : row.tarde + " min",
      sortable: true,
    },

    {
      id: "Observación",
      name: "Observación",
      sortable: true,
      selector: (row) => (row?.observacion ? row.observacion : "--"),
    },
  ]);
};

// modulo finanzas

export const finanzas = (handleEdit, handleDelete) => {
  let finanzas;
  return (finanzas = [
    {
      id: "Nro",
      name: "Nro",
      width: "80px",
      selector: (row, index) => index + 1,
    },
    {
      id: "fecha",
      name: "Fecha",
      sortable: true,
      selector: (row) => row?.fecha,
    },
    {
      id: "tipo",
      name: "Tipo de movimiento",
      sortable: true,
      selector: (row) => row?.movimiento,
    },
    {
      id: "area",
      name: "Area",
      sortable: true,
      selector: (row) => row?.area,
    },
    {
      id: "encargado",
      name: "Encargado",
      sortable: true,
      selector: (row) => row?.encargado,
    },
    {
      id: "descripcion",
      name: "Descripción",
      sortable: true,
      selector: (row) => (row?.descripcion ? row.descripcion : "---"),
    },
    {
      id: "proveedor",
      name: "Proveedor",
      sortable: true,
      selector: (row) => (row?.proveedor ? row.proveedor : "---"),
    },

    {
      id: "monto",
      name: "Monto",
      sortable: true,
      selector: (row) => row?.monto,
    },
    {
      id: "cantidad",
      name: "Cantidad",
      sortable: true,
      selector: (row) => (row?.cantidad ? row.cantidad : "---"),
    },
    {
      id: "medida",
      name: "Medida",
      sortable: true,
      selector: (row) => (row?.medida ? row.medida : "---"),
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </>
      ),
    },
  ]);
};

export const proveedor = (handleEdit, handleDelete) => {
  let proveedor;
  return (proveedor = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
    },
    {
      id: "nombre",
      name: "Nombre",
      sortable: true,
      selector: (row) => row?.nombre,
    },
    {
      id: "dni",
      name: "Dni",
      sortable: true,
      selector: (row) => row?.dni,
    },
    {
      id: "direccion",
      name: "Dirección",
      sortable: true,
      selector: (row) => row?.direccion,
    },
    {
      id: "telefono",
      name: "Teléfono",
      sortable: true,
      selector: (row) => row?.telefono,
    },
    {
      id: "descripcion",
      name: "Descripción",
      sortable: true,
      selector: (row) => row?.descripcion,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </>
      ),
    },
  ]);
};

export const sucursalData = (handleEdit, handleDelete) => {
  let data;
  return (data = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
    },
    {
      id: "nombre",
      name: "Nombre",
      sortable: true,
      selector: (row) => row?.nombre,
    },
    {
      id: "saldo",
      name: "Saldo inicial",
      sortable: true,
      selector: (row) => row?.saldo_inicial,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <AiFillEdit onClick={() => handleEdit(e)} />
          <BsFillTrash2Fill onClick={() => handleDelete(e.id)} />
        </>
      ),
    },
  ]);
};
