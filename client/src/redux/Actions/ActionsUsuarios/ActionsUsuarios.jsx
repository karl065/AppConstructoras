import axios from 'axios';
import server from '../../../Connections/Connections';
import {
  setCaducidadToken,
  setFiltrosUsuariosSeleccionados,
  setLoading,
  setLogin,
  setRoles,
  setUsuarios,
} from '../../Slices/SlicesUsuarios/SliceUsuarios';
import {alertInfo, alertSuccess, alertWarning} from '../../../helpers/Alertas';
import {isTokenExpired} from '../../../helpers/ValidacionUsuario';
import {getTareas} from '../ActionsTareas/ActionsTareas';
import {getProyectos} from '../ActionsProyectos/ActionsProyectos';
import {setDocumentos} from '../../Slices/SlicesDocumentos/SlicesDocumentos';
import {setProyectos} from '../../Slices/SlicesProyectos/SliceProyectos';
import {setTareas} from '../../Slices/SlicesTareas/SliceTareas';
import {socket} from '../../../helpers/socket';
import {getDocumentos} from '../ActionsDocumentos/ActionsDocumentos';
import {getNotificaciones} from '../ActionsNotificaciones/ActionsNotificaciones';

export const login = async (userLogin, dispatch, navigate) => {
  try {
    const {data} = await axios.post(`${server.api.baseURL}auth`, userLogin);
    if (data) {
      localStorage.setItem('token', data.token);
      if (data.rol === 'Usuario') {
        navigate('/usuario');
      } else {
        navigate('/admin');
      }
    }
    const response = await axios.get(
      `${server.api.baseURL}usuarios?obtenerRoles=true`
    );
    dispatch(setRoles(response.data));
    alertSuccess('Inicio de sesión Correcto');
    dispatch(setLoading(false));
    dispatch(setLogin(data));

    const expirado = isTokenExpired(data.token);
    dispatch(setCaducidadToken(expirado.expiresIn));

    socket.emit('login', data._id);
    getTareas(dispatch);
    getProyectos(dispatch);
    getDocumentos(dispatch);
    getNotificaciones(dispatch);
  } catch (error) {
    alertWarning(error.response.data);
  }
};

export const reLogin = async (token, dispatch, navigate) => {
  try {
    const expirado = isTokenExpired(token);

    if (expirado.expired || expirado === true) {
      alertInfo('Sesion expirada');
      logout(dispatch, navigate, expirado.user.id);
    } else {
      const {data} = await axios.get(`${server.api.baseURL}auth`, {
        headers: {
          'x-auth-token': token,
        },
      });

      if (data) {
        if (data.rol === 'Usuario') {
          navigate('/usuario');
        } else {
          navigate('/admin');
        }
        const response = await axios.get(
          `${server.api.baseURL}usuarios?obtenerRoles=true`
        );
        dispatch(setRoles(response.data));

        dispatch(setLogin(data));

        dispatch(setCaducidadToken(expirado.expiresIn));

        await getUsuarios(dispatch);
        await getTareas(dispatch);
        await getProyectos(dispatch);
        await getDocumentos(dispatch);
        await getNotificaciones(dispatch);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async (dispatch, navigate, id) => {
  try {
    dispatch(setLogin(null));
    dispatch(setUsuarios([]));
    dispatch(setCaducidadToken(0));
    dispatch(setDocumentos([]));
    dispatch(setProyectos([]));
    dispatch(setTareas([]));
    navigate('/');
    localStorage.removeItem('token');
    socket.emit('logoutUsuario', id);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsuarios = async (dispatch) => {
  try {
    const {data} = await axios.get(`${server.api.baseURL}usuarios`);
    dispatch(setUsuarios(data));
  } catch (error) {
    console.log(error);
  }
};

export const agregarUsuario = async (dataUsuario) => {
  try {
    const formData = new FormData();
    formData.append('nombre', dataUsuario.nombre);
    formData.append('email', dataUsuario.email);
    formData.append('telefono', dataUsuario.telefono);
    formData.append('password', dataUsuario.password);
    formData.append('rol', dataUsuario.rol);
    formData.append('foto', dataUsuario.foto);

    await axios.post(`${server.api.baseURL}usuarios?tipo=IMG`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    socket.emit('cargarUsuarios');
  } catch (error) {
    console.log(error);
  }
};

export const actualizarUsuarios = async (id, dataUsuario, public_id) => {
  try {
    if (public_id) {
      const formData = new FormData();
      formData.append('nombre', dataUsuario.nombre);
      formData.append('email', dataUsuario.email);
      formData.append('telefono', dataUsuario.telefono);
      formData.append('password', dataUsuario.password);
      formData.append('rol', dataUsuario.rol);
      formData.append('foto', dataUsuario.foto);

      await axios.put(
        `${server.api.baseURL}usuarios/${id}?tipo=IMG&public_id=${public_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      socket.emit('cargarUsuarios');
    } else {
      await axios.put(`${server.api.baseURL}usuarios/${id}`, dataUsuario);
      socket.emit('cargarUsuarios');
    }
  } catch (error) {
    console.log(error);
  }
};

export const eliminarUsuarios = async (id, public_id) => {
  try {
    await axios.delete(
      `${server.api.baseURL}usuarios/${id}?public_id=${public_id}`
    );
    socket.emit('cargarUsuarios');
  } catch (error) {
    console.log(error.message);
  }
};

export const filtrosUsuarios = async (valores, dispatch) => {
  try {
    const valoresFiltrados = {};
    for (const key in valores) {
      if (Object.prototype.hasOwnProperty.call(valores, key)) {
        if (typeof valores[key] === 'boolean' || valores[key]) {
          valoresFiltrados[key] = valores[key];
        }
      }
    }
    const filtrosSeleccionados = [];
    filtrosSeleccionados.push(valoresFiltrados);
    dispatch(setFiltrosUsuariosSeleccionados(filtrosSeleccionados));
    const {data} = await axios.get(`${server.api.baseURL}usuarios`, {
      params: valoresFiltrados,
    });

    dispatch(setUsuarios(data));
  } catch (error) {
    console.log(error);
  }
};
