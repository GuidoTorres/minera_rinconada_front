export const usuarioValues = {
  nombre: "",
  usuario: "",
  contrasenia: "",
  estado: "",
};

export const rolValues = {
  usuario_id: "",
  cargo_id: "",
  rol_id: "",
};

export const campamentoValues = {
  nombre: "",
  direccion: "",
};

export const trabajadorValues = {
  dni: "",
  codigo_trabajador: "",
  fecha_nacimiento: "",
  telefono: "",
  nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  email: "",
  estado_civil: "",
  genero: "",
  direccion: "",
  asociacion_id: null,
};

export const trabajadorEvaluacionValues = (selected) => {
  let evaluacion;

  return (evaluacion = {
    fecha_evaluacion: "",
    puesto: "",
    capacitacion_sso: "",
    capacitacion_gema: "",
    evaluacion_laboral: "",
    presion_arterial: "",
    temperatura: "",
    saturacion: "",
    imc: "",
    pulso: "",
    diabetes: "",
    antecedentes: "",
    emo: "",
    trabajador_id: selected.dni,
    aprobado: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
    fiscalizador: "",
    fiscalizador_aprobado: "no",
    control: "no",
    topico: "no",
    seguridad: "no",
    medio_ambiente: "no",
    recursos_humanos: "no",
    topico_observacion: "",
    control_observacion: "",
    seguridad_observacion: "",
    medio_ambiente_observacion: "",
    recursos_humanos_observacion: "",
    finalizado: false,
  });
};

export const empresaContratoValues = (data) => {
  let contratoValues;

  return (contratoValues = {
    fecha_inicio: "",
    codigo_contrato: "",
    tipo_contrato: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
    periodo_trabajo: "",
    fecha_fin: "",
    gerencia: "",
    area: "",
    jefe_directo: "",
    base: "",
    termino_contrato: "",
    campamento_id: "",
    nota_contrato: "",
    puesto: "",
    evaluacion_id: data?.evaluacion_id,
    estado: false,
  });
};

export const valuesContrato = (data, evaluaciones) => {
  let contratoValues;
  return (contratoValues = {
    fecha_inicio: "",
    codigo_contrato: "",
    tipo_contrato: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
    periodo_trabajo: "",
    fecha_fin: "",
    gerencia: "",
    area: "",
    jefe_directo: "",
    base: "",
    termino_contrato: "",
    campamento_id: "",
    nota_contrato: "",
    puesto: "",
    asociacion_id: data && data?.id,
    evaluacion_id: evaluaciones.map((item) => item.evaluacion_id).flat(),
    estado: false,
  });
};

export const trabajadorContratoValues = (data) => {
  let contratoValue;
  return (contratoValue = {
    fecha_inicio: "",
    codigo_contrato: "",
    tipo_contrato: "",
    recomendado_por: "",
    cooperativa: "",
    condicion_cooperativa: "",
    periodo_trabajo: "",
    fecha_fin: "",
    gerencia: "",
    area: "",
    jefe_directo: "",
    base: "",
    termino_contrato: "",
    campamento_id: "",
    nota_contrato: "",
    puesto: "",
    evaluacion_id: data.evaluacion_id,
    estado: false,
    volquete: "",
    teletran: "",
    suspendido: "-1",
    finalizado: false,
  });
};

export const IngresoEgresoValues = (data) => {
  let ingresoEgreso
  return ingresoEgreso = {
    sucursal_id: "",
    fecha: "",
    movimiento: "",
    forma_pago: "",
    encargado: "",
    area: "",
    cantidad: "",
    medida: "",
    descripcion: "",
    monto: "",
    proveedor: "",
    comprobante: "",
    dni: "",
    // saldo_inicial: "",
    // ingresos: "",
    // egresos: "",
    // saldo_final: "",
    sucursal_transferencia: ""
  };
};

export const proveedorValues = {
  nombre: "",
};

export const sucursalValues = {
  nombre: "",
  codigo: "",
  descripcion: "",
  saldo_inicial: "",
};
