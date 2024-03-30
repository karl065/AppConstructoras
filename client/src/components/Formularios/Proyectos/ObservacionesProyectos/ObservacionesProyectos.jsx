/* eslint-disable react/prop-types */
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {alertSuccess} from '../../../../helpers/Alertas';
import {observacionesProyectos} from '../../../../redux/Actions/ActionsProyectos/ActionsProyectos';

const ObservacionesProyectos = ({
  idActualizar,
  setModalObservacion,
  nombreProyecto,
}) => {
  const validationSchema = Yup.object({
    observacion: Yup.string().required('La observacion no debe estar vacia'),
  });

  const formik = useFormik({
    initialValues: {
      idProyectos: idActualizar,
      observacion: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      observacionesProyectos(values);
      resetForm();
      setModalObservacion(false);
      alertSuccess('Observacion creada');
    },
  });
  return (
    <div className="items-center p-2 space-y-2 rounded-lg bg-secondary-fondo text-sm">
      <form className="space-y-2 " onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-2">
          <div className="uppercase font-bold border p-2 rounded-lg">
            <label>{nombreProyecto}</label>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <div
                className={`text-xs bg-black border-2 rounded-lg p-1 text-white absolute -top-5 z-10 ${
                  formik.values.observacion ? 'visible' : 'hidden'
                }`}
              >
                Observación
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
                placeholder="Observación"
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
          </div>
        </div>
        <div className="border rounded-lg border-white p-2  ">
          <button
            type="submit"
            className="flex items-center justify-end gap-2 py-2 px-8 font-bold rounded-lg hover:bg-amber-400 transition-colors bg-secondary-buttonH "
          >
            Agregar Observación
          </button>
        </div>
      </form>
    </div>
  );
};

export default ObservacionesProyectos;
