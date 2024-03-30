import {configureStore} from '@reduxjs/toolkit';
import appReducerUsuarios from './Slices/SlicesUsuarios/SliceUsuarios';
import appReducerProyectos from './Slices/SlicesProyectos/SliceProyectos';
import appReducerDocumentos from './Slices/SlicesDocumentos/SlicesDocumentos';
import appReducerTareas from './Slices/SlicesTareas/SliceTareas';
import appReducerEvidencias from './Slices/SliceEvidencias/SliceEvidencias';
import appReducerNotificaciones from './Slices/SlicesNotificaciones/SliceNotificaciones';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    usuarios: appReducerUsuarios,
    proyectos: appReducerProyectos,
    documentos: appReducerDocumentos,
    tareas: appReducerTareas,
    evidencias: appReducerEvidencias,
    notificaciones: appReducerNotificaciones,
  },
  middleware: [thunk],
});

export default store;
