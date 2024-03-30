/* eslint-disable react/prop-types */
import {useState, useEffect} from 'react';
import axios from 'axios';
import SelectPersonalizado from '../DropDown/Dropdown';

const SeleccionarUbicacion = ({
  departamentoSeleccionado,
  setDepartamentoSeleccionado,
  ciudadSeleccionada,
  setCiudadSeleccionada,
}) => {
  const [departamentos, setDepartamentos] = useState([]);

  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    const obtenerDepartamentos = async () => {
      try {
        // Consulta para obtener los departamentos de Colombia

        const {data} = await axios.get(
          `https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento&$group=departamento`
        );

        const departamentosObtenidos = data.map((item) => item.departamento);

        setDepartamentos(departamentosObtenidos);
      } catch (error) {
        console.error('Error al obtener datos de los departamentos:', error);
      }
    };

    obtenerDepartamentos();
  }, []);

  useEffect(() => {
    const obtenerCiudades = async () => {
      try {
        // Consulta para obtener las ciudades del departamento seleccionado
        const {data} = await axios.get(
          `https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=municipio&departamento=${encodeURIComponent(
            departamentoSeleccionado
          )}&$group=municipio`
        );
        const ciudadesObtenidas = data.map((item) => item.municipio);
        setCiudades(ciudadesObtenidas);
      } catch (error) {
        console.error('Error al obtener las ciudades:', error);
      }
    };

    if (departamentoSeleccionado) {
      obtenerCiudades();
    } else {
      setCiudades([]);
    }
  }, [departamentoSeleccionado]);

  const opcionesDepartamentos = [];

  departamentos.map((dep) => {
    return opcionesDepartamentos.push({
      _id: dep,
      nombre: dep,
    });
  });

  const opcionesCiudades = [];

  ciudades.map((ciudad) => {
    return opcionesCiudades.push({
      _id: ciudad,
      nombre: ciudad,
    });
  });

  return (
    <div className="space-x-2 flex justify-center items-center">
      <SelectPersonalizado
        encabezado={`${
          departamentoSeleccionado
            ? departamentoSeleccionado
            : 'Seleccione un departamento'
        }`}
        opciones={opcionesDepartamentos}
        funcion={setDepartamentoSeleccionado}
        valor={departamentoSeleccionado}
      />
      {opcionesCiudades.length > 0 && (
        <SelectPersonalizado
          encabezado={`${
            ciudadSeleccionada ? ciudadSeleccionada : 'Seleccione una ciudad'
          }`}
          opciones={opcionesCiudades}
          funcion={setCiudadSeleccionada}
          valor={ciudadSeleccionada}
        />
      )}
    </div>
  );
};

export default SeleccionarUbicacion;
