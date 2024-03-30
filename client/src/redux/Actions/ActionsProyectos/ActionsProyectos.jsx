import axios from 'axios';
import server from '../../../Connections/Connections';
import {
  setProyectos,
  setFiltrosSeleccionados,
} from '../../Slices/SlicesProyectos/SliceProyectos';
import {socket} from '../../../helpers/socket';

export const getProyectos = async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.api.baseURL}proyectos`);
    dispatch(setProyectos(data));
  } catch (error) {
    console.log(error);
  }
};

export const cargarProyectos = async (proyecto) => {
  try {
    await axios.post(`${server.api.baseURL}proyectos`, proyecto, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    socket.emit('cargarProyectos');
  } catch (error) {
    console.log(error);
  }
};

export const eliminarProyectos = async (id) => {
  try {
    await axios.delete(`${server.api.baseURL}proyectos/${id}}`);
    socket.emit('cargarProyectos');
  } catch (error) {
    console.log(error.message);
  }
};

export const filtrosProyectos = async (valores, dispatch) => {
  try {
    const valoresFiltrados = {};
    for (const key in valores) {
      if (valores[key]) {
        valoresFiltrados[key] = valores[key];
      }
    }

    const filtrosSeleccionados = [];
    filtrosSeleccionados.push(valoresFiltrados);
    dispatch(setFiltrosSeleccionados(filtrosSeleccionados));
    const {data} = await axios.get(`${server.api.baseURL}proyectos`, {
      params: valoresFiltrados,
    });
    dispatch(setProyectos(data));
  } catch (error) {
    console.log(error);
  }
};

export const actualizarProyectos = async (id, datos) => {
  try {
    await axios.put(`${server.api.baseURL}proyectos/${id}`, datos);
    socket.emit('cargarProyectos');
  } catch (error) {
    console.log(error);
  }
};

export const observacionesProyectos = async (datos) => {
  try {
    await axios.post(`${server.api.baseURL}observaciones`, datos);
    socket.emit('cargarProyectos');
  } catch (error) {
    console.log(error);
  }
};
