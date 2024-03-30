/* eslint-disable react/prop-types */
import {useSelector} from 'react-redux';
import {useState} from 'react';
import Tabla from '../../../../components/Tabla/Tabla';
import {FaEye, FaPenToSquare} from 'react-icons/fa6';
import {RiCamera3Line, RiChatNewLine, RiPresentationFill} from 'react-icons/ri';
import Modal from 'react-modal';
import ActualizarTareas from '../../../../components/Formularios/Tareas/ActualizarTareas/ActualizaTareas';
import FiltrosTareas from '../../../../components/Filtros/FiltrosTareas/FiltrosTareas';
import CrearEvidencias from '../../../../components/Formularios/Evidencias/CrearEvidencias/CrearEvidencias';
import CrearTareas from '../../../../components/Formularios/Tareas/CrearTareas/CrearTareas';
import DetallesTareas from '../../../../components/Detalles/DetallesTareas/DetallesTareas';
import ObservacionesTareas from '../../../../components/Formularios/Tareas/ObservacionesTareas/ObservacionesTareas';

const Tareas = () => {
  const tareas = useSelector((state) => state.tareas.tareas);
  const proyectos = useSelector((state) => state.proyectos.proyectos);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [modalCargarTareas, setModalCargarTareas] = useState(false);
  const [idTarea, setIdTarea] = useState('');
  const [nombre, setNombre] = useState('');
  const [tareaSeleccionada, setTareaSeleccionada] = useState('');
  const [modalObservacion, setModalObservacion] = useState(false);

  const [modalActualizarTarea, setModalActualizarTarea] = useState(false);
  const [idActualizar, setIdActualizar] = useState('');
  const [datosActualizar, setDatosActualizar] = useState('');

  const [modalCargaEvidencia, setModalCargaEvidencia] = useState(false);

  const handleIconButton = (tarea) => {
    setTareaSeleccionada(tarea);
    setTituloModal(tarea.nombre);
    setModalIsOpen(true);
  };

  const handleObservaciones = (idProyecto, nombre) => {
    setIdActualizar(idProyecto);
    setDatosActualizar(nombre);
    setModalObservacion(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const handleCloseModalTareas = () => {
    setModalCargarTareas(false);
  };

  const handleCargarTareas = () => {
    setModalCargarTareas(true);
  };

  const handleCloseModalActualizarTarea = () => {
    setModalActualizarTarea(false);
  };
  const handleCloseModalObservaciones = () => {
    setModalObservacion(false);
  };

  const handleActualizarTarea = (id, datos) => {
    setIdActualizar(id);
    setDatosActualizar(datos);
    setModalActualizarTarea(true);
  };

  const handleCloseModalCargaTarea = () => {
    setModalCargaEvidencia(false);
  };

  const handleCargarTarea = (idTarea, nombre) => {
    setIdTarea(idTarea);
    setNombre(nombre);
    setModalCargaEvidencia(true);
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
          className={`rounded-lg ${
            value <= 30
              ? 'bg-red-700'
              : value === 100
              ? 'bg-green-400'
              : 'bg-secondary-buttonH'
          }`}
        >
          <div
            className={`h-6 rounded-lg flex items-center bg-green-400 transition-all duration-300 ease-in-out`}
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
            title="Ver Detalle de la Tarea"
          >
            <FaEye style={{color: 'white'}} />
          </button>
          <button
            onClick={() =>
              handleActualizarTarea(row.original._id, row.original)
            }
            className="p-1 rounded-full bg-secondary-button hover:bg-secondary-buttonH"
          >
            <FaPenToSquare style={{color: 'white'}} />
          </button>
          <button
            onClick={() =>
              handleCargarTarea(row.original._id, row.original.nombre)
            }
            className="bg-green-600 hover:bg-green-800 p-1 rounded-full"
          >
            <RiCamera3Line style={{color: 'white'}} />
          </button>
          <button
            className="p-1 rounded-full bg-green-600 hover:bg-green-800"
            onClick={() =>
              handleObservaciones(row.original._id, row.original.nombre)
            }
            title="Agregar Observacion"
          >
            <RiChatNewLine style={{color: 'white'}} />
          </button>
        </div>
      ),
    },
  ];

  const data = Array.isArray(tareas)
    ? tareas.map((item) => ({
        ...item,
        nombre: item.nombre,
        descripcion: item.descripcion,
        fechaInicio: item.fechaInicio
          ? new Date(item.fechaInicio).toISOString().slice(0, 10)
          : '',
        fechaVencimiento: item.fechaVencimiento
          ? new Date(item.fechaVencimiento).toISOString().slice(0, 10)
          : '',
        estado: item.estado,
        foto: item.foto,
        icon: 'icono',
      }))
    : [];

  return (
    <div className="text-sm w-full h-full p-2">
      <div className="items-center p-2 space-y-2 rounded-lg bg-secondary-fondo ">
        <div className="flex items-center p-2 space-x-2 border rounded-lg ">
          <button
            onClick={handleCargarTareas}
            className="flex items-center font-bold gap-4 py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors bg-secondary-buttonH "
          >
            Crear Tarea <RiPresentationFill />
          </button>
          <label className="font-bold">Filtros : </label>
          <FiltrosTareas opciones={proyectos} />
        </div>
        <div className="container p-2 uppercase border rounded-lg h-full">
          <Tabla columns={columnasTareas} data={data} />
        </div>
        <div>
          <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="bg-white rounded-lg p-4 w-[600px]"
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white uppercase">{tituloModal}</h1>
              <button
                onClick={handleCloseModal}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <DetallesTareas tarea={tareaSeleccionada} />
          </Modal>
          <Modal
            ariaHideApp={false}
            isOpen={modalCargarTareas}
            onRequestClose={handleCloseModalTareas}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 space-y-2 bg-white rounded-lg  w-[600px] "
            style={{overlay: {overflowY: 'scroll'}}}
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white">Crear Tarea</h1>
              <button
                onClick={handleCloseModalTareas}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <CrearTareas setModalCargarTareas={setModalCargarTareas} />
          </Modal>
          <Modal
            ariaHideApp={false}
            isOpen={modalActualizarTarea}
            onRequestClose={handleCloseModalActualizarTarea}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 space-y-2 bg-white rounded-lg w-full md:w-1/2"
            style={{overlay: {overflowY: 'scroll'}}}
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white">Actualizar Tarea</h1>
              <button
                onClick={handleCloseModalActualizarTarea}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <ActualizarTareas
              idActualizar={idActualizar}
              datosActualizar={datosActualizar}
              setModalActualizarTarea={setModalActualizarTarea}
            />
          </Modal>
          <Modal
            ariaHideApp={false}
            isOpen={modalCargaEvidencia}
            onRequestClose={handleCloseModalCargaTarea}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 space-y-2 bg-white rounded-lg"
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white">Cargar Evidencias</h1>
              <button
                onClick={handleCloseModalCargaTarea}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <CrearEvidencias
              setModalCargaEvidencia={setModalCargaEvidencia}
              idTarea={idTarea}
              nombre={nombre}
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
            <ObservacionesTareas
              idActualizar={idActualizar}
              nombreTarea={datosActualizar}
              setModalObservacion={setModalObservacion}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Tareas;
