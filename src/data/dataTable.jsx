import {

  BsPencil,
  BsTrash,
  BsQuestionCircle,
  BsKey,
} from "react-icons/bs";
import {
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
  AiFillFileExcel,
} from "react-icons/ai";
import { BiUndo } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import { FaUserLock } from "react-icons/fa";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { Popconfirm, Tag, Checkbox } from "antd";
import Requerimiento from "../helpers/Requerimiento";

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
      id: "Estado",
      name: "Estado",
      selector: (row) =>
        !row.estado ? (
          <Tag color="volcano">Inactivo</Tag>
        ) : (
          <Tag color="green">Activo</Tag>
        ),
      sortable: true,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />

          <Popconfirm
            title="Eliminar usuario"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e.id)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
            icon={<BsQuestionCircle style={{ color: "red" }} />}
          >
            <BsTrash />
          </Popconfirm>
        </div>
      ),
    },
  ]);
};

export const rolLayout = (handleEdit, handleDelete, handlePermisos) => {
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
      id: "descripcion",
      name: "Descripción",
      selector: (row) => row.descripcion,
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <BsKey onClick={() => handlePermisos(e)} />
          <div className="acciones">
            <BsPencil onClick={() => handleEdit(e)} />

            <Popconfirm
              title="Eliminar usuario"
              description="¿Estas seguro de eliminar?"
              onConfirm={() => handleDelete(e.id)}
              // onCancel={cancel}
              okText="Si"
              cancelText="No"
              placement="topRight"
              icon={<BsQuestionCircle style={{ color: "red" }} />}
            >
              <BsTrash />
            </Popconfirm>
          </div>
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
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />

          <Popconfirm
            title="Eliminar usuario"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e.id)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
            icon={<BsQuestionCircle style={{ color: "red" }} />}
          >
            <BsTrash />
          </Popconfirm>
        </div>
      ),
    },
  ]);
};
//modulo personal
export const tableHistorialEvaluacion = (handleEdit, handleDelete) => {
  let historialEvaluacion;
  return (historialEvaluacion = [
    {
      id: "Id Historial",
      name: "Id Historial",
      selector: (row, index) => index + 1,
      width: "120px",
    },
    {
      id: "Nombre",
      name: "Nombre y apellido",
      selector: (row) => row?.nombre,
      width: "220px",
    },
    {
      id: "Fecha de inicio",
      name: "Fecha de evaluación",
      width: "200px",

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
      center: true,
      selector: (row) =>
        row?.finalizado ? (
          <Tag color="green">Finalizado</Tag>
        ) : (
          <Tag color="volcano">Pendiente</Tag>
        ),
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />

          <Popconfirm
            title="Eliminar evaluación"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
            icon={<BsQuestionCircle style={{ color: "red" }} />}
          >
            <BsTrash />
          </Popconfirm>
        </div>
      ),
    },
  ]);
};

export const tableHistorialContrato = (handleEdit, handleDelete) => {
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
      selector: (row) =>
        row?.finalizado ? (
          <Tag color="green">Finalizado</Tag>
        ) : (
          <Tag color="volcano">Pendiente</Tag>
        ),
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
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />

          <Popconfirm
            title="Eliminar contrato"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
            icon={<BsQuestionCircle style={{ color: "red" }} />}
          >
            <BsTrash />
          </Popconfirm>
        </div>
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
            style={{ height: "60px", width: "80px" }}
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
          {e?.evaluacion?.at(-1)?.fiscalizador_aprobado === "si" &&
          e?.evaluacion?.at(-1)?.control === "si" &&
          e?.evaluacion?.at(-1)?.topico === "si" &&
          e?.evaluacion?.at(-1)?.seguridad === "si" &&
          e?.evaluacion?.at(-1)?.medio_ambiente === "si" &&
          e?.evaluacion?.at(-1)?.recursos_humanos === "si" &&
          !e?.evaluacion?.at(-1)?.finalizado ? (
            <AiOutlineCheck
              style={{ color: "green", fontWeigth: "bold", fontSize: "16px" }}
            />
          ) : e?.evaluacion?.at(-1)?.id &&
            !e?.evaluacion?.at(-1)?.finalizado ? (
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
        <div>
          {e?.contrato
            ? e?.contrato[e?.contrato?.length - 1]?.nota_contrato
            : "--"}
          <>
            <AiFillEye
              onClick={() => {
                handleContrato(e);
              }}
            />
            {e?.contrato?.length > 0 &&
            e?.contrato[e?.contrato?.length - 1]?.finalizado === false ? (
              <AiOutlineCheck
                style={{ color: "green", fontWeigth: "bold", fontSize: "16px" }}
              />
            ) : (
              ""
            )}
          </>
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
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <Popconfirm
            title="Eliminar trabajador"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e.dni)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
          >
            <BsTrash />
          </Popconfirm>
        </div>
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
      cell: (e, index) => (
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
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <Popconfirm
            title="Eliminar trabajador"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e.id)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
          >
            <BsTrash />
          </Popconfirm>
        </div>
      ),
    },
  ]);
};

export const empresaLayout = (handleContrato, handleEdit, handleDelete) => {
  let empresa;
  return (empresa = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => index + 1,
    },
    {
      id: "Empresa",
      name: "Empresa",
      selector: (row) => row.razon_social,
    },

    {
      id: "Contrato",
      name: "Contrato",
      button: true,
      cell: (e) => (
        <>
          <AiFillEye onClick={() => handleContrato(e)} />
        </>
      ),
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <Popconfirm
            title="Eliminar campamento"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e.id)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
          >
            <BsTrash />
          </Popconfirm>
        </div>
      ),
    },
  ]);
};

export const empresaHistorialContrato = (handleEdit, handleDelete) => {
  let columns;
  return (columns = [
    {
      id: "Id contrato",
      name: "Id contrato",
      selector: (row) => row?.contratos?.map((item) => item.id),
    },
    {
      id: "Tipo de Contrato",
      name: "Tipo de Contrato",
      selector: (row) => row?.contratos?.map((item) => item.tipo_contrato),
    },
    {
      id: "Fecha de inicio",
      name: "Fecha de inicio",
      selector: (row) =>
        row?.contratos?.map((item) => item.fecha_inicio.split("T")[0]),
    },
    {
      id: "Fecha de fin",
      name: "Fecha de fin",
      selector: (row) =>
        row?.contratos?.map((item) => item.fecha_fin.split("T")[0]),
    },
    {
      id: "Estado",
      name: "Estado",
    },
    {
      id: "Nota",
      name: "Nota",
      selector: (row) => row?.contratos?.map((item) => item.nota_contrato),
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <Popconfirm
            title="Eliminar campamento"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
          >
            <BsTrash />
          </Popconfirm>
        </div>
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
      selector: (row, index) => row.id,
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
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <Popconfirm
            title="Eliminar rol"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e.id)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
          >
            <BsTrash />
          </Popconfirm>
        </div>
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
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <BsTrash onClick={() => handleDelete(e.id)} />
        </div>
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
      width: "110px",

      selector: (row) => row?.dni,
    },

    {
      id: "nombre",
      name: "Nombre",
      sortable: true,

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
      selector: (row) =>
        row?.nombre + " " + row?.apellido_paterno + " " + row?.apellido_materno,
      width: "250px",
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
      selector: (row) => row?.contratos?.at(-1)?.fecha_inicio.split("T")[0],
    },
    {
      id: "fecha_fin",
      name: "Fecha de fin",
      button: true,
      selector: (row) => row?.contratos?.at(-1)?.fecha_fin.split("T")[0],
    },
    {
      id: "Dias",
      name: "Dias laborados",
      button: true,
      selector: (row) => (row?.asistencia ? row.asistencia : "--"),
      style: {
        borderBotton: "none",
        color: "#555555",
        // maxWidth: "40px",
      },
    },
    {
      id: "volquete",
      name: "Volquete",
      selector: (row) => row?.contratos?.at(-1)?.volquete,

      center: true,
    },

    {
      id: "teletrans",
      name: "Teletrans",
      selector: (row) => row?.contratos?.at(-1)?.volquete,

      center: true,
    },
    {
      id: "total",
      name: "Total",
      button: true,
      selector: (row) =>
        parseInt(row?.contratos?.at(-1)?.volquete) * 4 +
        parseInt(row?.contratos?.at(-1)?.volquete),

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

export const tablePlanillaControl = (handleValidacion, handlePagos) => {
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
      width: "150px",

      selector: (row) => row?.fecha_inicio?.split("T")[0],
      sortable: true,
    },

    {
      id: "fecha_pago",
      name: "Fecha de fin",
      width: "135px",
      sortable: true,
      selector: (row) => row?.fecha_fin?.split("T")[0],
    },

    {
      id: "estado",
      name: "Estado",
      button: true,
      width: "100px",
      selector: (row) => (row?.finalizado !== true ? "Pendiente" : "Pagado"),
    },
    {
      id: "dias",
      name: "Días laborados",
      button: true,
      selector: (row) => (row?.asistencia ? row.asistencia : "--"),
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
          <AiFillEye
            onClick={() => handlePagos(e)}
            style={{
              pointerEvents: !e?.asistencia
                ? " auto"
                : e?.asistencia == 15
                ? "auto"
                : "none",
            }}
          />
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
      width: "250px",
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
      id: "total",
      name: "Total",
      // sortable: true,
      selector: (row) => row?.saldo,
    },
    {
      id: "saldo",
      name: "Saldo",
      sortable: true,
      selector: (row) => row?.saldo % 4,
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

export const tableValidacionPagos = () => {
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
      selector: (row) => (row?.asistencia === "-1" ? "--" : row.asistencia),
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
      selector: (row) => (row?.tarde === "No" ? "No" : row.tarde),
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
      width: "60px",
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
      name: "Movimiento",
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
    // {
    //   id: "medida",
    //   name: "Medida",
    //   sortable: true,
    //   selector: (row) => (row?.medida ? row.medida : "---"),
    // },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <BsTrash onClick={() => handleDelete(e.id)} />
        </div>
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
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <Popconfirm
            title="Eliminar sucursal"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e.id)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
          >
            <BsTrash />
          </Popconfirm>
        </div>
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
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <Popconfirm
            title="Eliminar sucursal"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e.id)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
          >
            <BsTrash />
          </Popconfirm>
        </div>
      ),
    },
  ]);
};

export const almacen = (handleEdit, handleDelete) => {
  let data;
  return (data = [
    {
      id: "Nro",
      name: "Nro",
      selector: (row, index) => row?.id,
    },
    {
      id: "codigo",
      name: "Código",
      sortable: true,
      selector: (row) => row?.codigo,
    },
    {
      id: "nombre",
      name: "Nombre",
      sortable: true,
      selector: (row) => row?.nombre,
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
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <Popconfirm
            title="Eliminar almacén"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e.id)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
          >
            <BsTrash />
          </Popconfirm>
        </div>
      ),
    },
  ]);
};

export const inventario = (handleEdit, handleDelete) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      width: "80px",
      selector: (row, index) => row.id,
    },
    {
      id: "nombre",
      name: "Nombre",
      width: "280px",

      selector: (row, index) => row.nombre,
    },
    {
      id: "barras",
      name: "Código de barras",
      sortable: true,
      selector: (row) => row?.codigo_barras,
    },
    {
      id: "interno",
      name: "Código interno",
      sortable: true,
      selector: (row) => row?.codigo_interno,
    },
    {
      id: "descripcion",
      name: "Descripción",
      sortable: true,
      selector: (row) => row?.descripcion,
    },
    {
      id: "categoria",
      name: "Categoría",
      sortable: true,
      selector: (row) => row?.categoria,
    },
    {
      id: "stock",
      name: "Stock",
      sortable: true,
      selector: (row) => row?.stock,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <Popconfirm
            title="Eliminar producto"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e.id)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
          >
            <BsTrash />
          </Popconfirm>
        </div>
      ),
    },
  ]);
};

export const entradas = (handleEdit, handleDelete) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      selector: (row, index) => row.codigo,
    },
    {
      id: "fecha",
      name: "Fecha de entrada",
      sortable: true,
      selector: (row) => row?.fecha,
    },
    {
      id: "encargado",
      name: "Encargado",
      sortable: true,
      selector: (row) => row?.encargado,
    },
    {
      id: "ord_compra",
      name: "Orden de compra",
      sortable: true,
      selector: (row) => row?.codigo_compra,
    },
    {
      id: "cod_factura",
      name: "Código de factura",
      sortable: true,
      selector: (row) => row?.boleta,
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <BsTrash onClick={() => handleDelete(e.id)} />
        </div>
      ),
    },
  ]);
};

export const mostrarProductoEntrada = (handleDelete) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      width: "90px",
      selector: (row, index) => row.id,
    },
    {
      id: "producto",
      name: "Producto",
      selector: (row) => row?.nombre,
    },
    {
      id: "cantidad",
      name: "Cantidad",
      selector: (row) => row?.cantidad,
    },

    {
      id: "unidad",
      name: "Unidad",
      selector: (row) => row?.unidad,
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          {/* <AiFillEdit onClick={() => handleEdit(e)} /> */}

          <BsTrash onClick={() => handleDelete(e)} />
        </>
      ),
    },
  ]);
};

export const registrarEntrada = (
  handleData,
  handleDelete,
  entrada,
  dataToEdit,
  codigo,
  cantidad
) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      width: "90px",
      selector: (row, index) => row.id,
    },
    {
      id: "producto",
      name: "Producto",
      width: "200px",

      selector: (row) => row?.nombre,
    },

    {
      id: "cantidad",
      name: "Cantidad",
      cell: (e, i) => (
        <>
          <input
            type="number"
            disabled={codigo}
            name="cantidad"
            value={entrada || e.cantidad}
            onChange={(a) => handleData(a, i)}
            style={{ width: "60px" }}
          />
        </>
      ),
    },
    {
      id: "unidad",
      name: "Unidad",
      width: "200px",

      selector: (row) => row?.unidad,
    },
    {
      id: "costo",
      name: "Costo",
      selector: (row) => row.costo,
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          {/* <AiFillEdit onClick={() => handleEdit(e)} /> */}

          <BsTrash onClick={() => handleDelete(e)} />
        </>
      ),
    },
  ]);
};

export const productoEntrada = (handleEdit, handleDelete) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      width: "80px",
      selector: (row, index) => row.id,
    },
    {
      id: "fecha",
      name: "Fecha de entrada",
      width: "140px",

      selector: (row) => row?.fecha,
    },
    {
      id: "encargado",
      name: "Encargado",
      width: "220px",

      selector: (row) => row?.encargado,
    },
    {
      id: "orden_compra",
      name: "Orden de compra",
      selector: (row) => row?.codigo_compra,
    },
    {
      id: "factura",
      name: "Código factura",
      selector: (row) => row?.boleta,
    },

    {
      id: "acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />

          <BsTrash onClick={() => handleDelete(e)} />
        </div>
      ),
    },
  ]);
};

export const productoSalida = (handleEdit, handleDelete) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      width: "80px",
      selector: (row, index) => row.id,
    },
    {
      id: "fecha",
      name: "Fecha de salida",
      width: "140px",

      selector: (row) => row?.fecha,
    },
    {
      id: "area",
      name: "Área",
      width: "120px",

      selector: (row) => row?.area,
    },
    {
      id: "personal",
      name: "Personal",
      width: "220px",

      selector: (row) => row?.encargado,
    },
    {
      id: "motivo",
      name: "Motivo",
      selector: (row) => row?.motivo,
    },

    {
      id: "acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />

          <BsTrash onClick={() => handleDelete(e)} />
        </div>
      ),
    },
  ]);
};

export const mostrarRequerimientoTable = (handleData, handleDelete) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      width: "80px",

      selector: (row) => row.codigo_producto,
    },
    {
      id: "descripcion",
      name: "Decripción",
      selector: (row) => row?.descripcion,
    },
    {
      id: "stock",
      name: "Stock",
      selector: (row) => row?.stock,
    },

    {
      id: "unidad",
      name: "Unidad",
      selector: (row) => row?.unidad,
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <BsTrash onClick={() => handleDelete(e)} />
        </>
      ),
    },
  ]);
};

export const requerimientoTable = (handleData, handleDelete) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      width: "80px",

      selector: (row) => row.codigo_producto,
    },
    {
      id: "descripcion",
      name: "Decripción",
      selector: (row) => row?.descripcion,
    },
    {
      id: "cantidad",
      name: "Cantidad",
      cell: (e, i) => (
        <>
          <input
            type="number"
            name="cantidad"
            onChange={(a) => handleData(a, i)}
            value={e.cantidad}
            style={{ width: "60px" }}
          />
        </>
      ),
    },
    {
      id: "unidad",
      name: "Unidad",
      selector: (row) => row?.unidad,
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <BsTrash onClick={() => handleDelete(e)} />
        </>
      ),
    },
  ]);
};

export const requerimientoLayout = (handleEdit, handleDelete) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      width: "80px",
      selector: (row) => row?.id,
    },

    {
      id: "almacen",
      name: "Almacén",
      selector: (row) => row?.almacen,
    },
    {
      id: "area",
      name: "Área",
      selector: (row) => row?.area,
    },
    // {
    //   id: "solicitante",
    //   name: "Solicitante",
    //   selector: (row) => row?.solicitante,
    // },
    {
      id: "fecha_pedido",
      name: "Fecha de pedido",
      width: "120px",
      selector: (row) => row?.fecha_pedido,
    },
    {
      id: "estado",
      name: "Estado",
      center: true,
      width: "120px",

      selector: (row) =>
        row?.completado ? (
          <Tag color="green">Pedido</Tag>
        ) : row?.estado == "1" ? (
          <Tag color="blue">Aprobado</Tag>
        ) : (
          <Tag color="volcano">Pendiente</Tag>
        ),
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <BsTrash
            style={{
              pointerEvents: e?.completado
                ? "none"
                : e?.estado === 0
                ? "none"
                : "auto",
            }}
            onClick={() => handleDelete(e)}
          />
        </div>
      ),
    },
  ]);
};

export const pedidoLayout = (updatePedido, handleDelete) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      selector: (row) => "000" + row?.id,
    },
    {
      id: "fecha",
      name: "Fecha",
      selector: (row) => row?.fecha,
    },
    {
      id: "estado",
      name: "Estado",
      cell: (e) => (
        <select
          name="estado"
          defaultValue={e?.estado}
          onChange={(a) => updatePedido(a, e)}
        >
          <option value="-1">Seleccione</option>
          <option value="Cancelado">Cancelado</option>
          <option value="En camino">En camino</option>
          <option value="Aprobado">Aprobado</option>
        </select>
      ),
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <PDFDownloadLink
            document={<Requerimiento data={e} />}
            fileName="prueba.pdf"
          >
             <HiDownload />
          </PDFDownloadLink>
          <BsTrash onClick={() => handleDelete(e)} />
        </div>
      ),
    },
  ]);
};

export const transferenciaLayout = (
  handleChange,
  handleDelete,
  transferencia
) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      selector: (row) => row.id,
    },
    {
      id: "descripcion",
      name: "Descripción",
      selector: (row) => row?.nombre,
    },

    {
      id: "stock",
      name: "Stock",
      selector: (row) => row?.stock,
    },

    {
      id: "cantidad",
      name: "Cantidad",
      cell: (e, i) => (
        <input
          type="number"
          name="cantidad"
          style={{ width: "60px" }}
          onChange={(a) => handleChange(a, null, i)}
        />
      ),
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <>
          <BsTrash onClick={() => handleDelete(e)} />
        </>
      ),
    },
  ]);
};

export const categoriaLayout = (handleEdit, handleDelete) => {
  let columns;
  return (columns = [
    {
      id: "Nro",
      name: "Codigo",
      selector: (row) => row.id,
    },

    {
      id: "abreviatura",
      name: "Abreviatura",
      selector: (row) => row.abreviatura,
    },

    {
      id: "descripcion",
      name: "Descripcion",
      selector: (row) => row.descripcion,
    },

    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          <BsPencil onClick={() => handleEdit(e)} />
          <Popconfirm
            title="Eliminar categoría"
            description="¿Estas seguro de eliminar?"
            onConfirm={() => handleDelete(e)}
            // onCancel={cancel}
            okText="Si"
            cancelText="No"
            placement="topRight"
          >
            <BsTrash />
          </Popconfirm>
        </div>
      ),
    },
  ]);
};

export const aprobacionLayout = (updateAprobacion) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      selector: (row) => "000" + row.id,
    },
    {
      id: "fecha",
      name: "Fecha",
      selector: (row) => row?.fecha_pedido,
    },
    {
      id: "estado",
      name: "Estado",
      selector: (row) =>
        row?.estado === "1" ? (
          <Tag color="green">Aprobado</Tag>
        ) : (
          <Tag color="volcano">Pendiente</Tag>
        ),
    },
    {
      id: "jefe",
      name: "Jefe de Área",
      center: true,
      cell: (e) => (
        <Checkbox
          name="aprobacion_jefe"
          defaultChecked={e.aprobacion_jefe}
          onChange={(a) => updateAprobacion(a, e)}
        />
      ),
    },
    {
      id: "gerente",
      name: "Gerente de área",
      center: true,

      cell: (e) => (
        <Checkbox
          name="aprobacion_gerente"
          defaultChecked={e.aprobacion_gerente}
          onChange={(a) => updateAprobacion(a, e)}
        />
      ),
    },
    {
      id: "Superintendente",
      name: "Superintendente",
      center: true,

      cell: (e) => (
        <Checkbox
          name="aprobacion_superintendente"
          defaultChecked={e.aprobacion_superintendente}
          onChange={(a) => updateAprobacion(a, e)}
        />
      ),
    },

    // {
    //   id: "Acciones",
    //   name: "Acciones",
    //   button: true,
    //   cell: (e) => (
    //     <>
    //       <BsFillTrash2Fill onClick={() => handleDelete(e)} />
    //     </>
    //   ),
    // },
  ]);
};

export const transferenciaRealizada = (retornar, handleDelete) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      selector: (row) => row.id,
    },
    {
      id: "fecha",
      name: "Fecha",
      selector: (row) => row?.fecha?.split("T")[0],
    },
    {
      id: "destino",
      name: "Almacén destino",
      selector: (row) => row?.destino?.nombre,
    },

    {
      id: "estado",
      name: "Estado",
      selector: (row) =>
        row?.estado_origen === "Pendiente" ? (
          <Tag color="volcano">Pendiente</Tag>
        ) : row?.estado_origen === "Confirmado" ? (
          <Tag color="green">Confirmado</Tag>
        ) : (
          <Tag color="blue">Retornado</Tag>
        ),
    },
    {
      id: "Acciones",
      name: "Acciones",
      button: true,
      cell: (e) => (
        <div className="acciones">
          {e?.estado_destino === "Pendiente" ? (
            <BiUndo style={{ fontSize: "20px" }} onClick={() => retornar(e)} />
          ) : (
            ""
          )}
          {e?.estado_destino === "Pendiente" ? (
            <BsTrash onClick={() => handleDelete(e)} />
          ) : (
            ""
          )}
        </div>
      ),
    },
  ]);
};

export const transferenciaRecibida = (update) => {
  let data;
  return (data = [
    {
      id: "codigo",
      name: "Código",
      selector: (row) => row.id,
    },

    {
      id: "fecha",
      name: "Fecha",
      selector: (row) => row?.fecha,
    },
    {
      id: "origen",
      name: "Almacén origen",
      selector: (row) => row?.origen?.nombre,
    },

    {
      id: "estado",
      name: "Estado",
      selector: (row) =>
        row?.estado_origen === "Pendiente" ? (
          <Tag color="volcano">Pendiente</Tag>
        ) : row?.estado_origen === "Confirmado" ? (
          <Tag color="green">Confirmado</Tag>
        ) : (
          <Tag color="blue">Retornado</Tag>
        ),
    },

    {
      id: "recibido",
      name: "Recibido",
      button: true,
      cell: (e) => (
        <>
          <input
            type="checkbox"
            disabled={e?.estado_destino !== "Pendiente" ? true : false}
            defaultChecked={e?.estado_destino === "Confirmado" ? true : false}
            onChange={(a) => update(a, e)}
          ></input>
        </>
      ),
    },
  ]);
};
