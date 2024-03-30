/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useFormik} from 'formik';
import SelectPersonalizado from '../../DropDown/Dropdown';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FcClearFilters} from 'react-icons/fc';
import {
  filtrosUsuarios,
  getUsuarios,
} from '../../../redux/Actions/ActionsUsuarios/ActionsUsuarios';
import {setFiltrosUsuariosSeleccionados} from '../../../redux/Slices/SlicesUsuarios/SliceUsuarios';

const FiltrosUsuarios = () => {
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [logeadoSeleccionado, setLogeadoSeleccionado] = useState('');
  const [habilitadoSeleccionado, setHabilitadoSeleccionado] = useState('');
  const roles = useSelector((state) => state.usuarios.roles);
  const filtrosUsuariosSeleccionados = useSelector(
    (state) => state.usuarios.filtrosUsuariosSeleccionados
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      rol: rolSeleccionado,
      estado: logeadoSeleccionado,
      habilitado: habilitadoSeleccionado,
    },
    onSubmit: (values) => {
      const valoresActualizados = {...values};

      filtrosUsuariosSeleccionados.forEach((filtro) => {
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

      filtrosUsuarios(valoresActualizados, dispatch);
    },
  });

  const handleEliminarFiltros = () => {
    getUsuarios(dispatch);
    setRolSeleccionado('');
    setLogeadoSeleccionado('');
    setHabilitadoSeleccionado('');
    dispatch(setFiltrosUsuariosSeleccionados([]));
    formik.handleReset();
  };

  const selectLogeado = [
    {nombre: 'conectados', _id: true},
    {nombre: 'desconectados', _id: false},
  ];

  const selectHabilitado = [
    {nombre: 'habilitados', _id: true},
    {nombre: 'deshabilitados', _id: false},
  ];

  const opcionesDrop = [];

  roles.map((rol) => {
    return opcionesDrop.push({
      _id: rol,
      nombre: rol,
    });
  });

  useEffect(() => {
    formik.setFieldValue('rol', rolSeleccionado);
    if (rolSeleccionado !== '') {
      formik.handleSubmit();
    }
  }, [rolSeleccionado]);

  useEffect(() => {
    formik.setFieldValue('estado', logeadoSeleccionado);
    if (logeadoSeleccionado !== '') {
      formik.handleSubmit();
    }
  }, [logeadoSeleccionado]);

  useEffect(() => {
    formik.setFieldValue('habilitado', habilitadoSeleccionado);
    if (habilitadoSeleccionado !== '') {
      formik.handleSubmit();
    }
  }, [habilitadoSeleccionado]);

  return (
    <div className="items-center inline-block p-2 space-x-2 font-bold uppercase rounded-lg bg-secondary-fondo">
      <form
        className="flex items-center space-x-2"
        onSubmit={formik.handleSubmit}
      >
        <SelectPersonalizado
          encabezado={'Seleccione un rol'}
          opciones={opcionesDrop}
          funcion={setRolSeleccionado}
          valor={rolSeleccionado}
        />
        <SelectPersonalizado
          encabezado={'filtrar por estado'}
          opciones={selectLogeado}
          funcion={setLogeadoSeleccionado}
          valor={logeadoSeleccionado}
        />
        <SelectPersonalizado
          encabezado={'filtrar por habilitados'}
          opciones={selectHabilitado}
          funcion={setHabilitadoSeleccionado}
          valor={habilitadoSeleccionado}
        />
        {filtrosUsuariosSeleccionados.length > 0 ? (
          <button type="button" onClick={handleEliminarFiltros}>
            <FcClearFilters />
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default FiltrosUsuarios;
