/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useFormik} from 'formik';
import SelectPersonalizado from '../../DropDown/Dropdown';
import {useEffect, useState} from 'react';
import {
  filtrosProyectos,
  getProyectos,
} from '../../../redux/Actions/ActionsProyectos/ActionsProyectos';
import {ImPlay3} from 'react-icons/im';
import {useDispatch, useSelector} from 'react-redux';
import {FcClearFilters} from 'react-icons/fc';
import {setFiltrosSeleccionados} from '../../../redux/Slices/SlicesProyectos/SliceProyectos';
import {RiArrowDropDownLine, RiArrowDropUpLine} from 'react-icons/ri';
import SeleccionarUbicacion from '../../SeleccionarUbicacion/SeleccionarUbicacion';

const FiltrosProyectos = ({opciones}) => {
  const [idProyecto, setIdProyecto] = useState('');
  const filtrosSeleccionados = useSelector(
    (state) => state.proyectos.filtrosSeleccionados
  );
  const [opcionesDrop, setOpcionesDrop] = useState([]);
  const [verFechaInicio, setVerFechaInicio] = useState(false);
  const [verFechaFinal, setVerFechaFinal] = useState(false);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id: idProyecto,
      fechaInicioRangoIni: '',
      fechaInicioRangoFin: '',
      fechaFinRangoIni: '',
      fechaFinRangoFin: '',
      departamento: departamentoSeleccionado,
      ciudad: ciudadSeleccionada,
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

      filtrosProyectos(valoresActualizados, dispatch);
    },
  });

  const handleEliminarFiltros = () => {
    getProyectos(dispatch);
    setIdProyecto('');
    setCiudadSeleccionada('');
    setDepartamentoSeleccionado('');
    dispatch(setFiltrosSeleccionados([]));
    formik.handleReset();
  };

  useEffect(() => {
    if (opciones && opciones.length > 0 && opcionesDrop.length === 0) {
      const opcionesDrop = opciones.map((proyecto) => ({
        _id: proyecto._id,
        nombre: proyecto.nombreProyecto,
      }));
      setOpcionesDrop(opcionesDrop);
    }
  }, [opciones]);

  useEffect(() => {
    formik.setFieldValue('id', idProyecto);
    formik.setFieldValue('departamento', departamentoSeleccionado);
    formik.setFieldValue('ciudad', ciudadSeleccionada);
    if (idProyecto !== '') {
      formik.handleSubmit();
    }
    if (departamentoSeleccionado !== '') {
      formik.handleSubmit();
    }
    if (ciudadSeleccionada !== '') {
      formik.handleSubmit();
    }
  }, [idProyecto, departamentoSeleccionado, ciudadSeleccionada]);

  return (
    <div className="items-center inline-block p-2 space-x-2 font-bold  border  rounded-lg bg-secondary-fondo">
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
        <div className="flex-col items-center p-2 space-y-1 border rounded-lg">
          <div className="flex items-center space-x-1">
            <button
              type="button"
              className="bg-secondary-button rounded-full"
              onClick={() => setVerFechaInicio(!verFechaInicio)}
            >
              {verFechaInicio ? (
                <RiArrowDropDownLine size={24} />
              ) : (
                <RiArrowDropUpLine size={24} />
              )}
            </button>
            {!verFechaInicio && (
              <h1
                className="uppercase font-bold text-white cursor-pointer"
                onClick={() => setVerFechaInicio(!verFechaInicio)}
              >
                Fecha Inicio
              </h1>
            )}
            {verFechaInicio && (
              <div className="flex items-center space-x-1">
                <div>
                  <label>Desde:</label>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    name="fechaInicioRangoIni"
                    id="fechaInicioRangoIni"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fechaInicioRangoIni}
                    className="p-2 rounded-lg outline-none bg-secondary-1000 focus:border focus:border-secondary-button "
                  />
                </div>
                <div>
                  <label>Hasta:</label>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    name="fechaInicioRangoFin"
                    id="fechaInicioRangoFin"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fechaInicioRangoFin}
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
            )}
          </div>
          <div className="flex items-center space-x-1">
            <button
              className="bg-secondary-button rounded-full"
              onClick={() => setVerFechaFinal(!verFechaFinal)}
              type="button"
            >
              {verFechaFinal ? (
                <RiArrowDropDownLine size={24} />
              ) : (
                <RiArrowDropUpLine size={24} />
              )}
            </button>
            {!verFechaFinal && (
              <h1
                className="uppercase font-bold text-white cursor-pointer"
                onClick={() => setVerFechaFinal(!verFechaFinal)}
              >
                Fecha Final
              </h1>
            )}
            {verFechaFinal && (
              <div className="flex items-center space-x-1">
                <div>
                  <label>Desde:</label>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    name="fechaFinRangoIni"
                    id="fechaFinRangoIni"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fechaFinRangoIni}
                    className="p-2 rounded-lg outline-none bg-secondary-1000 focus:border focus:border-secondary-button "
                  />
                </div>
                <div>
                  <label>Hasta:</label>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    name="fechaFinRangoFin"
                    id="fechaFinRangoFin"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fechaFinRangoFin}
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
            )}
          </div>
        </div>
        <div>
          <SeleccionarUbicacion
            departamentoSeleccionado={departamentoSeleccionado}
            setDepartamentoSeleccionado={setDepartamentoSeleccionado}
            ciudadSeleccionada={ciudadSeleccionada}
            setCiudadSeleccionada={setCiudadSeleccionada}
          />
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

export default FiltrosProyectos;
