/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {actualizarDocumentos} from '../../../../redux/Actions/ActionsDocumentos/ActionsDocumentos';
import {alertSuccess} from '../../../../helpers/Alertas';

const ActualizarDocumentos = ({
  idActualizar,
  datosActualizar,
  setModalActualizarDoc,
}) => {
  const proyectos = useSelector((state) => state.proyectos.proyectos);

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Nombre requerido'),
    descripcion: Yup.string().required('Debe dar una descripcion'),
  });

  const formik = useFormik({
    initialValues: datosActualizar,
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      actualizarDocumentos(idActualizar, values);

      resetForm();
      setModalActualizarDoc(false);
      alertSuccess('Documento actualizado con Exito');
    },
  });

  const opcionesDrop = [];

  proyectos.map((proyecto) => {
    return opcionesDrop.push({
      _id: proyecto._id,
      nombre: proyecto.nombreProyecto,
    });
  });

  return (
    <div className="items-center p-2 space-y-2 text-sm rounded-lg bg-secondary-fondo">
      <form
        className="flex items-center justify-center p-2 space-x-2 border-2 rounded-lg "
        onSubmit={formik.handleSubmit}
      >
        <div className="flex-1 p-2 space-y-2">
          <div className="relative">
            <input
              type="text"
              name="nombre"
              id="nombre"
              className={`p-2 bg-secondary-1000 w-full uppercase outline-none rounded-lg focus:border focus:border-secondary-button text-colors ${
                formik.touched.nombre && formik.errors.nombre
                  ? 'border-red-500'
                  : ''
              }`}
              placeholder="nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
            />
            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="text-xs text-red-500">{formik.errors.nombre}</div>
            ) : null}
          </div>
          <div className="relative">
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              className={`p-2 bg-secondary-1000 w-full uppercase outline-none rounded-lg focus:border focus:border-secondary-button text-colors ${
                formik.touched.descripcion && formik.errors.descripcion
                  ? 'border-red-500'
                  : ''
              }`}
              placeholder="descripcion"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.descripcion}
            />
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div className="text-xs text-red-500">
                {formik.errors.descripcion}
              </div>
            ) : null}
          </div>
        </div>
        <div className="p-2 space-y-2">
          <button
            type="submit"
            className="p-2 font-bold uppercase transition-colors rounded-lg bg-secondary-button hover:text-gray-100"
          >
            Actualizar Documento
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActualizarDocumentos;
