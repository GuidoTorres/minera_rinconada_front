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
  eliminar: false,
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

//finanzas
export const IngresoEgresoValues = (data) => {
  let ingresoEgreso;
  return (ingresoEgreso = {
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
    sucursal_transferencia: "",
  });
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

//logistica
export const almacenValues = {
  nombre: "",
  codigo: "",
  descripcion: "",
};

export const productoValues = (id) => {
  let data;

  return (data = {
    codigo: "",
    nombre: "",
    codigo_interno: "",
    codigo_barras: "",
    descripcion: "",
    categoria: "",
    unidad: "",
    precio: "",
    fecha: "",
    observacion: "",
    almacen_id: parseInt(id),
    stock: "0",
    costo_total: "",
  });
};

export const entradaSalidaValues = (tipo, id) => {
  let data;

  return (data = {
    codigo: "",
    motivo: "",
    fecha: "",
    encargado: "",
    codigo_compra: "",
    boleta: "",
    codigo_requerimiento: "",
    producto_id: "",
    categoria: "",
    cantidad: "",
    unidad: "",
    tipo: tipo,
    producto: "",
    almacen_id: id,
  });
};

export const requerimientoValues = (id) => {
  let data;

  return (data = {
    codigo: "000" +(parseInt(id)+1),
    fecha_pedido: "",
    fecha_entrega: "",
    solicitante: "",
    area: "",
    celular: "",
    proyecto: "",
    producto_id: "",
    cantidad: "",
    unidad: "",
    estado: "",
    producto: "",
    personal: ""
  });
};
