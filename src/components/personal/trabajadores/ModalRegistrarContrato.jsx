import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import moment from "moment";
import { trabajadorContratoValues } from "../../../data/initalValues";
import MainModal from "../../modal/MainModal";
import { notificacion } from "../../../helpers/mensajes";
import { Button, Form, Select } from "antd";
import { AiOutlineForm } from "react-icons/ai";
import { modalRegistroContratoPersonal } from "../../../data/FormValues";
import "../styles/modalRegistrarContrato.css";

const ModalRegistrarContrato = ({
  actualizarTrabajadores,
  actualizarTabla,
  selected,
  data,
  trabajador
}) => {
  const [form] = Form.useForm();

  const route = "contrato";
  const route1 = "cargo";
  const route2 = "campamento";
  const route3 = "gerencia";
  const route4 = "area";
  const route5 = "socio";
  const contratoValues = trabajadorContratoValues(data);

  const {
    createData,
    updateData,
    getData,
    setDataToEdit,
    dataToEdit,
    modal3,
    setModal3,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [contrato, setContrato] = useState(contratoValues);
  const [cargo, setCargo] = useState([]);
  const [campamento, setCampamento] = useState([]);
  const [gerencia, setGerencia] = useState([]);
  const [area, setArea] = useState([]);
  const [socio, setSocio] = useState([]);

  const getAll = async () => {
    const response1 = await getData(route1);
    const response2 = await getData(route2);
    const response3 = await getData(route3);
    const response4 = await getData(route4);
    const response5 = await getData(route5);

    setCargo(response1.data);
    setCampamento(response2.data);
    setGerencia(response3.data);
    setArea(response4.data);
    setSocio(response5.data);
  };

  const addDays = (date, daysToAdd) => {
    const WEEKEND = [moment().day("Sunday").weekday()];
    var daysAdded = 0,
      momentDate = moment(new Date(date));
    while (daysAdded < daysToAdd) {
      momentDate = momentDate.add(1, "days");
      if (!WEEKEND.includes(momentDate.weekday())) {
        daysAdded++;
      }
    }
    let fecha = momentDate._d?.toISOString().split("T")[0];

    setContrato((prevState) => {
      return { ...prevState, fecha_fin: fecha };
    });
  };
  useEffect(() => {
    if (dataToEdit) {
      setContrato(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setContrato(contratoValues);
    }
  }, [dataToEdit]);

  useEffect(() => {
    getAll();
  }, []);
  useEffect(() => {
    if (contrato.fecha_inicio !== "" && contrato.periodo_trabajo !== "") {
      let inicial = 14;
      let fechaInicio = contrato.fecha_inicio;
      let total = inicial * parseInt(contrato.periodo_trabajo);
      addDays(fechaInicio, total);
    } else {
      setContrato((prevState) => {
        return { ...prevState, fecha_fin: "" };
      });
    }
  }, [contrato.fecha_inicio, contrato.periodo_trabajo]);

  const handleData = (e, text) => {
    if (!text && e.target) {
      const { name, value } = e.target;
      form.setFieldsValue({
        [name]: value,
      });
      setContrato((values) => {
        return { ...values, [name]: value };
      });
    } else {
      form.setFieldsValue({
        [text]: e,
      });
      setContrato((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  const handleSubmit = async () => {
    if (dataToEdit === null) {
      setCargando(true);
      const response = await createData(contrato, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        actualizarTrabajadores();
        setCargando(false);
      }
    }
    if (dataToEdit) {
      setCargando(true);
      const response = await updateData(contrato, selected.id, route);
      if (response) {
        notificacion(response.status, response.msg);
        closeModal();
        actualizarTabla();
        setCargando(false);
      }
    }
  };

  const closeModal = () => {
    setModal3(false);
    setDataToEdit(null);
    setContrato(contratoValues);
  };

  const formData = modalRegistroContratoPersonal(
    contrato,
    handleData,
    cargo,
    campamento,
    gerencia,
    area
  );
  return (
    <MainModal
      className={"modal-contrato"}
      title={dataToEdit ? "Editar contrato" : "Registrar contrato"}
      open={modal3}
      width={900}
      closeModal={closeModal}
    >
      <Form
        form={form}
        className="modal-body"
        onFinish={handleSubmit}
        layout="horizontal"
      >
          {/* <label htmlFor="">Contrato</label> */}
        <div className="contrato">
          {formData.splice(0, 12).map((item, i) => (
            <Form.Item
            className="item"
              key={i}
              name={item.name}
              rules={item.rules}
              style={{ marginBottom: "8px" }}
            >
              <>
                {item.label}
                {item.type}
              </>
            </Form.Item>
          ))}
        </div>
        <div className="termino-contrato">

          {formData.map((item, i) => (
            <Form.Item
            key={i}
            name={item.name}
            rules={item.rules}
            style={{ marginBottom: "8px" }}
            >
              <>
                {item.label}
                {item.type}
              </>
            </Form.Item>
          ))}
          </div>
        <Form.Item className="button-container">
          <Button
            htmlType="submit"
            icon={<AiOutlineForm />}
            loading={cargando ? true : false}
          >
            {dataToEdit ? " Editar" : " Registrar"}
          </Button>
        </Form.Item>
      </Form>
    </MainModal>
  );
};

export default ModalRegistrarContrato;
