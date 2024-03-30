/* eslint-disable react/prop-types */
// import {useState} from 'react';
import {Switch} from '@headlessui/react';
import {actualizarUsuarios} from '../../../redux/Actions/ActionsUsuarios/ActionsUsuarios';
import Tabla from '../../Tabla/Tabla';

const DetallesUsuarios = ({usuario}) => {
  const toggleConectado = () => {
    actualizarUsuarios(usuario._id, {estado: !usuario.estado});
  };

  const toggleHabilitado = () => {
    actualizarUsuarios(usuario._id, {habilitado: !usuario.habilitado});
  };

  const columnasTareas = [
    {Header: 'NOMBRE', accessor: 'nombre'},
    {Header: 'DESCRIPCION', accessor: 'descripcion'},
    {Header: 'FECHA INICIO', accessor: 'fechaInicio'},
    {Header: 'FECHA VENCIMIENTO', accessor: 'fechaVencimiento'},
    {
      Header: 'AVANCE (%)',
      accessor: 'estado',
      Cell: ({value}) => (
        <div
          className={`${value <= 30 ? 'bg-red-700' : 'bg-secondary-buttonH'}`}
        >
          <div
            className={`h-6 bg-green-400 transition-all duration-300 ease-in-out`}
            style={{width: value}}
          >
            {value}%
          </div>
        </div>
      ),
    },
  ];

  const columnasProyectos = [
    {Header: 'PROYECTO', accessor: 'nombreProyecto'},
    {Header: 'UBICACION', accessor: 'ubicacion'},
    {Header: 'FECHA INICIO', accessor: 'fechaInicio'},
    {Header: 'FECHA FINAL', accessor: 'fechaFin'},
  ];

  const dataTareas = Array.isArray(usuario.tareas)
    ? usuario.tareas.map((item) => ({
        ...item,
        fechaInicio: item.fechaInicio
          ? new Date(item.fechaInicio).toISOString().slice(0, 10)
          : '',
        fechaVencimiento: item.fechaVencimiento
          ? new Date(item.fechaVencimiento).toISOString().slice(0, 10)
          : '',
      }))
    : [];

  const dataProyectos = Array.isArray(usuario.proyectos)
    ? usuario.proyectos.map((item) => ({
        ...item,
        fechaInicio: item.fechaInicio
          ? new Date(item.fechaInicio).toISOString().slice(0, 10)
          : '',
        fechaFin: item.fechaFin
          ? new Date(item.fechaFin).toISOString().slice(0, 10)
          : '',
      }))
    : [];

  return (
    <div className="flex flex-col items-center p-2 space-y-2 text-sm rounded-lg bg-secondary-fondo">
      <div className="flex space-x-2">
        <div className="border p-2 rounded-lg items-center flex">
          <img
            src={usuario.foto}
            alt={usuario.nombre}
            className="w-[100px] h-[100px] border rounded-full"
          />
        </div>
        <div className="border uppercase font-bold p-2 space-y-1 rounded-lg">
          <div className="flex space-x-2">
            <h1>Nombre:</h1>
            <h1>{usuario.nombre}</h1>
          </div>
          <div className="flex space-x-2">
            <h1>email:</h1>
            <h1>{usuario.email}</h1>
          </div>
          <div className="flex space-x-2">
            <h1>telefono:</h1>
            <h1>{usuario.telefono}</h1>
          </div>
          <div className="flex space-x-2">
            <h1>rol:</h1>
            <h1>{usuario.rol}</h1>
          </div>
          <div className="flex space-x-2 items-center">
            <h1>Conectado:</h1>
            <Switch
              checked={usuario.estado}
              onChange={toggleConectado}
              className={`${
                usuario.estado ? 'bg-green-600' : 'bg-red-600'
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Conectado</span>
              <span
                className={`${
                  usuario.estado ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>
          <div className="flex space-x-2 items-center">
            <h1>Habilitado:</h1>
            <Switch
              checked={usuario.habilitado}
              onChange={toggleHabilitado}
              className={`${
                usuario.habilitado ? 'bg-green-600' : 'bg-red-600'
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Habilitado</span>
              <span
                className={`${
                  usuario.habilitado ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>
        </div>
      </div>
      <div className="border rounded-lg p-2 w-full space-y-1">
        <h1 className="uppercase font-bold bg-secondary-1000 inline-block p-2 text-white rounded-lg">
          proyectos asignados
        </h1>
        <div className="border p-2 rounded-lg">
          {usuario.proyectos.length > 0 ? (
            <Tabla columns={columnasProyectos} data={dataProyectos} />
          ) : (
            <div>
              <h1 className="uppercase font-bold bg-secondary-1000 inline-block p-2 text-white rounded-lg">
                No se han asignado proyectos
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className="border rounded-lg p-2 w-full space-y-1">
        <h1 className="uppercase font-bold bg-secondary-1000 inline-block p-2 text-white rounded-lg">
          tareas asignadas
        </h1>
        <div className="border p-2 rounded-lg">
          {usuario.tareas.length > 0 ? (
            <Tabla columns={columnasTareas} data={dataTareas} />
          ) : (
            <div>
              <h1 className="uppercase font-bold bg-secondary-1000 inline-block p-2 text-white rounded-lg">
                No se han asignado tareas
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetallesUsuarios;
