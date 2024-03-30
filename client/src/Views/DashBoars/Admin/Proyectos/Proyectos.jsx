/* eslint-disable react/prop-types */
import {useSelector} from 'react-redux';
import Modal from 'react-modal';
import Tabla from '../../../../components/Tabla/Tabla';
import {FaEye, FaPenToSquare} from 'react-icons/fa6';
import {
  RiDeleteBin6Line,
  RiPresentationFill,
  RiChatNewLine,
} from 'react-icons/ri';

import FiltrosProyectos from '../../../../components/Filtros/FiltrosProyectos/FiltrosProyectos';
import {useState} from 'react';
import {eliminarProyectos} from '../../../../redux/Actions/ActionsProyectos/ActionsProyectos';
import CrearProyectos from '../../../../components/Formularios/Proyectos/CrearProyectos/CrearProyectos';
import ActualizarProyectos from '../../../../components/Formularios/Proyectos/ActualizarProyectos/ActualizarProyectos';
import ObservacionesProyectos from '../../../../components/Formularios/Proyectos/ObservacionesProyectos/ObservacionesProyectos';
import DetallesProyectos from '../../../../components/Detalles/DetallesProyectos/DetallesProyectos';

const Proyectos = () => {
  const proyectos = useSelector((state) => state.proyectos.proyectos);

  const [modalDetalle, setModalDetalle] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [modalCargarProyectos, setModalCargarProyectos] = useState(false);
  const [modalActualizarProyecto, setModalActualizarProyecto] = useState(false);
  const [modalObservacion, setModalObservacion] = useState(false);
  const [idActualizar, setIdActualizar] = useState('');
  const [datosActualizar, setDatosActualizar] = useState('');

  const handleIconButton = (proyecto) => {
    setTituloModal(proyecto.nombreProyecto);
    setDatosActualizar(proyecto);
    setModalDetalle(true);
  };

  const handleCloseModalDetalle = () => {
    setModalDetalle(false);
  };
  const handleCloseModalProyectos = () => {
    setModalCargarProyectos(false);
  };

  const handleCloseModalObservaciones = () => {
    setModalObservacion(false);
  };

  const handleObservaciones = (idProyecto, nombre) => {
    setIdActualizar(idProyecto);
    setDatosActualizar(nombre);
    setModalObservacion(true);
  };

  const handleCargarProyectos = () => {
    setModalCargarProyectos(true);
  };
  const handleCloseModalActualizarProyecto = () => {
    setModalActualizarProyecto(false);
  };

  const handleActualizarProyecto = (id, datos) => {
    setIdActualizar(id);
    setDatosActualizar(datos);
    setModalActualizarProyecto(true);
  };

  const handleEliminarProyecto = (id) => {
    eliminarProyectos(id);
  };

  const columnasProyectos = [
    {Header: 'PROYECTO', accessor: 'nombreProyecto'},
    {Header: 'DEPARTAMENTO', accessor: 'departamento'},
    {Header: 'CIUDAD', accessor: 'ciudad'},
    {Header: 'FECHA INICIO', accessor: 'fechaInicio'},
    {Header: 'FECHA FINAL', accessor: 'fechaFin'},
    {
      Header: 'AVANCE',
      accessor: 'avance',
      Cell: ({value}) => (
        <div
          className={`rounded-lg h-6 ${
            value <= 30
              ? 'bg-red-700'
              : value === 100
              ? 'bg-green-400'
              : 'bg-secondary-buttonH'
          }`}
        >
          <div
            className={`h-6 rounded-lg flex font-bold items-center bg-green-400 transition-all duration-300 ease-in-out`}
            style={{width: value}}
          >
            {value}%
          </div>
        </div>
      ),
    },
    {
      Header: 'ACCIONES',
      accessor: 'icon',
      Cell: ({row}) => (
        <div className=" flex justify-center gap-2">
          <button
            onClick={() => handleIconButton(row.original)}
            className="p-1 bg-blue-600 rounded-full hover:bg-blue-800"
            title="Ver Detalle del Proyecto"
          >
            <FaEye style={{color: 'white'}} />
          </button>

          <button
            onClick={() =>
              handleActualizarProyecto(row.original._id, {
                nombreProyecto: row.original.nombreProyecto,
                departamento: row.original.departamento,
                ciudad: row.original.ciudad,
                descripcion: row.original.descripcion,
                fechaInicio: row.original.fechaInicio,
                fechaFin: row.original.fechaFin,
              })
            }
            title="Actualizar Proyecto"
            className="p-1 rounded-full bg-secondary-button hover:bg-secondary-buttonH"
          >
            <FaPenToSquare style={{color: 'white'}} />
          </button>
          <button
            className="p-1 rounded-full bg-green-600 hover:bg-green-800"
            onClick={() =>
              handleObservaciones(row.original._id, row.original.nombreProyecto)
            }
            title="Agregar Observacion"
          >
            <RiChatNewLine style={{color: 'white'}} />
          </button>
          <button
            onClick={() => handleEliminarProyecto(row.original._id)}
            title="Eliminar Proyecto"
            className="bg-red-600 hover:bg-red-800 p-1 rounded-full"
          >
            <RiDeleteBin6Line style={{color: 'white'}} />
          </button>
        </div>
      ),
    },
  ];

  const calcularAvance = (tareas) => {
    const totalTareas = tareas.length;
    const tareasCompletadas = tareas.filter(
      (tarea) => tarea.estado === 100
    ).length;
    const porcentajeAvance =
      totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0;

    return Math.round(porcentajeAvance);
  };

  const data = Array.isArray(proyectos)
    ? proyectos.map((item) => ({
        ...item,
        nombreProyecto: item.nombreProyecto,
        ubicacion: item.ubicacion,
        fechaInicio: item.fechaInicio
          ? new Date(item.fechaInicio).toISOString().slice(0, 10)
          : '',
        fechaFin: item.fechaFin
          ? new Date(item.fechaFin).toISOString().slice(0, 10)
          : '',
        avance: calcularAvance(item.tareas),
        icon: 'icono',
      }))
    : [];

  return (
    <div className="text-sm w-full h-full p-2">
      <div className="items-center p-2 space-y-2 rounded-lg bg-secondary-fondo">
        <div className="flex items-center p-2 space-x-2 border rounded-lg">
          <button
            onClick={handleCargarProyectos}
            className="flex items-center font-bold gap-4 py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors bg-secondary-buttonH "
          >
            Crear Proyecto <RiPresentationFill />
          </button>
          <label className="font-bold">Filtros : </label>
          <FiltrosProyectos opciones={proyectos} />
        </div>
        <div className="container p-2 mx-auto uppercase border rounded-lg">
          <Tabla columns={columnasProyectos} data={data} />
          <Modal
            ariaHideApp={false}
            isOpen={modalDetalle}
            onRequestClose={handleCloseModalDetalle}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="bg-white rounded-lg p-4 w-[600px]"
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white uppercase">{tituloModal}</h1>
              <button
                onClick={handleCloseModalDetalle}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <DetallesProyectos proyecto={datosActualizar} />
          </Modal>
          <Modal
            ariaHideApp={false}
            isOpen={modalCargarProyectos}
            onRequestClose={handleCloseModalProyectos}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 space-y-2 bg-white rounded-lg  w-[600px] "
            style={{overlay: {overflowY: 'scroll'}}}
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white">Crear Proyecto</h1>
              <button
                onClick={handleCloseModalProyectos}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <CrearProyectos setModalCargarProyectos={setModalCargarProyectos} />
          </Modal>
          <Modal
            ariaHideApp={false}
            isOpen={modalActualizarProyecto}
            onRequestClose={handleCloseModalActualizarProyecto}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 space-y-2 bg-white rounded-lg"
            style={{overlay: {overflowY: 'scroll'}}}
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white">Actualizar Proyecto</h1>
              <button
                onClick={handleCloseModalActualizarProyecto}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <ActualizarProyectos
              idActualizar={idActualizar}
              datosActualizar={datosActualizar}
              setModalActualizarProyecto={setModalActualizarProyecto}
            />
          </Modal>
          <Modal
            ariaHideApp={false}
            isOpen={modalObservacion}
            onRequestClose={handleCloseModalObservaciones}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 space-y-2 bg-white rounded-lg"
            style={{overlay: {overflowY: 'scroll'}}}
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white">Observaciones</h1>
              <button
                onClick={handleCloseModalObservaciones}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <ObservacionesProyectos
              idActualizar={idActualizar}
              nombreProyecto={datosActualizar}
              setModalObservacion={setModalObservacion}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
