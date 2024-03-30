/* eslint-disable react/prop-types */
import {useSelector} from 'react-redux';
import VisorPDF from '../../../../components/VisorPDF/VisorPDF';
import {FaEye} from 'react-icons/fa6';
import Tabla from '../../../../components/Tabla/Tabla';
import {useState} from 'react';
import Modal from 'react-modal';
import CrearDocumentos from '../../../../components/Formularios/Documentos/CrearDocumentos/CrearDocumentos';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {eliminarDocumentos} from '../../../../redux/Actions/ActionsDocumentos/ActionsDocumentos';
import FiltrosDocumentos from '../../../../components/Filtros/FiltrosDocumentos/FiltrosDocumentos';
import {FaPenToSquare} from 'react-icons/fa6';
import ActualizarDocumentos from '../../../../components/Formularios/Documentos/ActualizarDocumentos/ActualizarDocumentos';

const Documentos = () => {
  const documentos = useSelector((state) => state.documentos.documentos);
  const proyectos = useSelector((state) => state.proyectos.proyectos);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [modalCargarDoc, setModalCargarDoc] = useState(false);
  const [modalActualizarDoc, setModalActualizarDoc] = useState(false);
  const [idActualizar, setIdActualizar] = useState('');
  const [datosActualizar, setDatosActualizar] = useState('');

  const handleIconButton = (archivo, nombre) => {
    setPdfUrl(archivo);
    setTituloModal(nombre);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const handleCloseModalDoc = () => {
    setModalCargarDoc(false);
  };
  const handleCloseModalActualizarDoc = () => {
    setModalActualizarDoc(false);
  };

  const handleCargarDoc = () => {
    setModalCargarDoc(true);
  };
  const handleActualizarDoc = (id, datos) => {
    setIdActualizar(id);
    setDatosActualizar(datos);
    setModalActualizarDoc(true);
  };

  const handleEliminarDoc = (url, id) => {
    const match = url.match(/\/v\d+\/(.+?)\.pdf$/);
    const publicId = match ? match[1] : null;
    eliminarDocumentos(id, publicId);
  };

  const columnasDocumentos = [
    {Header: 'NOMBRE', accessor: 'nombre'},
    {Header: 'DESCRIPCION', accessor: 'descripcion'},
    {Header: 'FECHA DE CARGA', accessor: 'fecha'},
    {Header: 'PROYECTO', accessor: 'proyecto'},
    {
      Header: 'ACCIONES',
      accessor: 'icon',
      Cell: ({row}) => (
        <div className="flex items-center justify-center space-x-1">
          <button
            onClick={() =>
              handleIconButton(row.original.archivo, row.original.nombre)
            }
            className="p-1 bg-blue-600 rounded-full hover:bg-blue-800"
            title="Ver PDF"
          >
            <FaEye style={{color: 'white'}} />
          </button>
          <button
            onClick={() =>
              handleActualizarDoc(row.original._id, {
                nombre: row.original.nombre,
                descripcion: row.original.descripcion,
              })
            }
            className="p-1 rounded-full bg-secondary-button hover:bg-secondary-buttonH"
          >
            <FaPenToSquare style={{color: 'white'}} />
          </button>
          <button
            onClick={() =>
              handleEliminarDoc(row.original.archivo, row.original._id)
            }
            className="p-1 bg-red-600 rounded-full hover:bg-red-800"
            title="Eliminar documento"
          >
            <RiDeleteBin6Line style={{color: 'white'}} />
          </button>
        </div>
      ),
    },
  ];

  const data = Array.isArray(documentos)
    ? documentos.map((item) => ({
        ...item,
        fecha: item.createdAt
          ? new Date(item.createdAt).toISOString().slice(0, 10)
          : '',
        proyecto:
          proyectos.find((proyecto) => proyecto._id === item.idProyecto)
            ?.nombreProyecto || 'Nombre de Proyecto no encontrado',
        icon: 'icono',
      }))
    : [];

  return (
    <div className="text-sm w-full h-full p-2">
      <div className="items-center p-2 space-y-2 rounded-lg bg-secondary-fondo">
        <div className="flex items-center p-2 space-x-2 border rounded-lg">
          <button
            className="p-2 font-bold uppercase transition-colors rounded-lg bg-secondary-button hover:text-gray-100"
            onClick={handleCargarDoc}
          >
            cargar documento
          </button>
          <label className="font-bold uppercase">Filtros : </label>
          <FiltrosDocumentos opciones={proyectos} />
        </div>
        <div className="container p-2 mx-auto uppercase border rounded-lg">
          <Tabla columns={columnasDocumentos} data={data} />
          <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 bg-white rounded-lg "
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-modal">
              <h1 className="font-bold text-white uppercase">{tituloModal}</h1>
              <button
                onClick={handleCloseModal}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <VisorPDF url={pdfUrl} showOptions={true} ver={true} />{' '}
          </Modal>
          <Modal
            ariaHideApp={false}
            isOpen={modalCargarDoc}
            onRequestClose={handleCloseModalDoc}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 space-y-2 bg-white rounded-lg"
            style={{overlay: {overflowY: 'scroll'}}}
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white ">Cargar Documento</h1>
              <button
                onClick={handleCloseModalDoc}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <CrearDocumentos setModalCargarDoc={setModalCargarDoc} />
          </Modal>
          <Modal
            ariaHideApp={false}
            isOpen={modalActualizarDoc}
            onRequestClose={handleCloseModalActualizarDoc}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 space-y-2 bg-white rounded-lg"
            style={{overlay: {overflowY: 'scroll'}}}
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white uppercase">
                actualizar documento
              </h1>
              <button
                onClick={handleCloseModalActualizarDoc}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <ActualizarDocumentos
              idActualizar={idActualizar}
              datosActualizar={datosActualizar}
              setModalActualizarDoc={setModalActualizarDoc}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Documentos;
