/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../../helpers/socket';
import { setUsuarios } from '../../redux/Slices/SlicesUsuarios/SliceUsuarios';
import { setDocumentos } from '../../redux/Slices/SlicesDocumentos/SlicesDocumentos';
import { setTareas } from '../../redux/Slices/SlicesTareas/SliceTareas';
import { setProyectos } from '../../redux/Slices/SlicesProyectos/SliceProyectos';
import { setEvidencias } from '../../redux/Slices/SliceEvidencias/SliceEvidencias';

const ManejadorSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('login', (data) => {
      dispatch(setUsuarios(data));
    });

    socket.on('logoutUsuario', (data) => {
      dispatch(setUsuarios(data));
    });
    socket.on('cargarDocumentos', (data) => {
      dispatch(setDocumentos(data));
    });

    socket.on('cargarTareas', (data) => {
      dispatch(setTareas(data));
    });
    socket.on('cargarUsuarios', (data) => {
      dispatch(setUsuarios(data));
    });
    socket.on('cargarProyectos', (data) => {
      dispatch(setProyectos(data));
    });
    socket.on('cargarEvidencias', (data) => {
      dispatch(setEvidencias(data))
    })

    return () => {
      socket.off('login');
      socket.off('logoutUsuario');
      socket.off('cargarDocumentos');
      socket.off('cargarUsuarios');
      socket.off('cargarTareas')
      socket.off('cargarProyectos')
    };
  }, []);

  return null;
};

export default ManejadorSocket;
