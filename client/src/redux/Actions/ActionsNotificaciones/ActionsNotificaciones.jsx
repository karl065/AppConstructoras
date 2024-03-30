import axios from 'axios';
import server from '../../../Connections/Connections';
import {setNotificaciones} from '../../Slices/SlicesNotificaciones/SliceNotificaciones';

export const getNotificaciones = async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.api.baseURL}notificaciones`);

    dispatch(setNotificaciones(data));
  } catch (error) {
    console.log(error);
  }
};
