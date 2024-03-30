/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {actualizarTareas} from '../../../../redux/Actions/ActionsTareas/ActionsTareas';
import {alertSuccess} from '../../../../helpers/Alertas';
import {useSelector} from 'react-redux';
import SelectPersonalizado from '../../../DropDown/Dropdown';
import {useEffect, useState} from 'react';

const ActualizarTareas = ({
  idActualizar,
  datosActualizar,
  setModalActualizarTarea,
}) => {
  const proyectos = useSelector((state) => state.proyectos.proyectos);
  const usuarios = useSelector((state) => state.usuarios.usuarios);
  const [idProyecto, setIdProyecto] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [habilitarObservacion, setHabilitarObservacion] = useState(false);

  const validationSchema = Yup.object({
    nombre: Yup.string(),
    descripcion: Yup.string(),
    estado: Yup.string(),
    fechaInicio: Yup.string(),
    fechaVencimiento: Yup.string(),
    observacion:
      habilitarObservacion &&
      Yup.string().required('Debe agregar una observacion'),
  });
  const formik = useFormik({
    initialValues: datosActualizar,
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      const conValores = {};
      for (const key in values) {
        if (values[key] !== '') {
          if (values[key] !== datosActualizar[key]) {
            conValores[key] = values[key];
          }
        }
      }

      actualizarTareas(idActualizar, conValores);

      resetForm();
      setModalActualizarTarea(false);
      alertSuccess('Tarea actualizado con Exito');
    },
  });

  const opcionesDropProyectos = [];
  const opcionesDropUsuarios = [];

  proyectos.map((proyecto) => {
    return opcionesDropProyectos.push({
      _id: proyecto._id,
      nombre: proyecto.nombreProyecto,
    });
  });

  usuarios.map((usuario) => {
    return opcionesDropUsuarios.push({
      _id: usuario._id,
      nombre: usuario.nombre,
    });
  });

  useEffect(() => {
    if (datosActualizar.idProyectos)
      setIdProyecto(datosActualizar.idProyectos._id);
    if (datosActualizar.idUsuario) setIdUsuario(datosActualizar.idUsuario._id);
  }, []);

  useEffect(() => {
    formik.setFieldValue('idProyectos', idProyecto);
    formik.setFieldValue('idUsuario', idUsuario);
  }, [idProyecto, idUsuario]);

  useEffect(() => {
    if (
      datosActualizar.estado !== formik.values.estado &&
      !habilitarObservacion
    )
      setHabilitarObservacion(!habilitarObservacion);
    if (datosActualizar.estado === formik.values.estado && habilitarObservacion)
      setHabilitarObservacion(!habilitarObservacion);
  }, [formik.values.estado]);

  return (
    <div className="items-center p-2 space-y-2 rounded-lg bg-secondary-fondo text-sm">
      <form className="space-y-3 " onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-3">
          <div className="flex space-x-2">
            <div className="relative">
              <div
                className={`text-xs bg-black border-2 rounded-lg p-1 text-white absolute -top-5 z-10 ${
                  formik.values.nombre ? 'visible' : 'hidden'
                }`}
              >
                Nombre de la tarea
              </div>
              <input
                type="text"
                name="nombre"
                id="nombre"
                className={`p-2 bg-secondary-1000  w-full outline-none rounded-lg focus:border focus:border-secondary-button text-colors 
              ${
                formik.touched.nombre && formik.errors.nombre
                  ? 'border-red-500'
                  : ''
              }`}
                placeholder="Nombre del Proyecto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
              <div
                className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                  formik.touched.nombre && formik.errors.nombre
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                {formik.errors.nombre}
              </div>
            </div>
            <div className="relative">
              <div
                className={`text-xs bg-black border-2 rounded-lg p-1 text-white absolute -top-5 z-10 ${
                  formik.values.estado || formik.values.estado === 0
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                Avance (%)
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  name="estado"
                  id="estado"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.estado}
                  max={100}
                  min={0}
                  className={`p-2 bg-secondary-1000 outline-none w-20 rounded-lg focus:border focus:border-secondary-button text-colors  inline-block
              ${
                formik.touched.estado && formik.errors.estado
                  ? 'border-red-500'
                  : ''
              }`}
                />
                <h1 className="absolute right-9">%</h1>
              </div>
              <div
                className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                  formik.touched.estado && formik.errors.estado
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                {formik.errors.estado}
              </div>
            </div>
            {habilitarObservacion && (
              <div className="relative">
                <div
                  className={`text-xs bg-black border-2 rounded-lg p-1 text-white absolute -top-5 z-10 ${
                    formik.values.observacion ? 'visible' : 'hidden'
                  }`}
                >
                  Observacion
                </div>
                <textarea
                  type="text"
                  name="observacion"
                  id="observacion"
                  className={`p-2 bg-secondary-1000  w-full outline-none rounded-lg focus:border focus:border-secondary-button text-colors 
              ${
                formik.touched.observacion && formik.errors.observacion
                  ? 'border-red-500'
                  : ''
              }`}
                  placeholder="Asignar Observacion"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.observacion}
                />
                <div
                  className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                    formik.touched.observacion && formik.errors.observacion
                      ? 'visible'
                      : 'hidden'
                  }`}
                >
                  {formik.errors.observacion}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <div
              className={`text-xs bg-black border-2 rounded-lg p-1 text-white absolute -top-5 z-10 ${
                formik.values.descripcion ? 'visible' : 'hidden'
              }`}
            >
              Descripcion
            </div>
            <textarea
              type="text"
              name="descripcion"
              id="descripcion"
              className={`p-2 bg-secondary-1000  w-full outline-none rounded-lg focus:border focus:border-secondary-button text-colors 
              ${
                formik.touched.descripcion && formik.errors.descripcion
                  ? 'border-red-500'
                  : ''
              }`}
              placeholder="Descripcion"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.descripcion}
            />
            <div
              className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                formik.touched.descripcion && formik.errors.descripcion
                  ? 'visible'
                  : 'hidden'
              }`}
            >
              {formik.errors.descripcion}
            </div>
          </div>
          <div className="flex items-center space-x-2 border p-2 rounded-lg">
            <div className="relative">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                form="grid-first-name"
              >
                Fecha Inicial
              </label>
              <input
                type="date"
                name="fechaInicio"
                id="fechaInicio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fechaInicio}
                className={`p-2 bg-secondary-1000  w-full outline-none rounded-lg focus:border focus:border-secondary-button text-colors 
                                 ${
                                   formik.touched.fechaInicio &&
                                   formik.errors.fechaInicio
                                     ? 'border-red-500'
                                     : ''
                                 }`}
              />
              <div
                className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                  formik.touched.fechaInicio && formik.errors.fechaInicio
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                {formik.errors.fechaInicio}
              </div>
            </div>
            <div className="relative">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                form="grid-first-name"
              >
                Fecha Final
              </label>

              <input
                type="date"
                name="fechaVencimiento"
                id="fechaVencimiento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fechaVencimiento}
                className={`p-2 bg-secondary-1000  w-full outline-none rounded-lg focus:border focus:border-secondary-button text-colors 
              ${
                formik.touched.fechaVencimiento &&
                formik.errors.fechaVencimiento
                  ? 'border-red-500'
                  : ''
              }`}
              />
              <div
                className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                  formik.touched.fechaVencimiento &&
                  formik.errors.fechaVencimiento
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                {formik.errors.fechaVencimiento}
              </div>
            </div>
            <div className="relative flex space-x-2">
              <SelectPersonalizado
                encabezado={`${
                  datosActualizar.idProyectos
                    ? datosActualizar.idProyectos.nombreProyecto
                    : 'Asigne un Proyecto'
                }`}
                opciones={opcionesDropProyectos}
                funcion={setIdProyecto}
              />
              <SelectPersonalizado
                encabezado={`${
                  datosActualizar.idUsuario
                    ? datosActualizar.idUsuario.nombre
                    : 'Asignar a un usuario'
                }`}
                opciones={opcionesDropUsuarios}
                funcion={setIdUsuario}
              />
            </div>
          </div>
        </div>
        <div className="border rounded-lg border-white p-2  ">
          <button
            type="submit"
            className="flex items-center justify-end gap-2 py-2 px-8 font-bold rounded-lg hover:bg-amber-400 transition-colors bg-secondary-buttonH "
          >
            Actualizar Proyecto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActualizarTareas;
