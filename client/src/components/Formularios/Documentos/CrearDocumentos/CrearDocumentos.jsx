/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import VisorPDF from '../../../VisorPDF/VisorPDF';
import { cargarDocumentos } from '../../../../redux/Actions/ActionsDocumentos/ActionsDocumentos';
import { alertSuccess } from '../../../../helpers/Alertas';
import { useEffect, useState } from 'react';
import SelectPersonalizado from '../../../DropDown/Dropdown';

const CrearDocumentos = ({ setModalCargarDoc }) => {
  const proyectos = useSelector((state) => state.proyectos.proyectos);
  const [idProyecto, setIdProyecto] = useState('');

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Nombre requerido'),
    descripcion: Yup.string().required('Debe dar una descripcion'),
    archivo: Yup.string().required('Debe cargar un archivo'),
    idProyecto: Yup.string().required('Debe seleccionar un proyecto'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      descripcion: '',
      archivo: null,
      idProyecto: idProyecto,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      cargarDocumentos(values);

      resetForm();
      setModalCargarDoc(false);
      alertSuccess('Documento creado con Exito');
    },
  });

  const handleDocumentoChange = (documento) => {
    formik.setFieldValue('archivo', documento);
  };

  const opcionesDrop = [];

  proyectos.map((proyecto) => {
    return opcionesDrop.push({
      _id: proyecto._id,
      nombre: proyecto.nombreProyecto,
    });
  });

  useEffect(() => {
    formik.setFieldValue('idProyecto', idProyecto);
  }, [idProyecto]);

  return (
    <div className="items-center p-2 space-y-2 text-sm rounded-lg  bg-secondary-fondo">
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
              className={`p-2 bg-secondary-1000 w-full uppercase outline-none rounded-lg focus:border focus:border-secondary-button text-colors ${formik.touched.nombre && formik.errors.nombre
                ? 'border-red-500'
                : ''
                }`}
              placeholder="nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
            />
            <div
              className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${formik.touched.nombre && formik.errors.nombre
                ? 'visible'
                : 'hidden'
                }`}
            >
              {formik.errors.nombre}
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              className={`p-2 bg-secondary-1000 w-full uppercase outline-none rounded-lg focus:border focus:border-secondary-button text-colors ${formik.touched.descripcion && formik.errors.descripcion
                ? 'border-red-500'
                : ''
                }`}
              placeholder="descripcion"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.descripcion}
            />
            <div
              className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${formik.touched.descripcion && formik.errors.descripcion
                ? 'visible'
                : 'hidden'
                }`}
            >
              {formik.errors.descripcion}
            </div>
          </div>
        </div>
        <div className="p-2 space-y-2">
          <div className="relative">
            <SelectPersonalizado
              encabezado={'Seleccione un Proyecto'}
              opciones={opcionesDrop}
              funcion={setIdProyecto}
            />
            <div
              className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${formik.touched.idProyecto && formik.errors.idProyecto
                ? 'visible'
                : 'hidden'
                }`}
            >
              {formik.errors.idProyecto}
            </div>
          </div>
          <button
            type="submit"
            className="p-2 font-bold uppercase transition-colors rounded-lg bg-secondary-button hover:text-gray-100"
          >
            Cargar Documento
          </button>
        </div>
      </form>
      <div className="p-2 border-2 rounded-lg">
        <VisorPDF onDocumentoChange={handleDocumentoChange} />
        <div
          className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${formik.touched.archivo && formik.errors.archivo
            ? 'visible'
            : 'hidden'
            }`}
        >
          {formik.errors.archivo}
        </div>
      </div>
    </div>
  );
};

export default CrearDocumentos;
