/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {cargarTareas} from '../../../../redux/Actions/ActionsTareas/ActionsTareas';
import {alertSuccess} from '../../../../helpers/Alertas';
import SelectPersonalizado from '../../../DropDown/Dropdown';
import {useEffect, useState} from 'react';

const CrearTareas = ({setModalCargarTareas}) => {
  const proyectos = useSelector((state) => state.proyectos.proyectos);
  const usuarios = useSelector((state) => state.usuarios.usuarios);

  const [idProyecto, setIdProyecto] = useState('');
  const [idUsuario, setIdUsuario] = useState('');

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Nombre de tarea requerido'),
    descripcion: Yup.string().required('Debe ingresar una descripcion'),
    fechaInicio: Yup.string().required('Debe ingresar una fecha de inicio'),
    fechaVencimiento: Yup.string().required(
      'Debe ingresar una fecha de vencimiento'
    ),
    idProyectos: Yup.string().required('Debe seleccionar un proyecto'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      fechaVencimiento: '',
      idProyectos: idProyecto,
      idUsuario: idUsuario,
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      cargarTareas(values);

      resetForm();
      setModalCargarTareas(false);
      alertSuccess('Tarea creado con Exito');
    },
  });
  const opcionesDrop = [];
  const opcionesDropUsuarios = [];

  proyectos.map((proyecto) => {
    return opcionesDrop.push({
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
    formik.setFieldValue('idProyectos', idProyecto);
    formik.setFieldValue('idUsuario', idUsuario);
  }, [idProyecto, idUsuario]);

  return (
    <div className="items-center p-2 space-y-2 rounded-lg bg-secondary-fondo text-sm">
      <form className="space-y-2 " onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <div className="relative">
              <div
                className={`text-xs bg-black border-2 rounded-lg p-1 text-white absolute -top-5 z-10 ${
                  formik.values.nombre ? 'visible' : 'hidden'
                }`}
              >
                Nombre Tarea
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
                placeholder="Nombre Tarea"
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
            <div className="relative flex space-x-2">
              <SelectPersonalizado
                encabezado={'Asignar a un Proyecto'}
                opciones={opcionesDrop}
                funcion={setIdProyecto}
              />
              <SelectPersonalizado
                encabezado={'Asignar a un Usuario'}
                opciones={opcionesDropUsuarios}
                funcion={setIdUsuario}
              />
              <div
                className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                  formik.touched.departamento && formik.errors.departamento
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                {formik.errors.departamento}
              </div>
              <div
                className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                  formik.touched.ciudad && formik.errors.ciudad
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                {formik.errors.ciudad}
              </div>
            </div>
          </div>
          <div className="relative">
            <div
              className={`text-xs bg-black border-2 rounded-lg p-1 text-white absolute -top-5 z-10 ${
                formik.values.descripcion ? 'visible' : 'hidden'
              }`}
            >
              Descripcion
            </div>
            <input
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
          <div className="flex space-x-2 border p-2 rounded-lg">
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
                Fecha Vencimiento
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
          </div>
        </div>
        <div className="border rounded-lg border-white p-2  ">
          <button
            type="submit"
            className="flex items-center justify-end gap-2 py-2 px-8 font-bold rounded-lg hover:bg-amber-400 transition-colors bg-secondary-buttonH "
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
export default CrearTareas;
