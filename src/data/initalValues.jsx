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

export const evaluacionValues = {
  id: "",
  fecha_evaluacion: "",
  dni: "",
  puesto: "",
  contrato_id: "",
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
  trabajador_id: "",
};

export const valuesContrato = (data) => {
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
    evaluacion_id:
      data.trabajador.length > 0 &&
      data?.trabajador
        ?.map((item) => item?.evaluacions?.map((dat) => dat?.id))
        .flat(),
    estado: false,
  });
};

export const asociacionValues = {
  nombre: "",
  codigo: "",
};
