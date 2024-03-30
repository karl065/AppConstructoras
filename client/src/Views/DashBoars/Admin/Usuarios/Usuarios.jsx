/* eslint-disable react/prop-types */
import {RiDeleteBin6Line} from 'react-icons/ri';
import {FaPenToSquare} from 'react-icons/fa6';
import {FaEye} from 'react-icons/fa6';
import {useSelector} from 'react-redux';
import Tabla from '../../../../components/Tabla/Tabla';
import Modal from 'react-modal';
import {useEffect, useState} from 'react';
import CrearUsuarios from '../../../../components/Formularios/Usuarios/CrearUsuarios/CrearUsuarios';
import ActualizarUsuarios from '../../../../components/Formularios/Usuarios/ActualizarUsuarios/ActualizarUsuarios';
// import {eliminarUsuarios} from '../../../../redux/Actions/ActionsUsuarios/ActionsUsuarios';
import FiltrosUsuarios from '../../../../components/Filtros/FiltrosUsuarios/FiltrosUsuarios';
import {actualizarUsuarios} from '../../../../redux/Actions/ActionsUsuarios/ActionsUsuarios';
import {BiSolidUserCheck} from 'react-icons/bi';
import {alertInfo} from '../../../../helpers/Alertas';
import DetallesUsuarios from '../../../../components/Detalles/DetallesUsuarios/DetallesUsuarios';
import SeleccionarUbicacion from '../../../../components/SeleccionarUbicacion/SeleccionarUbicacion';

const Usuarios = () => {
  const usuarios = useSelector((state) => state.usuarios.usuarios);
  const [modalCrearUsuario, setModalCrearUsuario] = useState(false);
  const [modalActualizarUsuarios, setModalActualizarUsuarios] = useState(false);
  const [modalDetalleUsuarios, setModalDetalleUsuarios] = useState(false);
  const [idActualizar, setIdActualizar] = useState('');
  const [datosActualizar, setDatosActualizar] = useState('');
  const [detalleUsuario, setDetalleUsuario] = useState(null);

  const handleActualizarUsuario = (id, datos) => {
    setIdActualizar(id);
    setDatosActualizar(datos);
    setModalActualizarUsuarios(true);
  };

  useEffect(() => {
    if (detalleUsuario && usuarios.some((u) => u._id === detalleUsuario._id)) {
      const updatedUser = usuarios.find((u) => u._id === detalleUsuario._id);
      setDetalleUsuario(updatedUser);
    } else {
      setModalDetalleUsuarios(false);
    }
  }, [usuarios, detalleUsuario]);

  const handleDetalleUsuarios = (usuario) => {
    console.log(usuario);
    setDetalleUsuario(usuario);
    setModalDetalleUsuarios(true);
  };

  const handleDeshabilitarUsuario = (id, habilitado, usuario) => {
    actualizarUsuarios(id, habilitado);

    if (habilitado.habilitado) {
      alertInfo(`El usuario ${usuario} ha sido habilitado con exito`);
    }
    if (!habilitado.habilitado) {
      alertInfo(`El usuario ${usuario} se ha deshabilitado`);
    }
  };

  const columnasUsuarios = [
    {Header: 'NOMBRE', accessor: 'nombre'},
    {Header: 'CORREO', accessor: 'email'},
    {Header: 'TELEFONO', accessor: 'telefono'},
    {Header: 'ROL', accessor: 'rol'},
    {
      Header: 'ACCIONES',
      accessor: 'icon',
      Cell: ({row}) => (
        <div className="flex items-center justify-center space-x-1">
          <button
            className="p-1 bg-blue-600 rounded-full hover:bg-blue-800"
            onClick={() => handleDetalleUsuarios(row.original)}
            title="Ver Usuario"
          >
            <FaEye style={{color: 'white'}} />
          </button>
          <button
            onClick={() =>
              handleActualizarUsuario(row.original._id, row.original)
            }
            className="p-1 rounded-full bg-secondary-button hover:bg-secondary-buttonH"
            title="Editar Usuario"
          >
            <FaPenToSquare style={{color: 'white'}} />
          </button>
          <button
            onClick={() =>
              handleDeshabilitarUsuario(
                row.original._id,
                {
                  habilitado: !row.original.habilitado,
                },
                row.original.nombre
              )
            }
            className={`${
              !row.original.habilitado
                ? 'p-1 bg-green-600 rounded-full hover:bg-green-800'
                : 'p-1 bg-red-600 rounded-full hover:bg-red-800'
            }`}
            title="Deshabilitar Usuario"
          >
            {!row.original.habilitado ? (
              <BiSolidUserCheck style={{color: 'white'}} />
            ) : (
              <RiDeleteBin6Line style={{color: 'white'}} />
            )}
          </button>
        </div>
      ),
    },
  ];

  const handleCloseModalCrearUsuario = () => {
    setModalCrearUsuario(false);
  };

  const handleCloseModalActualizarUsuario = () => {
    setModalActualizarUsuarios(false);
  };

  const handleCloseModalDetalleUsuario = () => {
    setModalDetalleUsuarios(false);
  };

  const handleCrearUsuario = () => {
    setModalCrearUsuario(true);
  };

  return (
    <div className="w-full h-full p-2">
      <div className="items-center p-2 space-y-2 rounded-lg bg-secondary-fondo">
        <div className="flex items-center p-2 space-x-2 border rounded-lg">
          <button
            className="p-2 font-bold uppercase transition-colors rounded-lg bg-secondary-button hover:text-gray-100"
            onClick={handleCrearUsuario}
          >
            crear Usuario
          </button>
          <label className="font-bold uppercase">Filtros : </label>
          <FiltrosUsuarios />
          <SeleccionarUbicacion />
        </div>
        <div className="container p-2 mx-auto uppercase border rounded-lg">
          <Tabla columns={columnasUsuarios} data={usuarios} />
          <Modal
            ariaHideApp={false}
            isOpen={modalCrearUsuario}
            onRequestClose={handleCloseModalCrearUsuario}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 space-y-2 bg-white rounded-lg"
            style={{overlay: {overflowY: 'scroll'}}}
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white uppercase">Crear Usuario</h1>
              <button
                onClick={handleCloseModalCrearUsuario}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <CrearUsuarios setModalCrearUsuario={setModalCrearUsuario} />
          </Modal>
          <Modal
            ariaHideApp={false}
            isOpen={modalActualizarUsuarios}
            onRequestClose={handleCloseModalActualizarUsuario}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 space-y-2 bg-white rounded-lg"
            style={{overlay: {overflowY: 'scroll'}}}
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white uppercase">
                Actualizar Usuario
              </h1>
              <button
                onClick={handleCloseModalActualizarUsuario}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <ActualizarUsuarios
              idActualizar={idActualizar}
              datosActualizar={datosActualizar}
              setModalActualizarUsuario={setModalActualizarUsuarios}
            />
          </Modal>
          <Modal
            ariaHideApp={false}
            isOpen={modalDetalleUsuarios}
            onRequestClose={handleCloseModalDetalleUsuario}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
            className="p-4 space-y-2 bg-white rounded-lg"
            style={{overlay: {overflowY: 'scroll'}}}
          >
            <div className="flex justify-between p-2 border rounded-lg bg-secondary-fondo">
              <h1 className="font-bold text-white uppercase">
                Detalle Usuario
              </h1>
              <button
                onClick={handleCloseModalDetalleUsuario}
                className="transition duration-300 ease-in-out border rounded-md hover:bg-gray-600"
              >
                ❌
              </button>
            </div>
            <DetallesUsuarios usuario={detalleUsuario} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
