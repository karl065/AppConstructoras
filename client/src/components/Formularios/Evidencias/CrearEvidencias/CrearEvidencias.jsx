/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {cargarEvidencias} from '../../../../redux/Actions/ActionsEvidencias/ActionsEvidencias';
import {alertSuccess} from '../../../../helpers/Alertas';
import VisorImagen from '../../../VisorIMG/VisorIMG';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const CrearEvidencias = ({
  setModalCargaEvidencia,
  idTarea,
  idProyecto,
  nombre,
}) => {
  const opcion = idProyecto ? 'idProyecto' : 'idTarea';

  const validationMessages = {
    idProyecto: 'Seleccione un Proyecto',
    idTarea: 'Seleccione una Tarea',
  };

  const validationSchema = Yup.object({
    foto: Yup.string().required('Se requiere una imagen'),
    [opcion]: Yup.string().required(validationMessages[opcion]),
  });

  const proyectos = useSelector((state) => state.proyectos.proyectos);
  const tareas = useSelector((state) => state.tareas.tareas);

  const [opcionesDropProyectos, setOpcionesDropProyectos] = useState([]);
  const [opcionesDropTareas, setOpcionesDropTareas] = useState([]);

  const formik = useFormik({
    initialValues: {
      foto: '',
      [opcion]: opcion === 'idProyecto' ? idProyecto : idTarea,
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      cargarEvidencias(values);
      alertSuccess('Evidencia cargada con Exito');
      setModalCargaEvidencia(false);
      resetForm();
    },
  });

  const handleImageChange = (imagen) => {
    formik.setFieldValue('foto', imagen);
  };

  useEffect(() => {
    if (
      proyectos &&
      proyectos.length > 0 &&
      opcionesDropProyectos.length === 0
    ) {
      const opcionesDrop = proyectos.map((proyecto) => ({
        _id: proyecto._id,
        nombre: proyecto.nombreProyecto,
      }));
      setOpcionesDropProyectos(opcionesDrop);
    }
    if (tareas && tareas.length > 0 && opcionesDropTareas.length === 0) {
      const opcionesDrop = tareas.map((tarea) => ({
        _id: tarea._id,
        nombre: tarea.nombre,
      }));
      setOpcionesDropTareas(opcionesDrop);
    }
  }, [proyectos, tareas]);

  return (
    <div className="items-center p-2 space-y-2 rounded-lg bg-secondary-fondo text-sm">
      <h1 className="font-bold uppercase border p-2 rounded-lg text-center">
        {nombre}
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="space-y-2">
            <div className="relative">
              <VisorImagen onImageChange={handleImageChange} />
              <div
                className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                  formik.touched.foto && formik.errors.foto
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                {formik.errors.foto}
              </div>
            </div>
            <div className="relative">
              <div
                className={`text-xs bg-black border-2 rounded-lg p-2 text-red-500 absolute top-full z-10 ${
                  formik.touched[opcion] && formik.errors[opcion]
                    ? 'visible'
                    : 'hidden'
                }`}
              >
                {formik.errors[opcion]}
              </div>
            </div>
            <button
              type="submit"
              className="p-2 font-bold  transition-colors rounded-lg bg-secondary-button hover:text-gray-100"
            >
              Guardar Evidencia
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CrearEvidencias;
