/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {actualizarProyectos} from '../../../../redux/Actions/ActionsProyectos/ActionsProyectos';
import {alertSuccess} from '../../../../helpers/Alertas';
import SeleccionarUbicacion from '../../../SeleccionarUbicacion/SeleccionarUbicacion';
import {useEffect, useState} from 'react';

const ActualizarProyectos = ({
  idActualizar,
  datosActualizar,
  setModalActualizarProyecto,
}) => {
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(
    datosActualizar.departamento
  );
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(
    datosActualizar.ciudad
  );
  const validationSchema = Yup.object({
    nombreProyecto: Yup.string('El nombre no debe estar vacío'),
    ubicacion: Yup.string('La ubicación no debe estar vacia'),
    descripcion: Yup.string('La descripción no debe estar vacia'),
    fechaInicio: Yup.date()
      .required('Debe ingresar una fecha de inicio')
      .test(
        'fechaInicio',
        'La fecha de inicio no puede ser mayor a la fecha final',
        function (value) {
          const fechaFin = this.parent.fechaFin;
          return (
            !fechaFin ||
            (value && fechaFin && new Date(value) <= new Date(fechaFin))
          );
        }
      ),
    fechaFin: Yup.date()
      .required('Debe ingresar una fecha de fin')
      .test(
        'fechaFin',
        'La fecha final no puede ser inferior a la fecha de inicio',
        function (value) {
          const fechaInicio = this.parent.fechaInicio;
          return (
            !fechaInicio ||
            (value && fechaInicio && new Date(value) >= new Date(fechaInicio))
          );
        }
      ),
  });

  const formik = useFormik({
    initialValues: datosActualizar,
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      const conValores = {};
      for (const key in values) {
        if (values[key] !== '') {
          conValores[key] = values[key];
        }
      }

      actualizarProyectos(idActualizar, conValores);

      resetForm();
      setModalActualizarProyecto(false);
      alertSuccess('Proyecto actualizado con Exito');
    },
  });

  useEffect(() => {
    formik.setFieldValue('departamento', departamentoSeleccionado);
    formik.setFieldValue('ciudad', ciudadSeleccionada);
  }, [departamentoSeleccionado, ciudadSeleccionada]);

  return (
    <div className="items-center p-2 space-y-2 rounded-lg bg-secondary-fondo text-sm">
      <form className="space-y-2 " onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <div className="relative">
              <div
                className={`text-xs bg-black border-2 rounded-lg p-1 text-white absolute -top-5 z-10 ${
                  formik.values.nombreProyecto ? 'visible' : 'hidden'
                }`}
              >
                Nombre del Proyecto
              </div>
              <input
                type="text"
                name="nombreProyecto"
                id="nombreProyecto"
                className={`p-2 bg-secondary-1000  w-full outline-none rounded-lg focus:border focus:border-secondary-button text-colors 
              ${
                formik.touched.nombreProyecto && formik.errors.nombreProyecto
                  ? 'border-red-500'
                  : ''
              }`}
                placeholder="Nombre del Proyecto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombreProyecto}
              />
              <div
                className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                  formik.touched.nombreProyecto && formik.errors.nombreProyecto
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                {formik.errors.nombreProyecto}
              </div>
            </div>
            <div className="relative">
              <SeleccionarUbicacion
                departamentoSeleccionado={departamentoSeleccionado}
                setDepartamentoSeleccionado={setDepartamentoSeleccionado}
                ciudadSeleccionada={ciudadSeleccionada}
                setCiudadSeleccionada={setCiudadSeleccionada}
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
                Fecha Final
              </label>

              <input
                type="date"
                name="fechaFin"
                id="fechaFin"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fechaFin}
                className={`p-2 bg-secondary-1000  w-full outline-none rounded-lg focus:border focus:border-secondary-button text-colors 
              ${
                formik.touched.fechaFin && formik.errors.fechaFin
                  ? 'border-red-500'
                  : ''
              }`}
              />
              <div
                className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                  formik.touched.fechaFin && formik.errors.fechaFin
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                {formik.errors.fechaFin}
              </div>
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

export default ActualizarProyectos;
