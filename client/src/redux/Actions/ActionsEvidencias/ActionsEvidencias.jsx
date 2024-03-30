import axios from 'axios';
import server from '../../../Connections/Connections';
import {setEvidencias} from '../../Slices/SliceEvidencias/SliceEvidencias';
import {socket} from '../../../helpers/socket';

export const getEvidencias = async (dispatch) => {
  try {
    console.log('first');
    const {data} = await axios.get(`${server.api.baseURL}evidencias`);
    console.log(data);
    dispatch(setEvidencias(data));
  } catch (error) {
    console.log(error);
  }
};

export const cargarEvidencias = async (evidencia) => {
  try {
    const formData = new FormData();
    formData.append('foto', evidencia.foto);
    if (evidencia.idProyecto)
      formData.append('idProyecto', evidencia.idProyecto);
    if (evidencia.idTarea) formData.append('idTarea', evidencia.idTarea);
    await axios.post(`${server.api.baseURL}evidencias?tipo=IMG`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    socket.emit('cargarEvidencias');
  } catch (error) {
    console.log(error);
  }
};
