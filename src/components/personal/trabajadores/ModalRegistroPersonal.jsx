import React, { useContext, useEffect, useState } from "react";
import { CrudContext } from "../../../context/CrudContext";
import { trabajadorValues } from "../../../data/initalValues";
import MainModal from "../../modal/MainModal";
import DragAndDrop from "../DragAndDrop";
import { Button, Form } from "antd";
import { modalRegistroTrabajador } from "../../../data/FormValues";
import { notificacion } from "../../../helpers/mensajes";
import { AiOutlineForm } from "react-icons/ai";

import "../styles/modalRegistroPersonal.css";

const ModalRegistroPersonal = ({ actualizarTabla, data }) => {
  const [form] = Form.useForm();

  const route = "trabajador";

  const {
    getData,
    createData,
    updateData,
    setData3,
    data3,
    setModal,
    dataToEdit,
    setDataToEdit,
    modal,
    cargando,
    setCargando,
  } = useContext(CrudContext);
  const [trabajador, setTrabajador] = useState(trabajadorValues);
  const [avatar, setAvatar] = useState(null);

  const getAsociacion = async () => {
    const response = await getData("asociacion");
    setData3(response.data);
  };

  // useEffect(() => {
  //   if (data?.length === 0) {
  //     setTrabajador((value) => ({ ...value, codigo_trabajador: 1 }));
  //   } else {
  //     const cod = parseInt(data[data.length - 1]?.codigo_trabajador);
  //     setTrabajador((value) => ({ ...value, codigo_trabajador: cod + 1 }));
  //   }
  // }, [data]);

  useEffect(() => {
    if (dataToEdit) {
      getAsociacion();
    }
  }, []);

  useEffect(() => {
    if (dataToEdit) {
      setTrabajador(dataToEdit);
      form.setFieldsValue(dataToEdit);
    } else {
      setTrabajador(trabajadorValues);
    }
  }, [dataToEdit]);

  const handleData = (e, text) => {
    if (!text && e.target) {
      const { name, value } = e.target;
      form.setFieldsValue({
        [name]: value,
      });
      setTrabajador((values) => {
        return { ...values, [name]: value };
      });
    } else {
      form.setFieldsValue({
        [text]: e,
      });
      setTrabajador((values) => {
        return { ...values, [text]: e };
      });
    }
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.set("dni", trabajador.dni || "");
    formData.set("codigo_trabajador", trabajador.codigo_trabajador || "");
    formData.set("fecha_nacimiento", trabajador.fecha_nacimiento || "");
    formData.set("telefono", trabajador.telefono || "");
    formData.set("apellido_paterno", trabajador.apellido_paterno || "");
    formData.set("apellido_materno", trabajador.apellido_materno || "");
    formData.set("nombre", trabajador.nombre || "");
    formData.set("email", trabajador.email || "");
    formData.set("estado_civil", trabajador.estado_civil || "");
    formData.set("genero", trabajador.genero || "");
    formData.set("direccion", trabajador.direccion || "");
    formData.set("asociacion_id", trabajador.asociacion_id || "");
    formData.set("foto", trabajador.foto || "");

    avatar?.file && formData.set("image", avatar.file || "");

    if (dataToEdit === null) {
      setCargando(true);
      const query = await fetch(`http://localhost:3000/api/v1/trabajador`, {
        method: "POST",
        body: formData,
      });
      const response = await query.json();
      if (response) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
        setCargando(false);
      }
    }
    if (dataToEdit !== null) {
      setCargando(true);
      const query = await fetch(
        `http://localhost:3000/api/v1/trabajador/${dataToEdit.dni}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const response = await query.json();
      if (response) {
        notificacion(response.status, response.msg);
        actualizarTabla();
        closeModal();
        setCargando(false);
      }
    }
  };

  const closeModal = () => {
    setModal(false);
    setDataToEdit(null);
    setTrabajador(trabajadorValues);
    setCargando(false);
  };

  const formData = modalRegistroTrabajador(trabajador, handleData);

  return (
    <MainModal
      className={"modal-trabajador"}
      title={dataToEdit ? "Editar trabajador" : "Registrar trabajador"}
      open={modal}
      width={800}
      closeModal={closeModal}
    >
      <Form
        form={form}
        className="modal-body"
        onFinish={handleSubmit}
        layout="horizontal"
      >
        <section>
          <div className="data">
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
          <div className="avatar">
            <DragAndDrop
              avatar={avatar}
              setAvatar={setAvatar}
              selected={dataToEdit}
            />
          </div>
        </section>
        <div className="buttton-container">
          <Button
            htmlType="submit"
            icon={<AiOutlineForm />}
            loading={cargando ? true : false}
          >
            {dataToEdit ? "Editar" : "Registrar"}
          </Button>
        </div>
      </Form>
    </MainModal>
  );
};

export default ModalRegistroPersonal;
