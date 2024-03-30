/* eslint-disable react/prop-types */
import {useState} from 'react';
import Tabla from '../../Tabla/Tabla';
import {RiArrowDropDownLine, RiArrowDropUpLine} from 'react-icons/ri';

const DetallesProyectos = ({proyecto}) => {
  const [verDocumentos, setVerDocumentos] = useState(false);
  const [verTareas, setVerTareas] = useState(false);
  const [verObservaciones, setVerObservaciones] = useState(false);
  const [verSoporteContable, setVerSoporteContable] = useState(false);

  const columnasDocumentos = [
    {Header: 'NOMBRE', accessor: 'nombre'},
    {Header: 'DESCRIPCION', accessor: 'descripcion'},
  ];

  const columnasTareas = [
    {Header: 'NOMBRE', accessor: 'nombre'},
    {Header: 'FECHA DE INICIO', accessor: 'fechaInicio'},
    {Header: 'FECHA DE VENCIMIENTO', accessor: 'fechaVencimiento'},
    {Header: 'ESTADO', accessor: 'estado'},
  ];

  const columnasObservaciones = [
    {Header: 'ITEM', accessor: 'item'},
    {Header: 'OBSERVACION', accessor: 'observacion'},
  ];

  const columnasSoporteContable = [
    {Header: 'NOMBRE', accessor: 'nombre'},
    {Header: 'DESCRIPCION', accessor: 'descripcion'},
    {Header: 'VALOR', accessor: 'valor'},
  ];

  const dataDocumentos = proyecto.documentos.map((project) => {
    return {
      nombre: project.nombre,
      descripcion: project.descripcion,
    };
  });

  const dataTareas = proyecto.tareas.map((tarea) => {
    return {
      nombre: tarea.nombre,
      fechaInicio: tarea.fechaInicio
        ? new Date(tarea.fechaInicio).toISOString().slice(0, 10)
        : '',
      fechaVencimiento: tarea.fechaVencimiento
        ? new Date(tarea.fechaVencimiento).toISOString().slice(0, 10)
        : '',
      estado: tarea.estado,
    };
  });

  const dataObservaciones = proyecto.observaciones.map((observacion, index) => {
    return {
      item: index + 1,
      observacion: observacion.observacion,
    };
  });

  return (
    <div className="items-center p-2 space-y-1 rounded-lg bg-secondary-fondo text-sm">
      <div className="border rounded-lg p-1 flex space-x-2">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold">Descripcion: </h1>
            <p className="bg-white border-2 border-secondary-button rounded-lg p-1">
              {proyecto.descripcion}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <h1 className="font-bold">Departamento: </h1>
              <p className="bg-white border-2 border-secondary-button rounded-lg p-1">
                {proyecto.departamento}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold">Ciudad: </h1>
              <p className="bg-white border-2 border-secondary-button rounded-lg p-1">
                {proyecto.ciudad}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h1 className="font-bold">Fecha Inicio: </h1>
            <p className="bg-white border-2 border-secondary-button rounded-lg p-1">
              {proyecto.fechaInicio}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <h1 className="font-bold">Fecha Final: </h1>
            <p className="bg-white border-2 border-secondary-button rounded-lg p-1">
              {proyecto.fechaFin}
            </p>
          </div>
        </div>
      </div>
      <div className="border rounded-lg p-2 space-y-2">
        <div className="flex items-center space-x-1">
          <button
            className="bg-secondary-button rounded-full"
            onClick={() => setVerDocumentos(!verDocumentos)}
          >
            {verDocumentos ? (
              <RiArrowDropDownLine size={24} />
            ) : (
              <RiArrowDropUpLine size={24} />
            )}
          </button>
          <h1
            className="uppercase font-bold text-white cursor-pointer"
            onClick={() => setVerDocumentos(!verDocumentos)}
          >
            Documentos
          </h1>
        </div>
        {verDocumentos && (
          <div className="border rounded-lg p-2 overflow-visible overflow-y-auto">
            <Tabla columns={columnasDocumentos} data={dataDocumentos} />
          </div>
        )}
      </div>
      <div className="border rounded-lg p-2 space-y-2">
        <div className="flex items-center space-x-1">
          <button
            className="bg-secondary-button rounded-full"
            onClick={() => setVerTareas(!verTareas)}
          >
            {verTareas ? (
              <RiArrowDropDownLine size={24} />
            ) : (
              <RiArrowDropUpLine size={24} />
            )}
          </button>
          <h1
            className="uppercase font-bold text-white cursor-pointer"
            onClick={() => setVerTareas(!verTareas)}
          >
            Tareas
          </h1>
        </div>
        {verTareas && (
          <div className="border rounded-lg p-2">
            <Tabla columns={columnasTareas} data={dataTareas} />
          </div>
        )}
      </div>
      <div className="border rounded-lg p-2 space-y-2">
        <div className="flex items-center space-x-1">
          <button
            className="bg-secondary-button rounded-full"
            onClick={() => setVerObservaciones(!verObservaciones)}
          >
            {verObservaciones ? (
              <RiArrowDropDownLine size={24} />
            ) : (
              <RiArrowDropUpLine size={24} />
            )}
          </button>
          <h1
            className="uppercase font-bold text-white cursor-pointer"
            onClick={() => setVerObservaciones(!verObservaciones)}
          >
            Observaciones
          </h1>
        </div>
        {verObservaciones && (
          <div className="border rounded-lg p-2">
            <Tabla columns={columnasObservaciones} data={dataObservaciones} />
          </div>
        )}
      </div>
      <div className="border rounded-lg p-2 space-y-2">
        <div className="flex items-center space-x-1">
          <button
            className="bg-secondary-button rounded-full"
            onClick={() => setVerSoporteContable(!verSoporteContable)}
          >
            {verSoporteContable ? (
              <RiArrowDropDownLine size={24} />
            ) : (
              <RiArrowDropUpLine size={24} />
            )}
          </button>
          <h1
            className="uppercase font-bold text-white cursor-pointer"
            onClick={() => setVerSoporteContable(!verSoporteContable)}
          >
            Soportes Contables
          </h1>
        </div>
        {verSoporteContable && (
          <div className="border rounded-lg p-2">
            <Tabla
              columns={columnasSoporteContable}
              data={proyecto.soporteContable}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetallesProyectos;
