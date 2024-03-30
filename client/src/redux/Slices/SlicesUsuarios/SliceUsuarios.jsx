import {createSlice} from '@reduxjs/toolkit';

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState: {
    login: null,
    usuarios: [],
    loading: false,
    caducidadToken: 0,
    roles: [],
    filtrosUsuariosSeleccionados: [],
  },
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setUsuarios: (state, action) => {
      state.usuarios = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCaducidadToken: (state, action) => {
      state.caducidadToken = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setFiltrosUsuariosSeleccionados: (state, action) => {
      state.filtrosUsuariosSeleccionados = action.payload;
    },
  },
});

export const {
  setLogin,
  setUsuarios,
  setLoading,
  setCaducidadToken,
  setRoles,
  setFiltrosUsuariosSeleccionados,
} = usuariosSlice.actions;

export default usuariosSlice.reducer;
