import { createSlice } from '@reduxjs/toolkit';

const proyectosSlice = createSlice({
  name: 'proyectos',
  initialState: {
    proyectos: [],
    filtrosSeleccionados: []
  },
  reducers: {
    setProyectos: (state, action) => {
      state.proyectos = action.payload;
    },
    setFiltrosSeleccionados: (state, action) => {
      state.filtrosSeleccionados = action.payload
    }
  },
});

export const { setProyectos, setFiltrosSeleccionados } = proyectosSlice.actions;

export default proyectosSlice.reducer;
