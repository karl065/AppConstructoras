import axios from 'axios';
import server from '../../../Connections/Connections';
import {
  setFiltrosSeleccionados,
  setTareas,
} from '../../Slices/SlicesTareas/SliceTareas';
import {socket} from '../../../helpers/socket';

export const getTareas = async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.api.baseURL}tareas`);

    dispatch(setTareas(data));
  } catch (error) {
    console.log(error);
  }
};

export const cargarTareas = async (tarea) => {
  try {
    await axios.post(`${server.api.baseURL}tareas`, tarea);
    socket.emit('cargarTareas');
    socket.emit('cargarProyectos');
  } catch (error) {
    console.log(error);
  }
};

export const eliminarTareas = async (id) => {
  try {
    await axios.delete(`${server.api.baseURL}tareas/${id}}`);
    socket.emit('cargarTareas');
  } catch (error) {
    console.log(error.message);
  }
};

export const filtrosTareas = async (valores, dispatch) => {
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

    const {data} = await axios.get(`${server.api.baseURL}tareas`, {
      params: valoresFiltrados,
    });

    dispatch(setTareas(data));
  } catch (error) {
    console.log(error);
  }
};

export const actualizarTareas = async (id, datos) => {
  try {
    if (datos.observacion) {
      await observacionesTareas({
        idTareas: id,
        observacion: datos.observacion,
        datos: datos,
      });
      delete datos.observacion;
      await axios.put(`${server.api.baseURL}tareas/${id}`, datos);
      socket.emit('cargarTareas');
      socket.emit('cargarProyectos');
    } else {
      await axios.put(`${server.api.baseURL}tareas/${id}`, datos);
      socket.emit('cargarTareas');
      socket.emit('cargarProyectos');
    }
  } catch (error) {
    console.log(error);
  }
};

export const cargarActualizaEvidencias = async (id, datos, public_id) => {
  try {
    if (public_id) {
      const formData = new FormData();
      console.log(datos);

      formData.append('fotoEvidencia', datos.fotoEvidencia);

      await axios.put(
        `${server.api.baseURL}tareas/${id}?tipo=IMG&public_id=${public_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      socket.emit('cargarTareas');
    } else {
      await axios.put(`${server.api.baseURL}tareas/${id}`, datos);
      socket.emit('cargarTareas');
    }
  } catch (error) {
    console.log(error);
  }
};

export const observacionesTareas = async (datos) => {
  try {
    await axios.post(`${server.api.baseURL}observaciones`, datos);
    socket.emit('cargarTareas');
  } catch (error) {
    console.log(error);
  }
};
