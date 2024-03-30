/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useFormik} from 'formik';
import SelectPersonalizado from '../../DropDown/Dropdown';
import {useEffect, useState} from 'react';
import {
  filtrosDocumentos,
  getDocumentos,
} from '../../../redux/Actions/ActionsDocumentos/ActionsDocumentos';
import {ImPlay3} from 'react-icons/im';
import {useDispatch, useSelector} from 'react-redux';
import {FcClearFilters} from 'react-icons/fc';
import {setFiltrosSeleccionados} from '../../../redux/Slices/SlicesDocumentos/SlicesDocumentos';

const FiltrosDocumentos = ({opciones}) => {
  const [idProyecto, setIdProyecto] = useState('');
  const filtrosSeleccionados = useSelector(
    (state) => state.documentos.filtrosSeleccionados
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      idProyecto: idProyecto,
      fechaInicio: '',
      fechaFin: '',
    },
    onSubmit: (values) => {
      const valoresActualizados = {...values};

      filtrosSeleccionados.forEach((filtro) => {
        Object.entries(filtro).forEach(([key, value]) => {
          // Verificar si la clave existe en values y si el valor es diferente al del filtro
          if (
            valoresActualizados[key] !== '' &&
            valoresActualizados[key] !== value
          ) {
            // Asignar el valor de values al objeto actualizado
            valoresActualizados[key] = values[key];
          } else if (valoresActualizados[key] === '') {
            valoresActualizados[key] = value;
          }
        });
      });

      filtrosDocumentos(valoresActualizados, dispatch);
    },
  });

  const handleEliminarFiltros = () => {
    getDocumentos(dispatch);
    setIdProyecto('');
    dispatch(setFiltrosSeleccionados([]));
    formik.handleReset();
  };

  const opcionesDrop = [];

  opciones.map((proyecto) => {
    return opcionesDrop.push({
      _id: proyecto._id,
      nombre: proyecto.nombreProyecto,
    });
  });

  useEffect(() => {
    formik.setFieldValue('idProyecto', idProyecto);
    if (idProyecto !== '') {
      formik.handleSubmit();
    }
  }, [idProyecto]);

  return (
    <div className="items-center inline-block p-2 space-x-2 font-bold uppercase rounded-lg bg-secondary-fondo">
      <form
        className="flex items-center space-x-2"
        onSubmit={formik.handleSubmit}
      >
        <SelectPersonalizado
          encabezado={'Seleccione un Proyecto'}
          opciones={opcionesDrop}
          funcion={setIdProyecto}
          valor={idProyecto}
        />
        <div className="flex items-center p-2 space-x-1 border rounded-lg">
          <div>
            <label>desde:</label>
          </div>
          <div className="relative flex items-center">
            <input
              type="date"
              name="fechaInicio"
              id="fechaInicio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fechaInicio}
              className="p-2 rounded-lg outline-none bg-secondary-1000 focus:border focus:border-secondary-button "
            />
          </div>
          <div>
            <label>hasta:</label>
          </div>
          <div className="relative flex items-center">
            <input
              type="date"
              name="fechaFin"
              id="fechaFin"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fechaFin}
              className="p-2 rounded-lg outline-none bg-secondary-1000 focus:border focus:border-secondary-button "
            />
          </div>
          <button
            type="submit"
            className="p-2 rounded-lg bg-secondary-button"
            title="Filtrar fechas"
          >
            <ImPlay3 style={{color: 'white'}} />
          </button>
        </div>
        {filtrosSeleccionados.length > 0 ? (
          <button type="button" onClick={handleEliminarFiltros}>
            <FcClearFilters />
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default FiltrosDocumentos;
