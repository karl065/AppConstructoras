import axios from 'axios';
import server from '../../../Connections/Connections';
import {
  setDocumentos,
  setFiltrosSeleccionados,
} from '../../Slices/SlicesDocumentos/SlicesDocumentos';
import {socket} from '../../../helpers/socket';

export const getDocumentos = async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.api.baseURL}documentos`);
    dispatch(setDocumentos(data));
  } catch (error) {
    console.log(error);
  }
};

export const cargarDocumentos = async (documento) => {
  try {
    const formData = new FormData();
    formData.append('nombre', documento.nombre);
    formData.append('descripcion', documento.descripcion);
    formData.append('idProyecto', documento.idProyecto);
    formData.append('archivo', documento.archivo);
    await axios.post(`${server.api.baseURL}documentos?tipo=PDF`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    socket.emit('cargarDocumentos');
  } catch (error) {
    console.log(error);
  }
};

export const eliminarDocumentos = async (id, public_id) => {
  try {
    await axios.delete(
      `${server.api.baseURL}documentos/${id}?public_id=${public_id}`
    );
    socket.emit('cargarDocumentos');
  } catch (error) {
    console.log(error.message);
  }
};

export const filtrosDocumentos = async (valores, dispatch) => {
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
    const {data} = await axios.get(`${server.api.baseURL}documentos`, {
      params: valoresFiltrados,
    });
    dispatch(setDocumentos(data));
  } catch (error) {
    console.log(error);
  }
};

export const actualizarDocumentos = async (id, datos) => {
  try {
    await axios.put(`${server.api.baseURL}documentos/${id}`, datos);
    socket.emit('cargarDocumentos');
  } catch (error) {
    console.log(error);
  }
};
